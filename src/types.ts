export type Error = {
    id: number,
    message: string
}

export type TableData = {
    name: string,
    unique: boolean,
    required: boolean,
    default: string,
    type: string,
    max: number,
    min: number
}

export type AuthSettings = {
    userSignUp: number,
    appSecret: string,
    sessionExpiresIn: {
        forever: boolean,
        days: number,
        minutes: number
    }
}

export type PassConfig = {
    upperCase: boolean,
    lowerCase: boolean,
    requireNumbers: boolean,
    requireSpecialChars: boolean,
}

export type OAuth = {
    google: {
        clientID: string,
        clientSecret: string,
        redirectURI: string
    }
}