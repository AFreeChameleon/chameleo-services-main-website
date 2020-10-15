import axios, { AxiosError, AxiosResponse } from 'axios';

interface RegisterParameters {
    email: string;
    password: string;
    name: string;
}

interface LoginParameters {
    email: string;
    password: string;
}

class Auth {
    _id?: string;
    name?: string;
    email?: string;

    url: string;

    constructor(url: string) {
        this.url = url;
    }

    login({ email, password }: LoginParameters) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/login`, { email: email, password: password }, { withCredentials: true })
            .then((res: AxiosResponse) => {
                resolve({
                    status: res.status,
                    message: res.data.message
                });
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    reject({
                        ...err.response.data,
                        status: err.response.status
                    })
                } else {
                    reject({
                        message: err.message
                    })
                }
            })
        })
    }

    register({ email, password, name }: RegisterParameters) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/register`, { email: email, password: password, name: name })
            .then((res: AxiosResponse) => {
                resolve({
                    status: res.status,
                    data: res.data
                })
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    reject({
                        ...err.response.data,
                        status: err.response.status
                    })
                } else {
                    reject({
                        message: err.message
                    })
                }
            })
        })
    }
    

    logout() {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/logout`, {}, { withCredentials: true })
            .then((res: AxiosResponse) => {
                resolve({
                    status: res.status,
                    message: res.data.message
                })
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    reject({
                        ...err.response.data,
                        status: err.response.status
                    })
                } else {
                    reject({
                        message: err.message
                    })
                }
            })
        })
    }

    verifyUser() {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/verify-token`, {}, { withCredentials: true })
            .then((res: AxiosResponse) => {
                resolve({
                    status: res.status,
                    message: res.data.message
                })
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    reject({
                        ...err.response.data,
                        status: err.response.status
                    })
                } else {
                    reject({
                        message: err.message
                    })
                }
            })
        })
    }

    forgotPassword(email: string, oldPassword: string, newPassword: string) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/api/forgot-password`, {
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
            .then((res: AxiosResponse) => {
                resolve({
                    status: res.status,
                    message: res.data.message
                })
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    reject({
                        ...err.response.data,
                        status: err.response.status
                    })
                } else {
                    reject({
                        message: err.message
                    })
                }
            })
        })
    }

    changeEmail(email: string, password: string) {
        return new Promise((resolve, reject)=> {
            axios.post(`${this.url}/api/change-email`, {
                email: email,
                password: password
            })
            .then((res: AxiosResponse) => {
                resolve({
                    status: res.status,
                    message: res.data.message
                })
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    reject({
                        ...err.response.data,
                        status: err.response.status
                    })
                } else {
                    reject({
                        message: err.message
                    })
                }
            })
        })
    }
}

export default Auth;