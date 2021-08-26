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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

export const StyledListItemIcon = withStyles({
    root: {
        minWidth: '30px'
    }
})(ListItemIcon)

export const StyledMenu = withStyles({
    paper: {
        backgroundColor: '#212121',
        color: '#ffffff'
    }
})(Menu);

export const NumberInputNoTicks = withStyles({
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
})(TextField);

export const StyledTextField = withStyles({
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
})(TextField);

export const StyledCheckbox = withStyles({
    root: {
        padding: '5px',
    }
})(Checkbox);

export const StyledSelect = withStyles({
    root: {
        fontSize: '14px',
        backgroundColor: 'transparent',
        '& .MuiSelect-select': {
            paddingRight: '0px',
        },
    }
})(Select);

export const StyledRadio = withStyles({
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
})(Radio);

export const RedButton = withStyles({
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
})(Button);

export const GreenButton = withStyles({
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
})(Button);

export const StyledFormControlLabel = withStyles({
    root: {
        color: '#ffffff',
        '& > .MuiFormControlLabel-label': {
            fontSize: '14px',
        }
    }
})(FormControlLabel);

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