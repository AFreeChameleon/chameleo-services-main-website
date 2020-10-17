import Theme from '../../Theme';

const newProjectStyles: any = {
    container: {
        height: 'calc(100% - 60px)',
        display: 'grid',
        placeItems: 'center'
    },
    newProjectContainer: {
        width: '400px',
        boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.2)',
        borderRadius: '5px',
        padding: '20px 10px'
    },
    newProjectHeader: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600',
        color: Theme.palette.secondary.main,
        borderBottom: '1px solid #888888',
        margin: '0 auto',
        width: '200px',
        paddingBottom: '10px'
    },
    newProjectItem: {
        marginTop: '20px'
    },
    newProjectItemTitle: {
        fontSize: '12px',
        color: '#888888',
        paddingBottom: '5px'
    },
    newProjectItemInput: {
        // width: '100%',
        // padding: '8px 5px',
        // border: '1px solid #888888',
        // borderRadius: '3px'
    }
}

export default newProjectStyles