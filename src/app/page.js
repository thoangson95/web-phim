import Section1 from "./_component/Section1";
import { headers } from "next/headers";
import MobileDetect from "mobile-detect";
import { fetchMoviesVip } from "./actions";
import Section2 from "./_component/Section2";

export default async function Home() {
    const headersList = headers();
    const userAgent = headersList.get("user-agent");
    const md = new MobileDetect(userAgent);
    let deviceType;
    if (md.tablet()) {
        deviceType = "tablet";
    } else if (md.mobile()) {
        deviceType = "mobile";
    } else {
        deviceType = "desktop";
    }

    const moviesVip = await fetchMoviesVip();

    return (
        <main>
            <div className="container mx-auto">
                <Section1 movies={moviesVip || []} />
                <Section2 />
            </div>
        </main>
    );
}
