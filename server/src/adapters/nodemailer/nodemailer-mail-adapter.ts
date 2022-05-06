import {MailAdapter, SendMailData} from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8e7e7b468728a4",
    pass: "69e8da9ebb5f0f"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Lucas Paiva <lucaspaivax6@gmail.com>',
    subject,
    html: body,
  })
  };
}