import crypto from "crypto";
import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../../../config/config.service.js";



export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};




export const sendEmail = async ({ to, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${EMAIL}>`,
    to,
    subject,
    message,
  });
};
