import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
    const accountSid = "AC83301f72eda1d3fc2ddb5be3c51db5f0";
    const authToken = "664ddc39a68fad1c06f06e06eb35297c";
    const verifySid = "VA422928198a175f51fe2ec582f15efddd";
    const client = require("twilio")(accountSid, authToken);

    const { phone } = await request.json();

    const result = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: "+84907816424", channel: "sms" })
        .then((verification) => console.log(verification.status))
        .then(() => {
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            readline.question("Please enter the OTP:", (otpCode) => {
                client.verify.v2
                    .services(verifySid)
                    .verificationChecks.create({
                        to: "+84907816424",
                        code: otpCode,
                    })
                    .then((verification_check) =>
                        console.log(verification_check.status)
                    )
                    .then(() => readline.close());
            });
        });

    return NextResponse.json({ message: "success" }, { status: 200 });
}
