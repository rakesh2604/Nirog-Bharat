import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Nirog Sovereign Auth",
            credentials: {
                abhaId: { label: "ID", type: "text" },
                role: { label: "Role", type: "text" },
            },
            async authorize(credentials) {
                // In a real app, verify keys/signatues here. 
                // For MVP, we determine role from the ID or passed role.
                if (credentials?.abhaId) {
                    const role = credentials.role || "patient";
                    return {
                        id: credentials.abhaId,
                        name: credentials.abhaId.split('-')[1] || "User",
                        email: `${role}@nirog.bh`,
                        role: role
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
};
