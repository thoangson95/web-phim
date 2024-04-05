import ActivationComponent from "@/app/_component/ActivationComponent";
import { activationUser, fetchUserById } from "@/app/actions";
import NotFound from "@/app/not-found";
import { Alert } from "antd";
import jwt from "jsonwebtoken";

const AcitvationPage = async ({ params }) => {
    const { slug } = params;

    try {
        const decoded = jwt.verify(slug, "access_token");
        if (decoded?.exp < Math.floor(Date.now() / 1000)) {
            return (
                <Alert
                    message="Thông báo"
                    showIcon
                    description="Đường dẫn kích hoạt đã hết hạn"
                    type="error"
                />
            );
        }
        if (decoded?.id) {
            const user = await fetchUserById(decoded?.id);
            if (user) {
                if (!user?.status.includes("hienthi")) {
                    const result = await activationUser({ id: decoded.id });
                    return (
                        result?.success && (
                            <main className="container mx-auto mt-9">
                                <ActivationComponent
                                    message={result.message}
                                    user={user}
                                />
                            </main>
                        )
                    );
                }
            }
            return (
                <main className="container mx-auto mt-9">
                    <NotFound />
                </main>
            );
        }
        return !slug && <NotFound />;
    } catch (err) {
        return (
            <main className="container mx-auto mt-9">
                <NotFound />
            </main>
        );
    }
};

export default AcitvationPage;
