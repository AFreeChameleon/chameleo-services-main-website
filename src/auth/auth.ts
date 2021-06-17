import ChameleoAuth from '../../node_modules/@chameleo/auth-service/lib/index';
import axios, { AxiosResponse, AxiosError } from 'axios';

console.log(process.env.MAIN_URL)
export const Auth = new ChameleoAuth({
    url: 'http://localhost:8080',
    appid: '3eee29e37f40cbe5e4cbd4e690c1a61f'
});