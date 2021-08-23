import React from 'react';
import axios from 'axios';
import { NextPage } from 'next'
import { Auth } from '../auth/auth';
import { redirect } from './functions';

const ifAuth = <T extends object>(C: NextPage<T>) => {
    return class AuthComponent extends React.Component<T> {
        static async getInitialProps(ctx) {
            const childComponentProps = C.getInitialProps ? await C.getInitialProps(ctx) : {};
            try {
                if (ctx.req) {
                    const res = await axios.post('/api/user/logged-in', {}, 
                        { withCredentials: true, headers: { Cookie: ctx.req.headers.cookie } });
                    console.log(res.data);
                    if (res.status !== 200) {
                        redirect(ctx, "/login");
                    }
                    return {
                        loggedIn: true,
                        ...childComponentProps
                    }
                } else {
                    const res = await axios.post('/api/user/logged-in', {}, 
                    { withCredentials: true })
                    console.log(res.data);
                    if (res.status !== 200) {
                        redirect(ctx, "/login");
                    }
                    return {
                        loggedIn: true,
                        ...childComponentProps
                    }
                }
            } catch (err) {
                console.log(err.message)
                redirect(ctx, "/login");
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

export default ifAuth;