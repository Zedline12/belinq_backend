import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import Stripe from "stripe";
import { PaymentService } from "../payments/payments.service";

@Controller("webhooks")
export class WebhookController {
    constructor(private paymentService:PaymentService) {
       
   }
  @Post("stripe")
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    await this.paymentService.processStripeWebhook(req);
  }
}
