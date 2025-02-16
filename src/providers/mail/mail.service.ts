import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configration } from 'src/config/configration.interface';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
@Injectable()
export class MailService {
  private config: Configration['email'];
  private readonly logger = new Logger(MailService.name);
  private transport: Mail;
  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<Configration['email']>('email');
    console.log(this.config.transport.auth);
    if (!this.config.transport) this.logger.warn('mail transport not found');
    this.transport = createTransport({
      service: 'gmail',
      auth: {
        user: this.config.transport.auth.user,
        pass: this.config.transport.auth.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  public send(mailOptions: Mail.Options): Promise<void> {
    return new Promise((resolve, reject) => {
      this.transport.sendMail(mailOptions, function (err, info) {
        if (err) throw new BadRequestException(err);
         resolve()
      });
    });
  }
}
