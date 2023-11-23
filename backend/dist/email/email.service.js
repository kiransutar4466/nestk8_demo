"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = class EmailService {
    async sendEmail(emailBody) {
        const emailFormat = await this.formatEmail(emailBody.body);
        await this.sendWithNodemailer(emailFormat);
    }
    async formatEmail(req) {
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
                        ToAddresses: toAddresses,
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
                    Source: source,
                };
                return params;
            }
        }
        catch (error) {
            console.log('🚀 ~ file: email.service.ts:60 ~ EmailService ~ formatEmail ~ error:', error);
        }
    }
    async sendWithNodemailer(params) {
        console.log('🚀 ~ file: email.service.ts:69 ~ EmailService ~ sendWithNodemailer ~ params:', params);
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
                from: 'ramalondhe11@gmail.com',
                to: params.Destination.ToAddresses,
                subject: params.Message.Subject.Data,
                text: params.Message.Body.Text.Data,
                html: params.Message.Body.Html.Data,
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Error sending email');
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map