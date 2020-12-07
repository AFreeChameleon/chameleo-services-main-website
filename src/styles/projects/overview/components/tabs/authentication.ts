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
    content: {
        marginLeft: '30px',
        marginTop: '20px',
        width: '1000px'
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
        marginTop: '30px'
    },
    subTitle: {
        textAlign: 'center',
    },
    userTable: {
        width: '100%',
        marginTop: '20px'
    },
    userTableHeaderRow: {
        borderBottom: '1px solid #9e9e9e',
    },
    userTableHeaderRowInner: {
        display: 'grid',
        gridTemplateColumns: '10% 40% 25% 25%',
        padding: '10px'
    },
    userTableHeader: {
        fontWeight: '600',
    },
    userTableRow: {
        borderBottom: '1px solid #9e9e9e',
    },
    userTableRowInner: {
        display: 'grid',
        gridTemplateColumns: '10% 40% 25% 25%',
        padding: '10px'
    },
    userTableColumn: {
    }
});

export default styles;