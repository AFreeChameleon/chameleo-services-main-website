import React from 'react';
import {
    Typography,
    Checkbox,
    Select,
    MenuItem,
    InputBase,
    Button,
    TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

export const NumberInputNoTicks = withStyles({
    root: {
        '& .MuiInputBase-root .MuiInputBase-input::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
        '& .MuiInputBase-root .MuiInputBase-input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        }
    }
})(TextField);

export const StyledCheckbox = withStyles({
    root: {
        padding: '5px'
    }
})(Checkbox);

export const StyledSelect = withStyles({
    root: {
        '& fieldset': {
            border: 'none'
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: '#ffffff'
        }
    },
})(InputBase);

export const RedButton = withStyles({
    root: {
        '&:hover': {
            backgroundColor: 'rgb(255, 0, 0, 0.05)'
        },
        '& .MuiButton-label': {
            color: 'red'
        }
    }
})(Button);

export const GreenButton = withStyles({
    root: {
        border: '1px solid #13AA52',
        '&:hover': {
            backgroundColor: 'rgb(0, 255, 0, 0.05)'
        },
        '& .MuiButton-label': {
            color: '#13AA52'
        }
    }
})(Button);

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