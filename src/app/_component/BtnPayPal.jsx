"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const BtnPayPal = ({ packetVip }) => {
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID,
            }}
        >
            <PayPalButtons
                style={{
                    layout: "horizontal",
                    color: "blue",
                    label: "checkout",
                    tagline: "false",
                    shape: "rect",
                }}
                createOrder={async () => {
                    const res = await fetch("/api/checkout", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            data: {
                                idUser: user?.idUser,
                                ...packetVip,
                            },
                        }),
                    });
                    const order = await res.json();
                    console.log(order);
                    return order?.id;
                }}
                onCancel={(data) => {
                    console.log("Đã hủy: ", data);
                }}
                onApprove={(data, actions) => {
                    console.log(actions.order.capture());
                    return actions.order.capture();
                }}
            />
        </PayPalScriptProvider>
    );
};

export default BtnPayPal;
