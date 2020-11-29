import Theme from '../../../../Theme';

const mailConfigStyles: any = {
    root: {
        margin: '30px auto 0 auto',
    },
    title: {
        fontSize: '36px',
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    subTitle: {
        marginBottom: '20px',
        textAlign: 'center',
        color: 'rgb(0, 0, 0, 0.6)',
    },
    table: {
        display: 'grid',
        gridTemplateRows: 'auto',
        // padding: '0 20px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '25% 7% 7% 14% 14% 10% 10% 8%',
        gridColumnGap: '10px',
        borderBottom: '1px solid #888888'
    },
    headers: {
        border: 'none'
    },
    column: {
        textAlign: 'center',
    },
    left: {
        textAlign: 'left'
    },
    input: {
        width: '100%',
        height: '100%',
        border: 'none',
        '&:focus': {
            outline: 'none'
        },
        '&[type="number"]': {
            MozAppearance: 'textfield',
            textAlign: 'center'
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none'
        },
    },
    select: {
        width: '100%',
        height: '100%',
        border: 'none',
        '&:focus': {
            outline: 'none'
        },
    },
    addRow: {
        marginTop: '20px',
        textAlign: 'center'
    },
    list: {
        listStyle: 'none',
        '& li': {
            marginBottom: '10px'
        },
        width: '400px',
        margin: '0 auto'
    },
    listItem: {
        textDecoration: 'none',
        listStyle: 'none',
        '& label': {
            userSelect: 'none'
        }
    },
    listItemRow: {
        textDecoration: 'none',
        listStyle: 'none',
        '& label': {
            userSelect: 'none'
        },
        display: 'grid',
        gridColumnGap: '30px',
        gridTemplateColumns: 'auto auto',
        fontSize: '16px',
    },
    listItemRowFull: {
        textDecoration: 'none',
        listStyle: 'none',
        '& label': {
            userSelect: 'none'
        },
        fontSize: '16px',
        width: '350px'
    },
    listItemColumn: {
        
    },
    listItemColumnFull: {
        marginTop: '10px',
        width: '100%'
    },
    listItemColumnRight: {
        textAlign: 'right'
    },
    listItemHeader: {
        textAlign: 'center',
        fontSize: '1.1rem',
        fontWeight: '600',
        padding: '10px 0 8px 0'
    },
}

export default mailConfigStyles;