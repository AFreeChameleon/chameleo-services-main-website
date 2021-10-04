import { Client, Pool } from 'pg';

export const getConnection = (location: string) => new Promise((resolve, reject) => {
    switch(location) {
        case 'london':
            if (!global.londonPGClient) {
                global.londonPGClient = new Client({
                    user: process.env.LONDON_DB_USER,
                    password: process.env.LONDON_DB_PASSWORD,
                    port: Number(process.env.LONDON_DB_PORT),
                    host: process.env.LONDON_DB_HOST,
                    database: process.env.LONDON_DB_NAME
                });

                global.londonPGClient.connect()
                .then(() => {
                    console.log('London DB connected.');
                    resolve(global.londonPGClient);
                })
                .catch((err) => {
                    console.log('Error while connecting to London DB: ', err)
                });
            }
            resolve(global.londonPGClient);
        default:
            reject('Cannot find location.');
    }
});