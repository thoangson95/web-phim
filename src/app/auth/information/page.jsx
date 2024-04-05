import { auth } from "@/auth";
import NotFound from "@/app/not-found";
import ProfileLeftComponent from "@/app/_component/ProfileLeftComponent";
import ProfileRightComponent from "@/app/_component/ProfileRightComponent";

const PagesInformation = async () => {
    const sesition = await auth();

    return sesition?.user ? (
        <main className="container mx-auto mt-9">
            <div className="grid lg:grid-cols-[270px_minmax(0,_1fr)] grid-cols-1 gap-6 mt-4">
                <ProfileLeftComponent user={sesition.user} />
                <ProfileRightComponent user={sesition.user} />
            </div>
        </main>
    ) : (
        <NotFound />
    );
};

export default PagesInformation;
