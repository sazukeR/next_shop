
import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import bcryptjs from 'bcryptjs';
 




export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    callbacks: {
        jwt({token, user}) {
            //console.log({token, user});

            if ( user ) {
                token.data = user;
            };

            return token;
        },
        session({session, token, user}) {
           // console.log({session, token, user});

            session.user = token.data as any;

            return session;
        },
    },
    providers: [

        credentials({
            async authorize(credentials) {
              const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);


                if ( !parsedCredentials.success ) return null;

                const { email, password } = parsedCredentials.data;

               

                // buscar correo

                const user = await prisma?.user.findUnique({ where: { email: email.toLocaleLowerCase() } });

                if (!user) return null;

                // comparar contrasenas

                if (!bcryptjs.compareSync( password, user.password )) return null;

                // regresar el usuario

                const { password: _, ...rest } = user;

                // console.log({ rest });

                return rest;
            },
          }),


    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);