import { createMuiTheme, Theme } from '@material-ui/core/styles';

const chameleoGreen = '#00AF55';
const navy = '#212B36';
const lightNavy = '#435361';
const blue = '#456EBD';
const paleBlue = '#919EAB';
const darkGreen = '#0e803d';

const lightGrey = '#EDEDED';

const error = '#B72136';
const errorBg = 'rgb(255, 72, 66, 0.1)';

const themeObj = {
    palette: {
        primary: {
            main: chameleoGreen,
            contrastText: navy
        },
        secondary: {
            main: navy,
            contrastText: '#ffffff'
        },
        error: {
            main: error,
            light: errorBg
        },
        background: {
            light: chameleoGreen + '22',
            default: '#ffffff',
            dark: darkGreen,
            contrastText: navy,
        },
        text: {
            primary: lightNavy,
            secondary: navy
        },
        grey: {
            A200: paleBlue,
            ['50']: lightGrey
        }
    },
    typography: {
        fontFamily: '"Nunito", "Roboto"',
        fontWeightMedium: 600,
        fontWeightBold: 700,
        button: {
            fontWeight: 600
        }
    },
    
}

// Create a theme instance.
const theme: any = createMuiTheme(themeObj);

export const secondary = '#13AA52';

export default theme;