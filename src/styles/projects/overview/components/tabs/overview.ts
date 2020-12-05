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
        marginTop: '20px'
    },
    dropdownContainer: {
        width: '800px'
    },
    dropdownTitle: {
        textDecoration: 'none',
        listStyle: 'none',
        color: theme.palette.secondary.main,
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
        alignContent: 'center',
        height: '40px',
        fontWeight: '600',
        cursor: 'pointer',
        '&:hover': {
            background: 'rgb(0, 0, 0, 0.02)'
        }
    },
    analyticsGrid: {
        display: 'grid',
        gridTemplateAreas: `
            'doughnutChart doughnutChart activeUsers activeUsers'
            'doughnutChart doughnutChart avgTimeLoggedIn avgTimeLoggedIn'
            'doughnutChart doughnutChart footer footer'
        `,
        height: '30vh',
        marginTop: '20px'
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
    footerContainer: {
        gridArea: 'footer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerText: {
        color: theme.palette.secondary.main,
        textDecoration: 'underline',
        cursor: 'pointer'
    }
});

export default styles;