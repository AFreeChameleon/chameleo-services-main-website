import Theme from '../../Theme';
import { createMuiTheme, Theme as ThemeType } from '@material-ui/core/styles';

const oauthSettingsStyles: any = {
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
    list: {
        listStyle: 'none',
        paddingLeft: '20px',
        '& li': {
            marginBottom: '10px'
        },
        width: 'fit-content',
        margin: '0 auto'
    },
    listItem: {
        textDecoration: 'none',
        listStyle: 'none',
        width: '100%',
        gridTemplateColumns: '75% 25%',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: '0.875rem',
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
        '&:hover': {
            background: 'rgb(0, 0, 0, 0.02)'
        }
    },
    listItemHeaderText: {
        textAlign: 'center',
        alignSelf: 'center',
        userSelect: 'none'
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
    listItemCollapse: {
        padding: '10px 5px 0px 5px'
    },
    listItemCollapseTextField: {
        marginBottom: '8px'
    }
}

export default oauthSettingsStyles;