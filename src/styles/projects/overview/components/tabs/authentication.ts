const styles: any = theme => ({
    body: {
        width: '100%',
        height: '100%',
        padding: '20px 30px 0 30px'
    },
    title: {},
    titleDivider: {
        borderTop: `1px solid ${theme.palette.grey[500]}`
    },
    analyticsGrid: {
        display: 'grid',
        gridTemplateAreas: `
            'doughnutChart activeUsers'
            'doughnutChart avgTimeLoggedIn'
        `,
        marginTop: '20px',
    },
    doughnutChartContainer: {
        gridArea: 'doughnutChart',
    },
    activeUsersContainer: {
        gridArea: 'activeUsers',
        display: 'flex',
        gridColumnGap: '10px',
        alignItems: 'center',
        padding: '30px 0',
    },
    avgTimeLoggedInContainer: {
        gridArea: 'avgTimeLoggedIn',
        display: 'flex',
        alignItems: 'center',
        padding: '30px 0',
    },
    editAuthConfig: {
        textAlign: 'center',
        marginTop: '30px'
    },
    userContainer: {
        marginTop: '10px'
    },
    subTitle: {
        // textAlign: 'center',
    },
    userTable: {
        width: '100%',
        marginTop: '20px'
    },
    userTableHeaderRow: {
        background: theme.palette.secondary.main,
        borderRadius: '4px',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 6px 0px',
        height: '50px',
        padding: '10px 10px',
        display: 'grid',
        gridTemplateColumns: '10% 40% 25% 25%',
        alignItems: 'center'
    },
    userTableHeader: {
        fontWeight: '600',
        color: theme.palette.secondary.contrastText
    },
    userTableRow: {
        borderBottom: '1px solid #9e9e9e',
        display: 'grid',
        gridTemplateColumns: '10% 40% 25% 25%',
        padding: '10px',
        height: '50px',
        alignItems: 'center'
    },
    userTableRowInner: {

    },
    userTableColumn: {
    },
    statusContainer: {
        display: 'flex',
        alignContent: 'center',
        gridColumnGap: '20px',
        paddingLeft: '10px'
    },
    statusText: {
        alignSelf: 'center',
        fontWeight: '600'
    },
    statusStopped: {
        color: 'red'
    },
    statusStarted: {
        color: theme.palette.secondary.main
    },
    statusIconButton: {
        // border: `1px solid ${theme.palette.secondary.main}`
    },
    statusIconStopButton: {
        border: '1px solid red'
    },
    modal: {
        display: 'flex',
        placeItems: 'center'
    },
    modalBody: {
        width: '400px',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        outline: 'none',
        padding: '10px 20px 15px 20px'
    },
    modalTitle: {
        // fontWeight: 600
    },
    authMissingContainer: {
        paddingTop: '10px'
    },
    authMissingTitle: {
        color: theme.palette.grey['600'],
        paddingBottom: '10px'
    }
});

export default styles;