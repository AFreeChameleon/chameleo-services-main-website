import React from 'react';
import { Auth } from '../auth/auth';
import { redirect } from './functions';

const ifNotAuth = <T extends object>(C: React.ComponentType<T>) => {
    return class AuthComponent extends React.Component<T> {
        static async getInitialProps(ctx) {
            try {
                if (ctx.req) {
                    const loggedIn = await Auth.verifyUser({
                        cookie: ctx.req.headers.cookie
                    });
                    console.log(loggedIn)
                    if (loggedIn) {
                        redirect(ctx, "/create-new-project");
                    }
                    return {
                        loggedIn: loggedIn,
                    };
                } else {
                    const loggedIn = await Auth.verifyUser();
                    console.log(loggedIn)
                    if (loggedIn) {
                        redirect(ctx, "/create-new-project");
                    }
                    return {
                        loggedIn: loggedIn,
                    };
                }
            } catch (err) {
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

export default ifNotAuth;