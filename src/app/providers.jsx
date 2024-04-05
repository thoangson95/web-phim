"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}

export function SessionProviders({ children }) {
    return (
        <SessionProvider refetchOnWindowFocus={true}>
            {children}
        </SessionProvider>
    );
}

export function UserProviders({ children }) {
    const [open, setOpen] = useState(false);
    const [modalBuyVip, setModalBuyVip] = useState(false);
    const [showSignInSMS, setShowSignInSMS] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignInEmail, setShowSignInEmail] = useState(false);
    const [showSignInSMSPassword, setShowSignInSMSPassword] = useState(false);

    return (
        <UserContext.Provider
            value={{
                open,
                setOpen,
                modalBuyVip,
                setModalBuyVip,
                showSignInSMS,
                setShowSignInSMS,
                showSignUp,
                setShowSignUp,
                showSignInEmail,
                setShowSignInEmail,
                showSignInSMSPassword,
                setShowSignInSMSPassword,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
