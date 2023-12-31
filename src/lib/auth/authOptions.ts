import { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? '';
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? '';
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? '';

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
};