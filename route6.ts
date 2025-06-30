import { NextRequest, NextResponse } from 'next/server';
import { StripeWebhookHandler } from '@/lib/payment-gateways/stripe-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    // Verify webhook signature
    if (!signature || !StripeWebhookHandler.verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    const event = JSON.parse(body);
    let result;
    
    // Process webhook based on event type
    switch (event.type) {
      case 'payment_intent.succeeded':
        result = await StripeWebhookHandler.handlePaymentSuccess(event);
        break;
      case 'payment_intent.payment_failed':
        result = await StripeWebhookHandler.handlePaymentFailure(event);
        break;
      default:
        console.log('Unhandled Stripe webhook event:', event.type);
        return NextResponse.json({ received: true });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Stripe webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}