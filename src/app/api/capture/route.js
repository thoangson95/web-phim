import { fetchUserById, updateVipUser } from "@/app/actions";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID;
const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_SECRET;

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(enviroment);

export async function POST(rq) {
    let timestampVip, rsUser;
    const { orderID, idUser, packet } = await rq.json();
    const user = await fetchUserById(idUser);
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const reponse = await client.execute(request);
    const result = reponse?.result;
    const reference_id = result?.purchase_units[0]?.reference_id;

    if (packet && packet.idPacket == reference_id) {
        // Lấy thời gian hiện tại
        const currentTime = new Date();
        const currentTimeTimeStamp = Math.floor(currentTime.getTime() / 1000);

        if (user?.vip && user?.vip >= currentTimeTimeStamp) {
            timestampVip = user?.vip + packet?.expires * 30 * 24 * 60 * 60;
        } else {
            currentTime.setMonth(currentTime.getMonth() + packet?.expires);

            // Chuyển đổi thành dạng strtotime
            timestampVip = Math.floor(currentTime.getTime() / 1000);
        }

        rsUser = await updateVipUser({ id: idUser, time: timestampVip });
    }

    if (!rsUser?.success) {
        return NextResponse.json(
            { error: "Nâng cấp vip thất bại" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { success: true, timestampVip: timestampVip },
        { status: 200 }
    );
}
