import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(emailBody: any) {
    const emailFormat = await this.formatEmail(emailBody.body);
    await this.sendWithNodemailer(emailFormat);
  }

  async formatEmail(req: any) {
    try {
      if (req) {
        const key = req.emailType;
        let htmlData;
        let toAddresses;
        let subjectData;
        let textData;
        let source;

        switch (key) {
          case 'Login Password':
            toAddresses = req.toAddresses;
            htmlData = `<html> 
            <body>
            <h2>Dear ${req.user}</h2>
            <p>We are delighted to welcome you.</p>
            <p>To get started, please use the password to login</p>
            <p>
              <strong style="font-weight: bold; color: #3366cc;">${req.password}</strong>
            </p>
            <p>Thank you.</p>
          </body>
          </html>`;
            textData = 'WELCOME';
            subjectData = `Your Login Password`;
            source = req.from;
            break;
        }

        const params = {
          Destination: {
            ToAddresses: toAddresses, // Replace with the recipient's email address
          },
          Message: {
            Body: {
              Html: {
                Data: htmlData,
              },
              Text: {
                Data: textData,
              },
            },
            Subject: {
              Data: subjectData,
            },
          },
          Source: source, // Replace with your sender email address
        };
        return params;
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: email.service.ts:60 ~ EmailService ~ formatEmail ~ error:',
        error,
      );
    }
  }

  private async sendWithNodemailer(params: any): Promise<void> {
    console.log(
      '🚀 ~ file: email.service.ts:69 ~ EmailService ~ sendWithNodemailer ~ params:',
      params,
    );
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'ramalondhe11@gmail.com',
          pass: 'stdv sirh uflo yvhg',
        },
      });

      await transporter.sendMail({
        from: 'ramalondhe11@gmail.com', // sender address
        to: params.Destination.ToAddresses, // list of receivers
        subject: params.Message.Subject.Data, // Subject line
        text: params.Message.Body.Text.Data, // plain text body
        html: params.Message.Body.Html.Data,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}
