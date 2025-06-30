import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhookHandler } from '@/lib/payment-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-razorpay-signature'); // Example for Razorpay
    
    // Verify webhook signature (implement based on your payment gateway)
    // const isValid = verifyWebhookSignature(body, signature);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }
    
    // Process webhook based on event type
    switch (body.event) {
      case 'payment.captured':
        await PaymentWebhookHandler.handlePaymentSuccess(body.payload);
        break;
      case 'payment.failed':
        await PaymentWebhookHandler.handlePaymentFailure(body.payload);
        break;
      default:
        console.log('Unhandled webhook event:', body.event);
    }
    
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}