'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, CheckCircle, AlertCircle, Phone, Mail, CreditCard, User, ArrowLeft, ArrowRight } from 'lucide-react';

export default function InvestorRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Identity Verification
    panNumber: '',
    panCardFile: null,
    aadharNumber: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Financial Information
    annualIncome: '',
    investmentExperience: '',
    riskTolerance: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Verification
    emailOtp: '',
    phoneOtp: '',
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    investorDeclaration: false
  });

  const [verificationStatus, setVerificationStatus] = useState({
    email: 'pending', // pending, sent, verified
    phone: 'pending'  // pending, sent, verified
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const sendEmailOtp = async () => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, email: 'sent' }));
      setIsLoading(false);
    }, 2000);
  };

  const sendPhoneOtp = async () => {
    if (!formData.phone) {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, phone: 'sent' }));
      setIsLoading(false);
    }, 2000);
  };

  const verifyEmailOtp = () => {
    if (formData.emailOtp === '123456') { // Mock verification
      setVerificationStatus(prev => ({ ...prev, email: 'verified' }));
    } else {
      setErrors(prev => ({ ...prev, emailOtp: 'Invalid OTP' }));
    }
  };

  const verifyPhoneOtp = () => {
    if (formData.phoneOtp === '123456') { // Mock verification
      setVerificationStatus(prev => ({ ...prev, phone: 'verified' }));
    } else {
      setErrors(prev => ({ ...prev, phoneOtp: 'Invalid OTP' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;
      case 2:
        if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
        if (!formData.panCardFile) newErrors.panCardFile = 'PAN card image is required';
        if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
        break;
      case 3:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        break;
      case 4:
        if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
        if (!formData.investmentExperience) newErrors.investmentExperience = 'Investment experience is required';
        if (!formData.riskTolerance) newErrors.riskTolerance = 'Risk tolerance is required';
        break;
      case 5:
        if (verificationStatus.email !== 'verified') newErrors.emailVerification = 'Email verification required';
        if (verificationStatus.phone !== 'verified') newErrors.phoneVerification = 'Phone verification required';
        break;
      case 6:
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'Please accept terms and conditions';
        if (!formData.privacyAccepted) newErrors.privacyAccepted = 'Please accept privacy policy';
        if (!formData.investorDeclaration) newErrors.investorDeclaration = 'Please accept investor declaration';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(6)) {
      setIsLoading(true);
      // Simulate registration
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to success page or login
        window.location.href = '/auth/investor/login';
      }, 3000);
    }
  };

  const progress = (currentStep / 6) * 100;

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
            <div className="flex items-center space-x-4">
              <Link href="/auth/investor/login" className="text-white/80 hover:text-white transition-colors">
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Investor Registration</h1>
          <p className="text-white/70">Join Movo and start investing in innovative startups</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Step {currentStep} of 6</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Identity Verification"}
              {currentStep === 3 && "Address Information"}
              {currentStep === 4 && "Financial Profile"}
              {currentStep === 5 && "Verify Contact Details"}
              {currentStep === 6 && "Account Security & Agreements"}
            </CardTitle>
            <CardDescription className="text-white/70">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Upload your identity documents"}
              {currentStep === 3 && "Provide your address details"}
              {currentStep === 4 && "Help us understand your investment profile"}
              {currentStep === 5 && "Verify your email and phone number"}
              {currentStep === 6 && "Set up your account security"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName\" className="text-white">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
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
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-white">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                  />
                  {errors.dateOfBirth && <p className="text-red-400 text-sm">{errors.dateOfBirth}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-white">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber" className="text-white">PAN Number *</Label>
                    <Input
                      id="panNumber"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                    {errors.panNumber && <p className="text-red-400 text-sm">{errors.panNumber}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber" className="text-white">Aadhar Number *</Label>
                    <Input
                      id="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="XXXX XXXX XXXX"
                      maxLength={12}
                    />
                    {errors.aadharNumber && <p className="text-red-400 text-sm">{errors.aadharNumber}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">PAN Card Image *</Label>
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:bg-white/5 transition-colors">
                    <Upload className="h-12 w-12 text-white/60 mx-auto mb-4" />
                    <p className="text-white mb-2">Upload your PAN card image</p>
                    <p className="text-white/60 text-sm">Supports JPG, PNG (Max 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('panCardFile', e.target.files[0])}
                      className="hidden"
                      id="panCardUpload"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4 border-white/30 text-white hover:bg-white/10"
                      onClick={() => document.getElementById('panCardUpload').click()}
                    >
                      Choose File
                    </Button>
                    {formData.panCardFile && (
                      <p className="text-green-400 text-sm mt-2">✓ {formData.panCardFile.name}</p>
                    )}
                  </div>
                  {errors.panCardFile && <p className="text-red-400 text-sm">{errors.panCardFile}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Address Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-white/10 border-white/30 text-white"
                    placeholder="Enter your full address"
                  />
                  {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="Enter your city"
                    />
                    {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-white">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        {/* Add more states */}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-white">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="text-red-400 text-sm">{errors.pincode}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      disabled
                      className="bg-white/10 border-white/30 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Financial Profile */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome" className="text-white">Annual Income *</Label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange('annualIncome', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select annual income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-5-lakh">Below ₹5 Lakh</SelectItem>
                      <SelectItem value="5-10-lakh">₹5 - ₹10 Lakh</SelectItem>
                      <SelectItem value="10-25-lakh">₹10 - ₹25 Lakh</SelectItem>
                      <SelectItem value="25-50-lakh">₹25 - ₹50 Lakh</SelectItem>
                      <SelectItem value="50-lakh-1-crore">₹50 Lakh - ₹1 Crore</SelectItem>
                      <SelectItem value="above-1-crore">Above ₹1 Crore</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.annualIncome && <p className="text-red-400 text-sm">{errors.annualIncome}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentExperience" className="text-white">Investment Experience *</Label>
                  <Select value={formData.investmentExperience} onValueChange={(value) => handleInputChange('investmentExperience', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select your investment experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.investmentExperience && <p className="text-red-400 text-sm">{errors.investmentExperience}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="riskTolerance" className="text-white">Risk Tolerance *</Label>
                  <Select value={formData.riskTolerance} onValueChange={(value) => handleInputChange('riskTolerance', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select your risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative - Low risk, stable returns</SelectItem>
                      <SelectItem value="moderate">Moderate - Balanced risk and returns</SelectItem>
                      <SelectItem value="aggressive">Aggressive - High risk, high returns</SelectItem>
                      <SelectItem value="very-aggressive">Very Aggressive - Maximum risk tolerance</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.riskTolerance && <p className="text-red-400 text-sm">{errors.riskTolerance}</p>}
                </div>
              </div>
            )}

            {/* Step 5: Verification */}
            {currentStep === 5 && (
              <div className="space-y-6">
                {/* Email Verification */}
                <Card className="bg-white/5 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>Email Verification</span>
                      {verificationStatus.email === 'verified' && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        value={formData.email}
                        disabled
                        className="flex-1 bg-white/10 border-white/30 text-white"
                      />
                      {verificationStatus.email === 'pending' && (
                        <Button 
                          onClick={sendEmailOtp}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Send OTP
                        </Button>
                      )}
                      {verificationStatus.email === 'verified' && (
                        <Button disabled className="bg-green-500">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verified
                        </Button>
                      )}
                    </div>
                    
                    {verificationStatus.email === 'sent' && (
                      <div className="flex items-center space-x-4">
                        <Input
                          placeholder="Enter 6-digit OTP"
                          value={formData.emailOtp}
                          onChange={(e) => handleInputChange('emailOtp', e.target.value)}
                          className="flex-1 bg-white/10 border-white/30 text-white"
                          maxLength={6}
                        />
                        <Button onClick={verifyEmailOtp} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          Verify
                        </Button>
                      </div>
                    )}
                    {errors.emailOtp && <p className="text-red-400 text-sm">{errors.emailOtp}</p>}
                  </CardContent>
                </Card>

                {/* Phone Verification */}
                <Card className="bg-white/5 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>Phone Verification</span>
                      {verificationStatus.phone === 'verified' && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        value={formData.phone}
                        disabled
                        className="flex-1 bg-white/10 border-white/30 text-white"
                      />
                      {verificationStatus.phone === 'pending' && (
                        <Button 
                          onClick={sendPhoneOtp}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Send OTP
                        </Button>
                      )}
                      {verificationStatus.phone === 'verified' && (
                        <Button disabled className="bg-green-500">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verified
                        </Button>
                      )}
                    </div>
                    
                    {verificationStatus.phone === 'sent' && (
                      <div className="flex items-center space-x-4">
                        <Input
                          placeholder="Enter 6-digit OTP"
                          value={formData.phoneOtp}
                          onChange={(e) => handleInputChange('phoneOtp', e.target.value)}
                          className="flex-1 bg-white/10 border-white/30 text-white"
                          maxLength={6}
                        />
                        <Button onClick={verifyPhoneOtp} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          Verify
                        </Button>
                      </div>
                    )}
                    {errors.phoneOtp && <p className="text-red-400 text-sm">{errors.phoneOtp}</p>}
                  </CardContent>
                </Card>

                {(errors.emailVerification || errors.phoneVerification) && (
                  <Alert className="bg-red-500/20 border-red-500/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-400">
                      Please verify both email and phone number to continue.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 6: Security & Agreements */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="Create a strong password"
                    />
                    {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                    />
                    <Label htmlFor="termsAccepted" className="text-white text-sm">
                      I accept the <Link href="/terms" className="text-blue-400 hover:underline">Terms and Conditions</Link> *
                    </Label>
                  </div>
                  {errors.termsAccepted && <p className="text-red-400 text-sm">{errors.termsAccepted}</p>}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked)}
                    />
                    <Label htmlFor="privacyAccepted" className="text-white text-sm">
                      I accept the <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link> *
                    </Label>
                  </div>
                  {errors.privacyAccepted && <p className="text-red-400 text-sm">{errors.privacyAccepted}</p>}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="investorDeclaration"
                      checked={formData.investorDeclaration}
                      onCheckedChange={(checked) => handleInputChange('investorDeclaration', checked)}
                    />
                    <Label htmlFor="investorDeclaration" className="text-white text-sm">
                      I declare that I understand the risks involved in startup investments and I am investing with my own funds *
                    </Label>
                  </div>
                  {errors.investorDeclaration && <p className="text-red-400 text-sm">{errors.investorDeclaration}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < 6 ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}