import Theme from '../../../Theme';

const styles: any = {
    appList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 25%)',
        gridColumnGap: '10px'
    },
    rowList: {
        boxShadow: '0px 1px 6px rgb(0, 0, 0, 0.5)',
    },
    appItem: {
        borderRadius: '4px',
        padding: '18px 20px 20px 20px',
        cursor: 'pointer',
        boxShadow: '0px 1px 6px rgb(0, 0, 0, 0.5)',
        transition: 'background 0.2s',
        '&:hover': {
            background: Theme.palette.secondary.main,
        },
        '&:hover div': {
            color: '#ffffff !important',
        }
    },
    rowItem: {
        padding: '15px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '60% auto auto auto',
        alignContent: 'center',
        '&:hover': {
            background: Theme.palette.secondary.main,
        },
        '&:hover div': {
            color: '#ffffff !important',
        },
    },
    appItemTitle: {
        fontSize: '18px',
        fontWeight: '600',
        paddingBottom: '5px',
        color: Theme.palette.secondary.main,
    },
    rowItemTitle: {
        fontSize: '16px',
        fontWeight: '600',
    },
    appItemSubTitle: {
        paddingBottom: '2px'
    },
    rowItemSubTitle: {
        alignSelf: 'center',
        textAlign: 'right'
    }
}

export default styles