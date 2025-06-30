'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, ArrowRight, Download, MessageSquare, FileText, Home } from 'lucide-react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid');
  const amount = searchParams.get('amount');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-custom-gradient">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/WhatsApp Image 2025-06-25 at 08.55.46.jpeg" 
                alt="Denzope Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white/10 p-1"
              />
              <span className="text-white text-xl font-bold">Denzope</span>
            </Link>
            <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-6 pt-20">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <CardTitle className="text-white text-2xl">Payment Successful!</CardTitle>
            <CardDescription className="text-white/70">
              Your investment has been processed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4 space-y-3">
              {txnid && (
                <div className="flex justify-between">
                  <span className="text-white/70">Transaction ID</span>
                  <span className="text-white font-mono">{txnid}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between">
                  <span className="text-white/70">Amount Paid</span>
                  <span className="text-white font-semibold">${amount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/70">Status</span>
                <span className="text-green-400 capitalize">{status || 'Success'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Payment Date</span>
                <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <Alert className="bg-primary-600/20 border-primary-400/50">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-primary-100">
                <strong>Document Delivery Notice:</strong> Your investment documents will reach you within the next 7-17 business days at your registered address. You will also receive digital copies via email shortly.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h3 className="text-white font-semibold">What's Next?</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Your shares have been allocated to your portfolio</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Confirmation email sent to your registered email</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Physical documents will be delivered within 7-17 business days</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>You can now track your investment in your dashboard</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/investor" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600">
                  View Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Link href="/chat">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}