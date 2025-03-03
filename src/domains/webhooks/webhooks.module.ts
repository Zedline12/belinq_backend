import { Module } from "@nestjs/common";
import { WebhookController } from "./webhooks.service";
import { PaymentService } from "../payments/payments.service";

@Module({
    imports:[PaymentService],
    controllers: [WebhookController]
})
export class WebhooksModule {
 
}