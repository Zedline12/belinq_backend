import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configration } from 'src/config/configration.interface';
import Stripe from 'stripe';


@Injectable()
export class PaymentService {
   private config: Configration['payments'];
  private logger = new Logger(PaymentService.name);
  private stripe!:Stripe;
  constructor(configService:ConfigService) {
    this.config = configService.get<Configration['payments']>('payments');
  this.stripe = new Stripe(this.config.stripe.secretKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }
  async processGooglePayPayment(paymentToken: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 1000, // Amount in cents (e.g., $10.00)
      currency: 'usd',
      payment_method_data: {
        type: 'amazon_pay',
        amazon_pay:paymentToken
      },
      confirm: true,
    });

    return paymentIntent;
  }
  async processStripeWebhook(req:any) {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = "your_webhook_secret"; // Get from Stripe dashboard

    let event;
    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed", err.message);
     
    }

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("✅ Payment succeeded:", event.data.object);
        // Update order status in the database
        break;

      case "payment_intent.payment_failed":
        console.log("❌ Payment failed:", event.data.object);
        // Notify user of failure
        break;

      case "charge.refunded":
        console.log("🔄 Payment refunded:", event.data.object);
        // Handle refund logic
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

  }
}