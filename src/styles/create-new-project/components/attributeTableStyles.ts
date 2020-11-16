import Theme from '../../Theme';
import { createMuiTheme, Theme as ThemeType } from '@material-ui/core/styles';

export const tableTheme: ThemeType = createMuiTheme({
    ...Theme,
    overrides: {
        MuiCheckbox: {
            root: {
                padding: '5px'
            }
        }
    }
});

export const errorTheme: ThemeType = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: Theme.palette.error.main
        }
    },
    overrides: {
        MuiButton: {
            root: {
                minWidth: '36px',
                height: '36px',
            },
            outlined: {
                padding: '5px',
            }
        }
    }
});

const attributeTableStyles: any = {
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
    table: {
        display: 'grid',
        gridTemplateRows: 'auto',
        // padding: '0 20px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '25% 7% 7% 14% 14% 10% 10% 8%',
        gridColumnGap: '10px',
        borderBottom: '1px solid #888888'
    },
    headers: {
        border: 'none'
    },
    column: {
        textAlign: 'center',
    },
    left: {
        textAlign: 'left'
    },
    input: {
        width: '100%',
        height: '100%',
        border: 'none',
        '&:focus': {
            outline: 'none'
        },
        '&[type="number"]': {
            MozAppearance: 'textfield',
            textAlign: 'center'
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none'
        },
    },
    select: {
        width: '100%',
        height: '100%',
        border: 'none',
        '&:focus': {
            outline: 'none'
        },
    },
    addRow: {
        marginTop: '20px',
        textAlign: 'center'
    },
}

export default attributeTableStyles;