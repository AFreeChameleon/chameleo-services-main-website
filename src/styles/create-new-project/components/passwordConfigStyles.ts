import Theme from '../../Theme';
import { createMuiTheme, Theme as ThemeType } from '@material-ui/core/styles';

const passwordConfigStyles: any = {
    root: {
        maxWidth: '1000px',
        margin: '30px auto 0 auto',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#000000',
    },
    subTitle: {
        marginBottom: '15px'
    },
    list: {
        listStyle: 'none',
        paddingLeft: '20px'
    },
    listItem: {
        textDecoration: 'none',
        listStyle: 'none',
        '& label': {
            userSelect: 'none'
        }
    },
}

export default passwordConfigStyles;