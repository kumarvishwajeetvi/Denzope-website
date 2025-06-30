import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const paymentData = Object.fromEntries(formData.entries());
    
    // Log cancelled payment
    console.log('PayU payment cancelled:', paymentData);
    
    // Redirect to cancellation page
    const cancelUrl = new URL('/payment/cancelled', request.url);
    cancelUrl.searchParams.set('txnid', paymentData.txnid as string);
    cancelUrl.searchParams.set('status', 'cancelled');
    
    return NextResponse.redirect(cancelUrl);
  } catch (error) {
    console.error('PayU cancel handler error:', error);
    
    const errorUrl = new URL('/payment/failure', request.url);
    errorUrl.searchParams.set('error', 'Payment cancellation error');
    
    return NextResponse.redirect(errorUrl);
  }
}