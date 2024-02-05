import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
// console.log("EmailInFunction", process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  service: "outlook",
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  port: 587,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});
