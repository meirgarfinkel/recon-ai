import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// Create and export getServerSession
const getServerSession = () => {
  return NextAuth(authConfig).auth();
};

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut, getServerSession };
