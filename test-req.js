import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

console.log("Connecting to SMTP server:", process.env.SMTP_HOST, "Port:", process.env.SMTP_PORT);

const mailOptions = {
  from: process.env.SMTP_FROM,
  to: 'test@example.com',
  subject: 'Test email',
  html: '<p>Test</p>'
};

transporter.sendMail(mailOptions)
  .then(() => console.log('Email sent successfully! Your credentials are correct.'))
  .catch(err => {
    console.log('--- NODEMAILER ERROR ---');
    console.log(err.message);
    if (err.response) console.log('Response:', err.response);
  });
