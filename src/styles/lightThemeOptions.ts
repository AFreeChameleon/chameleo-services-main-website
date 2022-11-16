import { ThemeOptions } from '@mui/material/styles';

const chameleoGreen = '#00AF55';
const navy = '#212B36';
const lightNavy = '#435361';
const blue = '#456EBD';
const green = '#00AF55';
const red = '#B72136';
const paleBlue = '#919EAB';
const darkGreen = '#0e803d';

const lightGrey = '#EDEDED';

const error = '#B72136';
const errorBg = '#ff4842';

type CustomThemeOptions = ThemeOptions & {
    palette: {
        background: {
            light: string;
            blue: string;
            green: string;
            red: string;
        }
    }
}

const themeObj: CustomThemeOptions = {
    palette: {
        primary: {
            main: chameleoGreen,
            contrastText: '#ffffff'
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
            blue: blue,
            red: red,
            green: green
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
        },
        h1: {
            fontSize: '32px',
            fontWeight: 700
        },
        h3: {
            fontSize: '24px',
            fontWeight: 600,
        },
        h5: {
            fontSize: '18px',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 600
        },
    },
    shape: {
        borderRadius: 0
    }
}

export default themeObj;