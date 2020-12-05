const styles: any = theme => ({
    root: {
        height: 'calc(100vh - 60px)'
    },
    body: {
        display: 'flex',
        height: '100%'
    },
    sidebarContainer: {
        width: '200px',
        height: '100%',
        boxShadow: '6px 0 6px rgb(0, 0, 0, 0.2)',
        background: theme.palette.background.dark
    },
    bodyContent: {
        width: '100%'
    }
})

export default styles;