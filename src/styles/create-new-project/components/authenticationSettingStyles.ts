import Theme from '../../Theme';
import { createMuiTheme, Theme as ThemeType } from '@material-ui/core/styles';

const authenticationSettingStyles: any = {
    root: {
        margin: '30px auto 0 auto',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#000000',
    },
    subTitle: {
        marginBottom: '20px'
    },
    list: {
        listStyle: 'none',
        paddingLeft: '20px',
        '& li': {
            marginBottom: '10px'
        }
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
        width: '350px'
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
    }
}

export default authenticationSettingStyles;