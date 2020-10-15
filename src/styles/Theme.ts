import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
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

export const secondary = '#13AA52'

export default theme;