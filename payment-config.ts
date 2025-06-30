// Payment Gateway Configuration
export const PAYMENT_CONFIG = {
  // Your merchant account details
  MERCHANT_ID: "MOVO_MERCHANT_001",
  MERCHANT_NAME: "Movo Investment Platform",
  
  // Your bank account details for receiving payments
  BANK_ACCOUNT: {
    accountNumber: "1234567890123456", // Replace with your actual account number
    ifscCode: "HDFC0001234", // Replace with your bank's IFSC code
    accountHolderName: "Kumar Vishwajeet Choubey",
    bankName: "HDFC Bank",
    branch: "Main Branch"
  },
  
  // UPI details for receiving payments
  UPI_CONFIG: {
    merchantUpiId: "kumarvishwajeetchoubey@paytm", // Your UPI ID
    merchantName: "Kumar Vishwajeet Choubey",
    merchantCode: "MOVO001"
  },
  
  // Platform fee configuration
  PLATFORM_FEE_PERCENTAGE: 2.5, // 2.5% platform fee
  
  // Payment gateway endpoints (mock for demo)
  PAYMENT_GATEWAY: {
    baseUrl: "https://api.razorpay.com/v1", // Example: Razorpay
    cardPaymentEndpoint: "/payments",
    upiPaymentEndpoint: "/payments/upi",
    webhookEndpoint: "/webhooks/payment"
  },
  
  // Security configuration
  SECURITY: {
    encryptionKey: "your-encryption-key-here",
    webhookSecret: "your-webhook-secret-here"
  }
};

// Payment processing functions
export class PaymentProcessor {
  static async processCardPayment(paymentData: any) {
    // In production, integrate with actual payment gateway
    const payload = {
      amount: paymentData.amount * 100, // Convert to paise/cents
      currency: "INR",
      payment_capture: 1,
      description: `Investment in ${paymentData.startupName}`,
      customer: {
        name: paymentData.customerName,
        email: paymentData.customerEmail,
        contact: paymentData.customerPhone
      },
      notes: {
        startup_id: paymentData.startupId,
        shares: paymentData.shares,
        share_price: paymentData.sharePrice
      }
    };
    
    // Mock successful response
    return {
      success: true,
      paymentId: `pay_${Date.now()}`,
      status: "captured",
      amount: paymentData.amount,
      method: "card"
    };
  }
  
  static async processUpiPayment(paymentData: any) {
    // In production, integrate with UPI payment gateway
    const payload = {
      amount: paymentData.amount * 100,
      currency: "INR",
      method: "upi",
      upi: {
        vpa: paymentData.upiId || PAYMENT_CONFIG.UPI_CONFIG.merchantUpiId
      },
      description: `Investment in ${paymentData.startupName}`,
      customer: {
        name: paymentData.customerName,
        email: paymentData.customerEmail,
        contact: paymentData.customerPhone
      }
    };
    
    // Mock successful response
    return {
      success: true,
      paymentId: `upi_${Date.now()}`,
      status: "captured",
      amount: paymentData.amount,
      method: "upi"
    };
  }
  
  static calculatePlatformFee(amount: number): number {
    return amount * (PAYMENT_CONFIG.PLATFORM_FEE_PERCENTAGE / 100);
  }
  
  static calculateTotalAmount(investmentAmount: number): number {
    const platformFee = this.calculatePlatformFee(investmentAmount);
    return investmentAmount + platformFee;
  }
}

// Webhook handler for payment confirmations
export class PaymentWebhookHandler {
  static async handlePaymentSuccess(webhookData: any) {
    // Process successful payment
    // Update database with investment details
    // Send confirmation emails
    // Update startup funding status
    
    console.log("Payment successful:", webhookData);
    
    return {
      status: "success",
      message: "Payment processed successfully"
    };
  }
  
  static async handlePaymentFailure(webhookData: any) {
    // Handle failed payment
    // Send failure notification
    // Log error details
    
    console.log("Payment failed:", webhookData);
    
    return {
      status: "failed",
      message: "Payment processing failed"
    };
  }
}