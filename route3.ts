import { NextRequest, NextResponse } from 'next/server';
import { PayUWebhookHandler } from '@/lib/payment-gateways/payu-config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const paymentData = Object.fromEntries(formData.entries());
    
    // Process successful payment
    const result = await PayUWebhookHandler.handlePaymentSuccess(paymentData);
    
    if (result.status === 'success') {
      // Redirect to success page with payment details
      const successUrl = new URL('/payment/success', request.url);
      successUrl.searchParams.set('txnid', paymentData.txnid as string);
      successUrl.searchParams.set('amount', paymentData.amount as string);
      successUrl.searchParams.set('status', 'success');
      
      return NextResponse.redirect(successUrl);
    } else {
      // Redirect to failure page
      const failureUrl = new URL('/payment/failure', request.url);
      failureUrl.searchParams.set('error', 'Payment verification failed');
      
      return NextResponse.redirect(failureUrl);
    }
  } catch (error) {
    console.error('PayU success handler error:', error);
    
    const errorUrl = new URL('/payment/failure', request.url);
    errorUrl.searchParams.set('error', 'Payment processing error');
    
    return NextResponse.redirect(errorUrl);
  }
}