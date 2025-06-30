'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Smartphone, Building, User, MapPin, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { PayUProcessor } from '@/lib/payment-gateways/payu-config';
import { StripeProcessor } from '@/lib/payment-gateways/stripe-config';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  startupName: string;
  shares: number;
  sharePrice: number;
  onSuccess: (paymentData: any) => void;
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  startupName, 
  shares, 
  sharePrice,
  onSuccess 
}: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Customer Information
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  // Payment Data
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankAccount: '',
    ifscCode: ''
  });

  const handleInputChange = (field: string, value: string, section: 'customer' | 'payment' = 'customer') => {
    if (section === 'customer') {
      setCustomerData(prev => ({ ...prev, [field]: value }));
    } else {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!customerData.firstName) newErrors.firstName = 'First name is required';
      if (!customerData.lastName) newErrors.lastName = 'Last name is required';
      if (!customerData.email) newErrors.email = 'Email is required';
      if (!customerData.phone) newErrors.phone = 'Phone number is required';
      if (!customerData.address) newErrors.address = 'Address is required';
      if (!customerData.city) newErrors.city = 'City is required';
      if (!customerData.state) newErrors.state = 'State is required';
      if (!customerData.pincode) newErrors.pincode = 'Pincode is required';
    }
    
    if (step === 2) {
      if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
      
      if (paymentMethod === 'card') {
        if (!paymentData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!paymentData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!paymentData.cvv) newErrors.cvv = 'CVV is required';
        if (!paymentData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
      }
      
      if (paymentMethod === 'upi') {
        if (!paymentData.upiId) newErrors.upiId = 'UPI ID is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processPayment = async () => {
    if (!validateStep(2)) return;
    
    setIsProcessing(true);
    setCurrentStep(3);
    
    try {
      const paymentPayload = {
        amount: amount,
        startupName: startupName,
        startupId: 1,
        shares: shares,
        sharePrice: sharePrice,
        customerName: `${customerData.firstName} ${customerData.lastName}`,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        customerAddress: {
          address: customerData.address,
          city: customerData.city,
          state: customerData.state,
          pincode: customerData.pincode,
          country: customerData.country
        },
        paymentMethod: paymentMethod,
        ...paymentData
      };

      let result;
      
      if (paymentMethod === 'card') {
        // Use Stripe for card payments
        result = await StripeProcessor.processCardPayment(paymentPayload);
      } else if (paymentMethod === 'upi') {
        // Use PayU for UPI payments
        result = await PayUProcessor.initiatePayment(paymentPayload);
      }
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (result?.success) {
        setCurrentStep(4);
        onSuccess(result);
      } else {
        throw new Error(result?.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrors({ payment: 'Payment failed. Please try again.' });
      setCurrentStep(2);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setPaymentMethod('');
    setCustomerData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    });
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      upiId: '',
      bankAccount: '',
      ifscCode: ''
    });
    setErrors({});
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const progress = (currentStep / 4) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-primary-900 border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {currentStep === 1 && "Customer Information"}
            {currentStep === 2 && "Payment Details"}
            {currentStep === 3 && "Processing Payment"}
            {currentStep === 4 && "Payment Successful"}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {currentStep === 1 && "Please provide your details for document delivery"}
            {currentStep === 2 && "Choose your payment method and enter details"}
            {currentStep === 3 && "Please wait while we process your payment"}
            {currentStep === 4 && "Your investment has been processed successfully"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Investment Summary */}
        <Card className="bg-white/5 border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60">Investment in</p>
                <p className="text-white font-semibold">{startupName}</p>
              </div>
              <div>
                <p className="text-white/60">Amount</p>
                <p className="text-white font-semibold">${amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-white/60">Shares</p>
                <p className="text-white font-semibold">{shares}</p>
              </div>
              <div>
                <p className="text-white/60">Price per share</p>
                <p className="text-white font-semibold">${sharePrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Customer Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Alert className="bg-primary-600/20 border-primary-400/50">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-primary-100">
                <strong>Document Delivery:</strong> Your investment documents will be delivered to the address provided below within 7-17 business days.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">First Name *</Label>
                <Input
                  id="firstName"
                  value={customerData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                <Input
                  id="lastName"
                  value={customerData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Complete Address *</Label>
              <Textarea
                id="address"
                value={customerData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-white/10 border-white/30 text-white resize-none"
                rows={3}
                placeholder="Enter your complete address for document delivery"
              />
              {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">City *</Label>
                <Input
                  id="city"
                  value={customerData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Enter city"
                />
                {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state" className="text-white">State *</Label>
                <Select value={customerData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-white">Pincode *</Label>
                <Input
                  id="pincode"
                  value={customerData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Enter pincode"
                  maxLength={6}
                />
                {errors.pincode && <p className="text-red-400 text-sm">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white">Select Payment Method *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'bg-primary-600/20 border-primary-400' 
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CardContent className="p-4 text-center">
                    <CreditCard className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-white font-medium">Credit/Debit Card</p>
                    <p className="text-white/60 text-sm">Visa, Mastercard, etc.</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all ${
                    paymentMethod === 'upi' 
                      ? 'bg-primary-600/20 border-primary-400' 
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <CardContent className="p-4 text-center">
                    <Smartphone className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-white font-medium">UPI</p>
                    <p className="text-white/60 text-sm">PhonePe, GPay, Paytm</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all ${
                    paymentMethod === 'netbanking' 
                      ? 'bg-primary-600/20 border-primary-400' 
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <CardContent className="p-4 text-center">
                    <Building className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-white font-medium">Net Banking</p>
                    <p className="text-white/60 text-sm">All major banks</p>
                  </CardContent>
                </Card>
              </div>
              {errors.paymentMethod && <p className="text-red-400 text-sm">{errors.paymentMethod}</p>}
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="text-white">Cardholder Name *</Label>
                  <Input
                    id="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value, 'payment')}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Enter cardholder name"
                  />
                  {errors.cardholderName && <p className="text-red-400 text-sm">{errors.cardholderName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-white">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value, 'payment')}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm">{errors.cardNumber}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-white">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value, 'payment')}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && <p className="text-red-400 text-sm">{errors.expiryDate}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-white">CVV *</Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value, 'payment')}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && <p className="text-red-400 text-sm">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId" className="text-white">UPI ID *</Label>
                  <Input
                    id="upiId"
                    value={paymentData.upiId}
                    onChange={(e) => handleInputChange('upiId', e.target.value, 'payment')}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="yourname@paytm"
                  />
                  {errors.upiId && <p className="text-red-400 text-sm">{errors.upiId}</p>}
                </div>
              </div>
            )}

            {/* Net Banking Form */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank" className="text-white">Select Bank *</Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {errors.payment && (
              <Alert className="bg-red-500/20 border-red-500/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-400">
                  {errors.payment}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Step 3: Processing */}
        {currentStep === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CreditCard className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Processing Your Payment</h3>
            <p className="text-white/70 mb-6">Please wait while we securely process your investment...</p>
            <div className="w-full bg-white/10 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-white/60 text-sm">This may take a few moments. Please do not close this window.</p>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-white/70 mb-6">Your investment in {startupName} has been processed successfully.</p>
            
            <Alert className="bg-primary-600/20 border-primary-400/50 mb-6">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-primary-100">
                <strong>Document Delivery:</strong> Your investment documents will reach you within the next 7-17 business days at the provided address.
              </AlertDescription>
            </Alert>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Investment Amount</p>
                  <p className="text-white font-semibold">${amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-white/60">Shares Purchased</p>
                  <p className="text-white font-semibold">{shares}</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
            >
              Continue to Portfolio
            </Button>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 3 && (
          <div className="flex justify-between pt-6">
            <Button
              onClick={currentStep === 1 ? handleClose : prevStep}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>
            
            <Button
              onClick={currentStep === 2 ? processPayment : nextStep}
              disabled={isProcessing}
              className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
            >
              {currentStep === 2 ? 'Pay Now' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}