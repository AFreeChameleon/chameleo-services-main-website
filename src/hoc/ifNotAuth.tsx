import React from 'react';
import axios from 'axios';
import { NextPage } from 'next'
import { Auth } from '../auth/auth';
import { redirect } from './functions';

const ifNotAuth = <T extends object>(C: NextPage<T>) => {
    return class AuthComponent extends React.Component<T> {
        static async getInitialProps(ctx) {
            const childComponentProps = C.getInitialProps ? await C.getInitialProps(ctx) : {};
            try {
                if (ctx.req) {
                    // const loggedIn = await Auth.verifyUser({
                    //     cookie: ctx.req.headers.cookie
                    // });
                    const res = await axios.post('http://localhost:8080/api/verify-user', {}, 
                    { withCredentials: true, headers: { Cookie: ctx.req.headers.cookie } })
                    if (res.status !== 200) {
                        redirect(ctx, "/dashboard");
                    }
                    return {
                        loggedIn: true,
                        ...childComponentProps
                    };
                } else {
                    // const loggedIn = await Auth.verifyUser();
                    const res = await axios.post('http://localhost:8080/api/verify-user', {}, 
                    { withCredentials: true })
                    if (res.status !== 200) {
                        redirect(ctx, "/dashboard");
                    }
                    return {
                        loggedIn: true,
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