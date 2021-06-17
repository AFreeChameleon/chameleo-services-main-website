import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const chameleoGreen = '#51C85D';
const darkGreen = '#0e803d';
const themeObj = {
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#000000'
        },
        secondary: {
            main: chameleoGreen,
            contrastText: '#ffffff'
        },
        error: {
            main: red.A400,
        },
        background: {
            light: chameleoGreen,
            default: '#ffffff',
            dark: darkGreen,
            contrastText: '#ffffff',
        },
        text: {
            primary: '#000000',
        }
    },
    typography: {
        fontFamily: '"Nunito", "Roboto"',
        fontWeightMedium: 600,
        fontWeightBold: 700,
        button: {
            fontWeight: 600
        }
    }
}

// Create a theme instance.
const theme: any = createMuiTheme(themeObj);

export const secondary = '#13AA52';

export default theme;