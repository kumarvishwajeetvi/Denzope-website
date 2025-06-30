'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentCancelled() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white text-xl font-bold">Movo</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-6 pt-20">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            </div>
            <CardTitle className="text-white text-2xl">Payment Cancelled</CardTitle>
            <CardDescription className="text-white/70">
              You cancelled the payment process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 space-y-3">
              {txnid && (
                <div className="flex justify-between">
                  <span className="text-white/70">Transaction ID</span>
                  <span className="text-white font-mono">{txnid}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/70">Status</span>
                <span className="text-yellow-400">Cancelled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Date</span>
                <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="text-center text-white/70">
              <p>No charges have been made to your account.</p>
              <p>You can try the payment again or choose a different payment method.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.history.back()}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}