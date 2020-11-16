import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#000000'
        },
        secondary: {
            main: '#13AA52',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#ffffff',
        },
    },
});

export const secondary = '#13AA52';

export default theme;