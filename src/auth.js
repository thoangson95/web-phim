import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvier from "next-auth/providers/credentials";
import { createNewUser, fetchUserByEmail, fetchUserById } from "./app/actions";
import bcrypt from "bcrypt";

export const login = async (email, password, isActivation = false) => {
    const user = await fetchUserByEmail(email);
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (user) {
        if (isActivation) {
            if (user.password === password) {
                user.password = "";
                return user;
            }
        } else {
            if (passwordMatches) {
                if (!user?.status.includes("hienthi")) {
                    return {
                        error: true,
                        message: "Tài khoản chưa được kích hoạt",
                    };
                }
                user.password = "";
                return user;
            }
        }
    } else
        throw new Error(
            JSON.stringify("Tài khoản hoặc mật khẩu không chính xác")
        );
};

const credentialsConfig = CredentialsProvier({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        try {
            const user = await login(
                credentials.email,
                credentials.password,
                credentials?.isActivation
            );
            if (user?.error) {
                return user.message;
            }
            return user;
        } catch (e) {
            return null;
        }
    },
});

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        credentialsConfig,
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    pages: {
        signIn: "/dang-nhap",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) {
            const existingUser = await fetchUserByEmail(user.email);
            if (!existingUser) {
                const newUser = {
                    id_social: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.image,
                    status: "hienthi",
                    type: "google",
                };
                await createNewUser(newUser);
            }
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.avatar = token.avatar;
                session.user.phone = token.phone;
                session.user.address = token.address;
                session.user.birthday = token.birthday;
                session.user.gender = token.gender;
                session.user.type = token.type;
                session.user.idUser = token.idUser;
                session.user.vip = token.vip;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await fetchUserByEmail(token.email);
            if (!existingUser) return token;
            token.idUser = existingUser.id;
            token.avatar = existingUser.avatar;
            token.phone = existingUser.phone;
            token.address = existingUser.address;
            token.birthday = existingUser.birthday;
            token.gender = existingUser.gender;
            token.type = existingUser.type;
            token.vip = existingUser.vip;
            return token;
        },
    },
});
