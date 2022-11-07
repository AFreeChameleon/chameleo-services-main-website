import ChameleoAuth from '@chameleo/auth-service/lib/index';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const Auth = new ChameleoAuth('http://localhost:8080');