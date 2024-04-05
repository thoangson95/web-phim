"use server";

import nodemailer from "nodemailer";

export const sendEmail = async ({ to, name, subject, html }) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
            pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
        },
    });

    try {
        const testResult = await transport.verify();
    } catch (error) {
        console.log(error);
    }

    try {
        const sendResult = await transport.sendMail({
            from: process.env.NEXT_PUBLIC_SMTP_EMAIL,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.log(error);
    }
};
