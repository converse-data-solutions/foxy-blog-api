import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.verify();
  await transporter.sendMail({
    from: `"Blog App" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
