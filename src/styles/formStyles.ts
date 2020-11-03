import Theme from './Theme';

const formStyles: any = {
    root: {
        width: '100%',
        height: '100vh',
        display: 'grid',
        placeItems: 'center'
    },
    innerCard: {
        width: '400px',
        padding: '0 30px 10px 30px',
    },
    innerCardTitle: {
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
        paddingBottom: '10px'
    },
    innerCardForm: {
        width: '100%',
        marginTop: '20px'
    },
    innerCardInput: {
        textAlign: 'center',
        marginTop: '10px'
    },
    innerCardButton: {
        marginTop: '30px'
    },
    innerCardRedirectLinkContainer: {
        marginTop: '8px'
    },
    innerCardRedirectLink: {
        fontSize: '14px',
        color: Theme.palette.secondary.main
    },
    resendEmailContainer: {
        paddingTop: '5px',
        textAlign: 'center'
    },
    resendEmailTitle: {
        fontSize: '11px',
        color: 'rgb(0, 0, 0, 0.5)'
    },
    resendEmailLink: {
        color: Theme.palette.secondary.main,
        textDecoration: 'underline'
    }
}

export default formStyles;