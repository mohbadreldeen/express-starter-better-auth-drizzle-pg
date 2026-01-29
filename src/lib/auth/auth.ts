import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/src/lib/drizzle/db"; // Your drizzle db instance
import * as schema from "@/src/lib/drizzle/schema"; // Your drizzle schema definitions

export const auth = betterAuth({
    basePath: "/api/v1/auth", // Match your Express routing structure
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
});
