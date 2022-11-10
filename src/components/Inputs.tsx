import React from 'react';
import {
    Typography,
    Checkbox,
    Select,
    MenuItem,
    InputBase,
    Button,
    TextField,
    FormControlLabel,
    Radio,
    Menu,
    ListItemIcon
} from '@mui/material';
import { styled } from '@mui/styles';

export const StyledListItemIcon = styled(ListItemIcon)({
    root: {
        minWidth: '30px'
    }
})

export const StyledMenu = styled(Menu)({
    paper: {
        backgroundColor: '#212121',
        color: '#ffffff'
    }
});

export const NumberInputNoTicks = styled(TextField)({
    root: {
        '& > div > input': {
            textAlign: 'center',
        },
        '& .MuiInputBase-root .MuiInputBase-input::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
        '& .MuiInputBase-root .MuiInputBase-input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
    }
});

export const StyledTextField = styled(TextField)({
    root: {
        '& > label': {
            color: '#6F6F76',
        },
        '& > div > input': {
            // color: '#ffffff'
        },
        '& > div > input:disabled': {
            color: '#6F6F76'
        },
        '& > div > textarea': {
            // color: '#ffffff'
        },
        '& > div > textarea:disabled': {
            color: '#6F6F76'
        },
        '& > div::before': {
            borderColor: '#51C85D !important'
        },
        '& > p': {
            color: '#6F6F76'
        }
    }
});

export const StyledCheckbox = styled(Checkbox)({
    root: {
        padding: '5px',
    }
});

export const StyledSelect = styled(Select)({
    root: {
        fontSize: '14px',
        backgroundColor: 'transparent',
        '& .MuiSelect-select': {
            paddingRight: '0px',
        },
    }
});

export const StyledRadio = styled(Radio)({
    root: {
        padding: '5px',
        '& > span > div > svg > path': {
            fill: '#ffffff'
        },

    },
    checked: {
        '& > span > div > svg > path': {
            fill: '#51C85D'
        }
    },
});

export const RedButton = styled(Button)({
    root: {
        '&:hover': {
            backgroundColor: 'rgb(255, 0, 0, 0.05)',
        },
        '& .MuiButton-label': {
            color: 'red'
        }
    },
    disabled: {
        '& .MuiButton-label': {
            color: 'rgba(0, 0, 0, 0.26)'
        }
    }
});

export const GreenButton = styled(Button)({
    root: {
        '& .MuiButton-label': {
            // alignItems: 'flex-start',
            paddingTop: '2px',
        },
        '& .MuiButton-label > span': {
            marginBottom: '2px'
        }
    },
    disabled: {
        '& .MuiButton-label': {
            color: 'rgba(0, 0, 0, 0.26)'
        },
        border: 'rgba(0, 0, 0, 0.12)'
    }
});

export const StyledFormControlLabel = styled(FormControlLabel)({
    root: {
        color: '#ffffff',
        '& > .MuiFormControlLabel-label': {
            fontSize: '14px',
        }
    }
});

// export const ErrorButton = ({ onClick }) => (
//     <RedButton onClick={onClick}>
//         <RemoveIcon/>
//     </RedButton>
// )

// export const AddButton = ({ onClick }) => (
//     <GreenButton
//         onClick={onClick}
//     >
//         <AddIcon/>
//     </GreenButton>
// )