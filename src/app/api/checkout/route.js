import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID;
const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_SECRET;

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(enviroment);

export async function POST(rq) {
    const request = new paypal.orders.OrdersCreateRequest();
    const { data } = await rq.json();
    const exchangeRateUSDToVND = await fetch(
        `https://open.exchangerate-api.com/v6/latest/USD`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY}`,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return data?.rates?.VND;
        })
        .catch((error) => console.error("Error:", error));

    const usdAmount = (data?.price / exchangeRateUSDToVND)?.toFixed(2);

    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                custom_id: data?.idUser,
                reference_id: data?.idPacket,
                amount: {
                    currency_code: "USD",
                    value: usdAmount,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: usdAmount,
                        },
                    },
                },
                items: [
                    {
                        name: data?.name,
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: usdAmount,
                        },
                    },
                ],
            },
        ],
    });

    const reponse = await client.execute(request);

    return NextResponse.json({
        id: reponse?.result?.id,
        ...data,
    });
}
