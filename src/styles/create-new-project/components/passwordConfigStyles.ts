import Theme from '../../Theme';
import { createMuiTheme, Theme as ThemeType } from '@material-ui/core/styles';

const passwordConfigStyles: any = {
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
        marginBottom: '15px',
        textAlign: 'center',
        color: 'rgb(0, 0, 0, 0.6)',
    },
    alignCenter: {
        textAlign: 'center'
    },
    list: {
        listStyle: 'none',
        paddingLeft: '20px',
        width: 'fit-content',
        textAlign: 'left',
        margin: '0 auto'
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