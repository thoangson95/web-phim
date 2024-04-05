"use client";

import { Alert } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ActivationComponent = ({ message, user }) => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const hanldeLogin = async (e) => {
            const signin = await signIn("credentials", {
                redirect: false,
                email: user?.email,
                password: user?.password,
                isActivation: true,
            });
            !signin?.error && router.refresh();
        };

        if (countdown === 0) {
            clearInterval(interval);
            router.replace("/");
            hanldeLogin();
        }

        return () => clearInterval(interval);
    }, [countdown, router, user]);

    return (
        <Alert
            message="Thông báo"
            showIcon
            description={`${message}. Sẽ quay lại trang chủ sau ${countdown}s`}
            type="success"
        />
    );
};

export default ActivationComponent;
