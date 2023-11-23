export declare class EmailService {
    sendEmail(emailBody: any): Promise<void>;
    formatEmail(req: any): Promise<{
        Destination: {
            ToAddresses: any;
        };
        Message: {
            Body: {
                Html: {
                    Data: any;
                };
                Text: {
                    Data: any;
                };
            };
            Subject: {
                Data: any;
            };
        };
        Source: any;
    }>;
    private sendWithNodemailer;
}
