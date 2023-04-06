import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailSenderService {

  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(sgTransport({
      auth: {
        api_key: 'YOUR_API_KEY'
      }
    }))
  }

  async sendEmail(email: string, subject: string, message: string) {
    const mailOptions = {
      from: 'viniciusdsv93@gmail.com',
      to: 'viniciusdsv93@gmail.com',
      subject,
      text: message
    }

    await this.transporter.sendMail(mailOptions);
  }
}
