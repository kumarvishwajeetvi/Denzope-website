import { useState } from "react";
import api from "./api";
import "./index.css";

export default function App() {
  const [form, set] = useState({ name: "", email: "", phone: "", amount: 0 });

  const fee = +(form.amount * 0.01).toFixed(2);
  const gst = +(fee * 0.18).toFixed(2);
  const total = +form.amount + fee + gst;

  async function submit() {
    if (!form.amount || !form.email) return alert("Fill all fields!");
    const { redirectUrl } = await api.pay(form);
    window.location.href = redirectUrl;
  }

  return (
    <div className="wrapper">
      <h1>Invest via PhonePe</h1>
      <input placeholder="Name" value={form.name}
        onChange={e => set({ ...form, name: e.target.value })}/>
      <input placeholder="Email" value={form.email}
        onChange={e => set({ ...form, email: e.target.value })}/>
      <input placeholder="Phone" value={form.phone}
        onChange={e => set({ ...form, phone: e.target.value })}/>
      <input type="number" placeholder="Amount (₹)" value={form.amount}
        onChange={e => set({ ...form, amount: +e.target.value })}/>
      <p>Total ₹{total.toFixed(2)} (incl. ₹{fee} fee + ₹{gst} GST)</p>
      <button onClick={submit}>Pay</button>
    </div>
  );
}
