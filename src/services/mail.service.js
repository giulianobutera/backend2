const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async sendMail(to, subject, html) {
        try {
            const mailOptions = {
                from: process.env.MAIL_USERNAME,
                to,
                subject,
                html
            };
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports = new MailService();
