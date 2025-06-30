import { Router } from "express";
import axios from "axios";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import Investment from "../models/Investment.js";

const router = Router();
const {
  PHONEPE_MERCHANT_ID: merchantId,
  PHONEPE_SALT_KEY: saltKey,
  PHONEPE_SALT_INDEX: saltIndex = "1",
  BASE_URL,
} = process.env;

const HOST = "https://api-preprod.phonepe.com"; // sandbox

const checksum = (b64, path = "") =>
  crypto.createHash("sha256").update(b64 + path + saltKey).digest("hex");

function xVerify(b64, path) {
  return `${checksum(b64, path)}###${saltIndex}`;
}

/* ---------- 1. CREATE PAYMENT ---------- */
router.post("/pay", async (req, res) => {
  try {
    const { amount, email, name, phone } = req.body;
    const txnId = "T" + Date.now() + uuid().slice(0, 6);

    const payload = {
      merchantId,
      transactionId: txnId,
      merchantUserId: email,
      amount: Math.round(+amount * 100), // paise
      redirectUrl: `${BASE_URL}/api/phonepe/redirect/${txnId}`,
      redirectMode: "POST",
      mobileNumber: phone,
      paymentInstrument: { type: "PAY_PAGE" },
    };
    const b64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const path = "/pg/v1/pay";

    const { data } = await axios.post(
      HOST + path,
      { request: b64 },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify(b64, path),
          "X-MERCHANT-ID": merchantId,
        },
      },
    );

    await Investment.create({
      transactionId: txnId,
      userId: email,
      amount,
      status: "CREATED",
    });

    return res.json({
      redirectUrl: data.data.instrumentResponse.redirectInfo.url,
      txnId,
    });
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).json({ error: "payment‑create failed" });
  }
});

/* ---------- 2. REDIRECT ---------- */
router.post("/redirect/:txnId", async (req, res) => {
  res.send(`<html><body><h2>Processing…</h2>
  <script>
    window.location.replace("/status.html?txnId=${req.params.txnId}");
  </script></body></html>`);
});

/* ---------- 3. STATUS ---------- */
router.get("/status/:txnId", async (req, res) => {
  const { txnId } = req.params;
  const path = `/pg/v1/status/${merchantId}/${txnId}`;
  try {
    const { data } = await axios.get(HOST + path, {
      headers: { "X-VERIFY": xVerify("", path) },
    });

    if (data.success) {
      await Investment.updateOne(
        { transactionId: txnId },
        { status: data.data.state },
      );
    }
    res.json(data);
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).json({ error: "status failed" });
  }
});

export default router;
