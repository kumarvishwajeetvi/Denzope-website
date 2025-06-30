import { NextRequest, NextResponse } from 'next/server';
import { PayUWebhookHandler, PayUProcessor } from '@/lib/payment-gateways/payu-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook signature
    const isValid = PayUProcessor.verifyPaymentResponse(body);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Process webhook based on payment status
    let result;
    
    if (body.status === 'success') {
      result = await PayUWebhookHandler.handlePaymentSuccess(body);
    } else {
      result = await PayUWebhookHandler.handlePaymentFailure(body);
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('PayU webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}