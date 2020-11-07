import React from 'react';
import { Auth } from '../auth/auth';
import { redirect } from './functions';

const ifAuth = <T extends object>(C: React.ComponentType<T>) => {
    return class AuthComponent extends React.Component<T> {
        static async getInitialProps(ctx) {
            try {
                if (ctx.req) {
                    const loggedIn = await Auth.verifyUser({
                        cookie: ctx.req.headers.cookie
                    });
                    console.log(loggedIn)
                    if (!loggedIn) {
                        redirect(ctx, "/login");
                    }
                    return {
                        loggedIn: loggedIn
                    }
                } else {
                    const loggedIn = await Auth.verifyUser();
                    console.log(loggedIn)
                    if (!loggedIn) {
                        redirect(ctx, "/login");
                    }
                    return {
                        loggedIn: loggedIn
                    }
                }
            } catch (err) {
                redirect(ctx, "/login");
                return {
                    loggedIn: false,
                };
            }
        }

        render() {
            return <C {...this.props} />;
        }
    }    
}

export default ifAuth;