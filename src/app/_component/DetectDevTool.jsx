"use client"

import devTools from "devtools-detect";
import { useEffect } from "react";

const DetectDevTool = () => {
    if (devTools.isOpen) {
        window.location.href = "https://google.com";
    }

    useEffect(() => {
        const handleDevToolsChange = event => {
            if (event.detail.isOpen) {
                window.location.href = "https://google.com";
            }
        };

        window.addEventListener('devtoolschange', handleDevToolsChange);

        return () => {
            window.removeEventListener('devtoolschange', handleDevToolsChange);
        };
    }, []);

    return (
        <></>
    )
}

export default DetectDevTool