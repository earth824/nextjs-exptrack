import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} }
      // async authorize(credentials) {}
    })
  ],
  callbacks: {
    // jwt({ token, user }) {
    //   return token;
    // },
    // session({ token, session }) {
    //   return session;
    // }
  }
};
