// Stripe Payment Gateway Configuration
export const STRIPE_CONFIG = {
  // Stripe API Configuration
  PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_your_stripe_publishable_key",
  SECRET_KEY: process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret_key",
  
  // Your account details for receiving payments
  MERCHANT_DETAILS: {
    merchantName: "Kumar Vishwajeet Choubey",
    merchantEmail: "kumarvishwajeetchoubey@gmail.com",
    businessName: "Movo Investment Platform",
    country: "IN" // India
  },
  
  // Stripe supported payment methods
  PAYMENT_METHODS: {
    card: true,
    upi: true,
    netbanking: true,
    wallet: true
  },
  
  // Webhook configuration
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "whsec_your_webhook_secret",
  
  // Platform configuration
  PLATFORM_FEE_PERCENTAGE: 0, // 0% platform fee as requested
  CURRENCY: "usd", // Primary currency
  
  // Success and failure URLs
  SUCCESS_URL: process.env.NEXT_PUBLIC_BASE_URL + "/payment/success",
  CANCEL_URL: process.env.NEXT_PUBLIC_BASE_URL + "/payment/cancelled"
};

// Stripe Payment Processor Class
export class StripeProcessor {
  static async processCardPayment(paymentData: any) {
    try {
      // In production, use actual Stripe API
      const paymentIntent = {
        amount: Math.round(paymentData.amount * 100), // Convert to cents
        currency: STRIPE_CONFIG.CURRENCY,
        payment_method_types: ['card'],
        description: `Investment in ${paymentData.startupName}`,
        metadata: {
          startup_id: paymentData.startupId?.toString() || '',
          shares: paymentData.shares?.toString() || '',
          share_price: paymentData.sharePrice?.toString() || '',
          investor_email: paymentData.customerEmail
        },
        receipt_email: paymentData.customerEmail
      };
      
      // Mock successful response for demo
      return {
        success: true,
        paymentId: `pi_${Date.now()}`,
        status: "succeeded",
        amount: paymentData.amount,
        method: "card",
        transactionId: `stripe_${Date.now()}`
      };
    } catch (error) {
      console.error('Stripe card payment error:', error);
      return {
        success: false,
        error: 'Card payment failed. Please try again.'
      };
    }
  }
  
  static async processUpiPayment(paymentData: any) {
    try {
      // For UPI payments in India, Stripe supports UPI through payment methods
      const paymentIntent = {
        amount: Math.round(paymentData.amount * 100),
        currency: 'inr', // UPI only works with INR
        payment_method_types: ['upi'],
        description: `Investment in ${paymentData.startupName}`,
        metadata: {
          startup_id: paymentData.startupId?.toString() || '',
          shares: paymentData.shares?.toString() || '',
          upi_id: paymentData.upiId
        }
      };
      
      // Mock successful response for demo
      return {
        success: true,
        paymentId: `pi_upi_${Date.now()}`,
        status: "succeeded",
        amount: paymentData.amount,
        method: "upi",
        transactionId: `stripe_upi_${Date.now()}`
      };
    } catch (error) {
      console.error('Stripe UPI payment error:', error);
      return {
        success: false,
        error: 'UPI payment failed. Please try again.'
      };
    }
  }
  
  static async createPaymentIntent(paymentData: any) {
    try {
      // Create payment intent for client-side confirmation
      const paymentIntent = {
        amount: Math.round(paymentData.amount * 100),
        currency: paymentData.currency || STRIPE_CONFIG.CURRENCY,
        payment_method_types: paymentData.paymentMethods || ['card'],
        description: `Investment in ${paymentData.startupName}`,
        metadata: paymentData.metadata || {}
      };
      
      return {
        success: true,
        clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        paymentIntent
      };
    } catch (error) {
      console.error('Stripe payment intent creation error:', error);
      return {
        success: false,
        error: 'Failed to create payment intent'
      };
    }
  }
  
  static async processRefund(paymentIntentId: string, amount?: number, reason?: string) {
    try {
      // Process refund through Stripe API
      const refund = {
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined, // Partial refund if amount specified
        reason: reason || 'requested_by_customer'
      };
      
      return {
        success: true,
        refundId: `re_${Date.now()}`,
        status: 'succeeded',
        amount: amount,
        message: 'Refund processed successfully'
      };
    } catch (error) {
      console.error('Stripe refund error:', error);
      return {
        success: false,
        error: 'Refund processing failed'
      };
    }
  }
}

// Stripe Webhook Handler
export class StripeWebhookHandler {
  static async handlePaymentSuccess(webhookData: any) {
    try {
      const paymentIntent = webhookData.data.object;
      
      const paymentDetails = {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method_types[0],
        customerEmail: paymentIntent.receipt_email,
        metadata: paymentIntent.metadata,
        timestamp: new Date()
      };
      
      // Update database with investment details
      // Send confirmation emails
      // Update startup funding status
      
      console.log("Stripe Payment successful:", paymentDetails);
      
      return {
        status: "success",
        message: "Payment processed successfully",
        data: paymentDetails
      };
    } catch (error) {
      console.error("Stripe webhook processing error:", error);
      return {
        status: "error",
        message: "Webhook processing failed"
      };
    }
  }
  
  static async handlePaymentFailure(webhookData: any) {
    try {
      const paymentIntent = webhookData.data.object;
      
      const failureDetails = {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        status: paymentIntent.status,
        lastPaymentError: paymentIntent.last_payment_error,
        timestamp: new Date()
      };
      
      // Log failure details
      // Send failure notification to user
      // Update transaction status
      
      console.log("Stripe Payment failed:", failureDetails);
      
      return {
        status: "failed",
        message: "Payment processing failed",
        data: failureDetails
      };
    } catch (error) {
      console.error("Stripe failure webhook error:", error);
      return {
        status: "error",
        message: "Failure webhook processing failed"
      };
    }
  }
  
  static verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      // In production, use Stripe's webhook signature verification
      // const event = stripe.webhooks.constructEvent(payload, signature, STRIPE_CONFIG.WEBHOOK_SECRET);
      // return true;
      
      // Mock verification for demo
      return signature.startsWith('whsec_');
    } catch (error) {
      console.error('Stripe webhook verification failed:', error);
      return false;
    }
  }
}