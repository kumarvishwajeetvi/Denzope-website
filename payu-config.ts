// PayU Payment Gateway Configuration
export const PAYU_CONFIG = {
  // PayU Merchant Configuration
  MERCHANT_KEY: process.env.PAYU_MERCHANT_KEY || "your_payu_merchant_key",
  MERCHANT_SALT: process.env.PAYU_MERCHANT_SALT || "your_payu_merchant_salt",
  MERCHANT_ID: "MOVO_PAYU_001",
  
  // PayU Environment URLs
  PRODUCTION_URL: "https://secure.payu.in/_payment",
  TEST_URL: "https://test.payu.in/_payment",
  
  // Your account details for receiving payments
  MERCHANT_DETAILS: {
    merchantName: "Kumar Vishwajeet Choubey",
    merchantEmail: "kumarvishwajeetchoubey@gmail.com",
    merchantPhone: "+91-9999999999", // Replace with your phone
    businessName: "Movo Investment Platform"
  },
  
  // PayU supported payment methods
  PAYMENT_METHODS: {
    creditCard: true,
    debitCard: true,
    netBanking: true,
    upi: true,
    wallet: true,
    emi: true
  },
  
  // Success and failure URLs
  SUCCESS_URL: process.env.NEXT_PUBLIC_BASE_URL + "/api/payu/success",
  FAILURE_URL: process.env.NEXT_PUBLIC_BASE_URL + "/api/payu/failure",
  CANCEL_URL: process.env.NEXT_PUBLIC_BASE_URL + "/api/payu/cancel",
  
  // Webhook configuration
  WEBHOOK_URL: process.env.NEXT_PUBLIC_BASE_URL + "/api/webhooks/payu",
  
  // Platform configuration
  PLATFORM_FEE_PERCENTAGE: 0, // 0% platform fee as requested
  CURRENCY: "INR",
  
  // Security settings
  HASH_ALGORITHM: "sha512"
};

// PayU Payment Processor Class
export class PayUProcessor {
  private static generateHash(data: string, salt: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha512').update(data + salt).digest('hex');
  }
  
  static generatePaymentHash(paymentData: any): string {
    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = ''
    } = paymentData;
    
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||`;
    return this.generateHash(hashString, PAYU_CONFIG.MERCHANT_SALT);
  }
  
  static async initiatePayment(paymentData: any) {
    const txnid = `MOVO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const payuData = {
      key: PAYU_CONFIG.MERCHANT_KEY,
      txnid: txnid,
      amount: paymentData.amount.toString(),
      productinfo: `Investment in ${paymentData.startupName}`,
      firstname: paymentData.customerName,
      email: paymentData.customerEmail,
      phone: paymentData.customerPhone,
      surl: PAYU_CONFIG.SUCCESS_URL,
      furl: PAYU_CONFIG.FAILURE_URL,
      curl: PAYU_CONFIG.CANCEL_URL,
      udf1: paymentData.startupId?.toString() || '',
      udf2: paymentData.shares?.toString() || '',
      udf3: paymentData.sharePrice?.toString() || '',
      udf4: 'investment',
      udf5: paymentData.investorId?.toString() || '',
      service_provider: 'payu_paisa'
    };
    
    // Generate hash
    payuData.hash = this.generatePaymentHash(payuData);
    
    return {
      success: true,
      paymentUrl: process.env.NODE_ENV === 'production' ? PAYU_CONFIG.PRODUCTION_URL : PAYU_CONFIG.TEST_URL,
      paymentData: payuData,
      transactionId: txnid
    };
  }
  
  static verifyPaymentResponse(responseData: any): boolean {
    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = '',
      hash
    } = responseData;
    
    const reverseHashString = `${PAYU_CONFIG.MERCHANT_SALT}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_CONFIG.MERCHANT_KEY}`;
    const calculatedHash = this.generateHash(reverseHashString, '');
    
    return calculatedHash === hash;
  }
  
  static async processRefund(transactionId: string, amount: number, reason: string) {
    // PayU refund API integration
    const refundData = {
      merchantKey: PAYU_CONFIG.MERCHANT_KEY,
      merchantTransactionIds: transactionId,
      refundAmount: amount,
      reason: reason
    };
    
    // In production, make actual API call to PayU refund endpoint
    return {
      success: true,
      refundId: `REF_${Date.now()}`,
      status: 'initiated',
      message: 'Refund initiated successfully'
    };
  }
}

// PayU Webhook Handler
export class PayUWebhookHandler {
  static async handlePaymentSuccess(webhookData: any) {
    try {
      // Verify webhook authenticity
      const isValid = PayUProcessor.verifyPaymentResponse(webhookData);
      
      if (!isValid) {
        throw new Error('Invalid webhook signature');
      }
      
      // Process successful payment
      const paymentDetails = {
        transactionId: webhookData.txnid,
        payuId: webhookData.mihpayid,
        amount: parseFloat(webhookData.amount),
        status: webhookData.status,
        startupId: webhookData.udf1,
        shares: parseInt(webhookData.udf2),
        sharePrice: parseFloat(webhookData.udf3),
        investorEmail: webhookData.email,
        paymentMethod: webhookData.mode,
        timestamp: new Date()
      };
      
      // Update database with investment details
      // Send confirmation emails
      // Update startup funding status
      
      console.log("PayU Payment successful:", paymentDetails);
      
      return {
        status: "success",
        message: "Payment processed successfully",
        data: paymentDetails
      };
    } catch (error) {
      console.error("PayU webhook processing error:", error);
      return {
        status: "error",
        message: "Webhook processing failed"
      };
    }
  }
  
  static async handlePaymentFailure(webhookData: any) {
    try {
      const failureDetails = {
        transactionId: webhookData.txnid,
        amount: parseFloat(webhookData.amount),
        status: webhookData.status,
        error: webhookData.error_Message,
        timestamp: new Date()
      };
      
      // Log failure details
      // Send failure notification to user
      // Update transaction status
      
      console.log("PayU Payment failed:", failureDetails);
      
      return {
        status: "failed",
        message: "Payment processing failed",
        data: failureDetails
      };
    } catch (error) {
      console.error("PayU failure webhook error:", error);
      return {
        status: "error",
        message: "Failure webhook processing failed"
      };
    }
  }
}