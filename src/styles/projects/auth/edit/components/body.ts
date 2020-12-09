const styles: any = (theme) => ({
    root: {
        width: '1100px',
        margin: '0 auto'
    },
    container: {
        marginTop: '30px'
    },
    title: {
    },
    modelTable: {
        marginTop: '20px'
    },
    modelHeaders: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '26% 7% 7% 15% 15% 11% 11% 8%',
        width: '100%',
        padding: '10px 0',
        boxShadow: '0px 1px 6px rgb(0, 0, 0, 0.3)',
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        zIndex: '50',
        height: '50px'
    },
    modelHeader: {
        padding: '0 5px',
    },
    modelRow: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '26% 7% 7% 15% 15% 11% 11% 8%',
        width: '100%',  
        borderBottom: '1px solid #888888',
        height: '55px'
    },
    modelColumn: {
        padding: '10px 5px',
    },
    modelInputColumn: {
        padding: '0px 5px',
    },
    center: {
        textAlign: 'center'
    },
    input: {
        border: 'none',
        outline: 'none',
        height: '52px',
        paddingLeft: '8px',
        width: '100%',
        fontSize: '14px'
    }
});

export default styles;