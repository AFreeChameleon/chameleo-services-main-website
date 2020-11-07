import Theme from './Theme';

const formStyles: any = {
    root: {
        width: '100%',
        height: '100vh',
        display: 'grid',
        placeItems: 'center'
    },
    form: {
        paddingTop: '15px'
    },
    innerCard: {
        width: '450px',
        padding: '0 30px 10px 30px',
    },
    innerCardTitle: {
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
        paddingBottom: '10px'
    },
    innerCardSubTitle: {
        textAlign: 'center',
        fontSize: '14px',
    },
    innerCardForm: {
        width: '100%',
        marginTop: '20px'
    },
    innerCardInput: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    innerCardButton: {
        marginTop: '20px'
    },
    innerCardRedirectLinkContainer: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
    },
    innerCardRedirectLinkHalf: {
        width: 'calc(50% - 20px)',
        fontSize: '14px',
        color: Theme.palette.secondary.main,
        '&:first-child': {
            textAlign: 'right',
        },
        '&:last-child': {
            textAlign: 'left',
        }
    },
    innerCardRedirectLink: {
        fontSize: '14px',
        color: Theme.palette.secondary.main,
        '&:first-child': {
            textAlign: 'right',
        },
        '&:last-child': {
            textAlign: 'left',
        }
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
        textDecoration: 'underline',
        cursor: 'pointer'
    }
}

export default formStyles;