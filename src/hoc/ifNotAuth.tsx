import React from 'react';
import { NextPage } from 'next'
import { Auth } from '../auth/auth';
import { redirect } from './functions';

const ifNotAuth = <T extends object>(C: NextPage<T>) => {
    return class AuthComponent extends React.Component<T> {
        static async getInitialProps(ctx) {
            const childComponentProps = C.getInitialProps ? await C.getInitialProps(ctx) : {};
            try {
                if (ctx.req) {
                    const loggedIn = await Auth.verifyUser({
                        cookie: ctx.req.headers.cookie
                    });
                    console.log(loggedIn)
                    if (loggedIn) {
                        redirect(ctx, "/dashboard");
                    }
                    return {
                        loggedIn: loggedIn,
                        ...childComponentProps
                    };
                } else {
                    const loggedIn = await Auth.verifyUser();
                    console.log(loggedIn)
                    if (loggedIn) {
                        redirect(ctx, "/dashboard");
                    }
                    return {
                        loggedIn: loggedIn,
                        ...childComponentProps
                    };
                }
            } catch (err) {
                return {
                    loggedIn: false,
                    ...childComponentProps
                };
            }
        }

        render() {
            return <C {...this.props} />;
        }
    }    
}

export default ifNotAuth;