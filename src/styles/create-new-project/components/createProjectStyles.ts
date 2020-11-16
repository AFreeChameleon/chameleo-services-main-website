import Theme from "../../Theme";

const createProjectStyles: any = {
    root: {
        margin: '30px auto 30px auto',
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
    subTitleLink: {
        marginBottom: '20px',
        textAlign: 'center',
        color: Theme.palette.secondary.main,
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    button: {
        width: '350px',
        margin: '0 auto',
    },
    table: {
        display: 'grid',
        gridTemplateRows: 'auto',
        marginBottom: '20px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '25% 8% 8% 16% 16% 11% 11%',
        gridColumnGap: '10px',
        borderBottom: '1px solid #888888'
    },
    headers: {
        border: 'none',
        color: 'rgb(0, 0, 0, 0.6)', 
    },
    column: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    left: {
        textAlign: 'left'
    },
    list: {
        listStyle: 'none',
        paddingLeft: '20px',
        width: 'fit-content',
        textAlign: 'left',
        margin: '0 auto 20px auto'
    },
    listItem: {
        textDecoration: 'none',
        listStyle: 'none',
        fontSize: '1rem',
        '& label': {
            userSelect: 'none'
        }
    },
    listRow: {
        textDecoration: 'none',
        listStyle: 'none',
        fontSize: '1rem',
        '& label': {
            userSelect: 'none'
        },
        paddingBottom: '10px'
    },
    listItemHeader: {
        textDecoration: 'none',
        listStyle: 'none',
        color: Theme.palette.secondary.main,
        borderBottom: `2px solid ${Theme.palette.secondary.main}`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 15px',
        alignContent: 'center',
        height: '40px',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    listItemHeaderText: {
        textAlign: 'center',
        alignSelf: 'center',
        userSelect: 'none'
    },
}

export default createProjectStyles;