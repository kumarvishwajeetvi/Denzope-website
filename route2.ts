import { NextRequest, NextResponse } from 'next/server';
import { PayUWebhookHandler } from '@/lib/payment-gateways/payu-config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const paymentData = Object.fromEntries(formData.entries());
    
    // Process failed payment
    await PayUWebhookHandler.handlePaymentFailure(paymentData);
    
    // Redirect to failure page with error details
    const failureUrl = new URL('/payment/failure', request.url);
    failureUrl.searchParams.set('txnid', paymentData.txnid as string);
    failureUrl.searchParams.set('error', paymentData.error_Message as string || 'Payment failed');
    failureUrl.searchParams.set('status', 'failed');
    
    return NextResponse.redirect(failureUrl);
  } catch (error) {
    console.error('PayU failure handler error:', error);
    
    const errorUrl = new URL('/payment/failure', request.url);
    errorUrl.searchParams.set('error', 'Payment processing error');
    
    return NextResponse.redirect(errorUrl);
  }
}