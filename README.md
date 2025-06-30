# Denzope - Investment Platform

A comprehensive investment platform connecting investors with innovative startups, featuring multiple secure payment gateways including Stripe and PayU.

## Payment Gateway Integration

### Features
- **Multiple Payment Gateways**: Stripe and PayU integration
- **Comprehensive Payment Methods**: 
  - Credit/Debit Cards (Visa, Mastercard, American Express)
  - UPI (Unified Payments Interface)
  - Net Banking
  - Digital Wallets
  - EMI Options (PayU)
- **Secure Processing**: 256-bit SSL encryption and PCI DSS compliance
- **Platform Fee**: Configurable platform fee (currently set to 0%)
- **Real-time Processing**: Instant payment confirmation and updates
- **Webhook Support**: Automated payment status updates
- **Multi-currency Support**: USD and INR

### Payment Gateways

#### 1. Stripe Integration
- **Global Payment Processing**: Supports international cards and payments
- **Advanced Features**: Subscription billing, marketplace payments
- **Strong Security**: PCI Level 1 certified
- **Developer Friendly**: Comprehensive APIs and documentation

#### 2. PayU Integration
- **Indian Market Focus**: Optimized for Indian payment methods
- **Local Payment Methods**: UPI, Net Banking, Wallets
- **High Success Rates**: Optimized routing for Indian banks
- **EMI Support**: Easy installment options

### Payment Configuration

The platform is configured to receive payments to:

**Merchant Details:**
- Business Name: Denzope Investment Platform
- Merchant Name: Kumar Vishwajeet Choubey
- Email: kumarvishwajeetchoubey@gmail.com

**Stripe Configuration:**
- Supports global payments
- Multi-currency processing
- Advanced fraud detection

**PayU Configuration:**
- Optimized for Indian market
- Local payment method support
- High conversion rates

### Setup Instructions

#### Environment Variables
Create a `.env.local` file with the following variables:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# PayU Configuration
PAYU_MERCHANT_KEY=your_payu_merchant_key
PAYU_MERCHANT_SALT=your_payu_merchant_salt

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### 1. Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Configure webhook endpoints:
   - `https://yourdomain.com/api/webhooks/stripe`
4. Update environment variables

#### 2. PayU Setup
1. Create a PayU merchant account
2. Get your merchant key and salt
3. Configure success/failure URLs:
   - Success: `https://yourdomain.com/api/payu/success`
   - Failure: `https://yourdomain.com/api/payu/failure`
   - Cancel: `https://yourdomain.com/api/payu/cancel`
4. Update environment variables

### Payment Flow

#### Stripe Flow
1. **Payment Initiation**: User selects amount and payment method
2. **Client-side Processing**: Stripe Elements for secure card input
3. **Server Confirmation**: Payment confirmed on server
4. **Webhook Processing**: Real-time status updates
5. **Success Handling**: Portfolio updates and confirmations

#### PayU Flow
1. **Payment Initiation**: User selects amount and payment method
2. **Redirect to PayU**: Secure redirect to PayU payment page
3. **Payment Processing**: User completes payment on PayU
4. **Return Handling**: User redirected back with payment status
5. **Webhook Processing**: Server processes payment confirmation

### Security Features

- **PCI DSS Compliance**: Both gateways are PCI Level 1 certified
- **SSL Encryption**: End-to-end encryption for all transactions
- **Webhook Verification**: Cryptographic verification of payment notifications
- **Fraud Detection**: Real-time fraud monitoring and prevention
- **Secure Storage**: No sensitive payment data stored locally
- **3D Secure**: Additional authentication for card payments

### Payment Methods Supported

#### Stripe
- ✅ Credit/Debit Cards (Global)
- ✅ UPI (India)
- ✅ Digital Wallets
- ✅ Bank Transfers
- ✅ Buy Now Pay Later

#### PayU
- ✅ Credit/Debit Cards (India)
- ✅ UPI
- ✅ Net Banking (All major Indian banks)
- ✅ Digital Wallets (Paytm, PhonePe, etc.)
- ✅ EMI Options
- ✅ Cash Cards

### Platform Fees

- **Investment Fee**: 0% (as requested)
- **Processing Fee**: Absorbed by platform
- **Currency Support**: USD and INR
- **Transparent Pricing**: All fees displayed upfront

### Error Handling

- **Payment Failures**: Comprehensive error messages and retry options
- **Network Issues**: Automatic retry mechanisms
- **Timeout Handling**: Graceful handling of payment timeouts
- **User Guidance**: Clear instructions for resolving payment issues

### Monitoring & Analytics

- **Transaction Logging**: Comprehensive payment logs
- **Success Rate Tracking**: Monitor payment success rates
- **Performance Metrics**: Payment processing time analysis
- **Error Analytics**: Track and analyze payment failures

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Production Deployment

1. **Environment Setup**
   - Configure production environment variables
   - Set up SSL certificates
   - Configure domain and DNS

2. **Payment Gateway Setup**
   - Switch to production API keys
   - Configure production webhook URLs
   - Test payment flows thoroughly

3. **Security Configuration**
   - Enable webhook signature verification
   - Configure rate limiting
   - Set up monitoring and alerting

4. **Database Setup**
   - Configure payment logging
   - Set up transaction history
   - Implement backup strategies

## Testing

### Test Cards (Stripe)
- **Visa**: 4242424242424242
- **Mastercard**: 5555555555554444
- **American Express**: 378282246310005
- **Declined**: 4000000000000002

### Test UPI (PayU)
- **Success**: Use any valid UPI ID format
- **Failure**: Use invalid UPI ID format

## Support

For payment-related issues:
- **Email**: kumarvishwajeetchoubey@gmail.com
- **Documentation**: Check gateway-specific documentation
- **Support**: Contact respective gateway support teams

## Compliance

- **PCI DSS**: Level 1 compliance through payment gateways
- **Data Protection**: GDPR and local data protection compliance
- **Financial Regulations**: Compliance with local financial regulations
- **KYC/AML**: Know Your Customer and Anti-Money Laundering compliance

## Roadmap

- [ ] Add more payment gateways (Razorpay, CCAvenue)
- [ ] Implement subscription billing
- [ ] Add cryptocurrency payment support
- [ ] Enhanced fraud detection
- [ ] Mobile payment optimization
- [ ] International expansion support