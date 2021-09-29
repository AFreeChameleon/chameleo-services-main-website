export const getDBFromLocation = (location: string) => {
    switch (location) {
        case 'london':
            return 'postgresql://localhost/chameleo-services-auth'
    }
}

export const getDBCredentialsFromLocation = (location: string) => {
    switch (location) {
        case 'london':
            return {
                user: process.env.LONDON_DB_USER,
                password: process.env.LONDON_DB_PASSWORD,
                port: Number(process.env.LONDON_DB_PORT),
                host: process.env.LONDON_DB_HOST,
                database: process.env.LONDON_DB_NAME
            }
    }
}