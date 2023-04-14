import express from "express";
import nodemailer from "nodemailer";

export async function sendEmail(options: any) {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: "ThanhJob 👻 <thanhjobb@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
}
