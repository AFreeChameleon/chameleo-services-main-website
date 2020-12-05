import Theme from '../../Theme';

const index: any = {
    root: {

    },
    body: {
        maxWidth: '1000px',
        margin: '20px auto 0 auto'
    },
    title: {
        fontSize: '36px',
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
        margin: '20px 0'
    },
    changeListView: {
        display: 'flex',
        gridColumnGap: '5px',
        marginBottom: '10px',
    },
    changeListItem: {
        cursor: 'pointer',
        borderRadius: '4px',
        boxShadow: '0px 1px 3px rgb(0, 0, 0, 0.5)',
        color: Theme.palette.secondary.main,
        fontSize: '30px',
        '&:hover': {
            background: Theme.palette.secondary.main,
            color: '#ffffff'
        }
    },
    changeListItemSelected: {
        cursor: 'pointer',
        borderRadius: '4px',
        boxShadow: '0px 1px 2px rgb(0, 0, 0, 0.5)',
        background: Theme.palette.secondary.main,
        color: '#ffffff',
        fontSize: '30px',
    },
    createNewProject: {
        textAlign: 'center'
    },
    createNewProjectButton: {
        background: Theme.palette.secondary.main,
        boxShadow: '0px 1px 6px rgb(0, 0, 0, 0.5)',
        color: '#ffffff',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '250px',
        margin: '0 auto',
        padding: '20px 5px',
        textAlign: 'center',
        transition: '0.2s',
    },
    createNewProjectButtonTitle: {
        fontSize: '24px',
        fontWeight: '600',
        paddingBottom: '10px'
    }
}

export default index;