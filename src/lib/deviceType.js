'use server'

import { headers } from 'next/headers';
import MobileDetect from "mobile-detect";

const deviceType = () => {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');

    const md = new MobileDetect(userAgent);
    let deviceType;
    if (md.tablet()) {
        deviceType = "tablet";
    } else if (md.mobile()) {
        deviceType = "mobile";
    } else {
        deviceType = "desktop";
    }
}

export default deviceType;