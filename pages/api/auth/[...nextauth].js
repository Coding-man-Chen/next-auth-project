import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { vertifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  providers: [
    CredentialProvider({
      name: "credentials",
      authorize: async (credentials) => {
        const client = await connectToDatabase();
        const userCollection = client
          .db(process.env.MONGODB_DATABASE)
          .collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("User not found");
        }
        const isValid = await vertifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Password is not correct");
        }
        client.close();
        return {
          email: credentials.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
