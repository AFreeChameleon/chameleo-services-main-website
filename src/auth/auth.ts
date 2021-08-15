import ChameleoAuth from '../../node_modules/@chameleo/auth-service/lib/index';
import axios, { AxiosResponse, AxiosError } from 'axios';

console.log(process.env.MAIN_URL)
export const Auth = new ChameleoAuth('http://localhost:8080');