import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongodb"

const authOptions = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GIT_CLIENTID as string,
            clientSecret: process.env.GIT_CLIENTSECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID as string,
            clientSecret: process.env.GOOGLE_CLIENTSECRET as string
          })
        // ...add more providers here
    ],
    adapter: MongoDBAdapter(clientPromise),

    secret: process.env.SECRET,
    jwt: {
        secret: process.env.SECRET
    },

    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub || '';
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt'
    }
})

export default authOptions;