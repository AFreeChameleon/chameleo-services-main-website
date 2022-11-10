import React from 'react';


import {
    TextField,
    FormControl,
    MenuItem,
    Select
} from '@mui/material';

import classes from './GetInputFromType.module.scss';

import {
    NumberInputNoTicks
} from '../Inputs';

type GetInputFromTypeProps = {
    className?: string;
    type: string;
    colName: string;
    value: any;
    size?: 'small';
    onChange: (value: any) => void;
    sx?: any;
}

class GetInputFromType extends React.Component<GetInputFromTypeProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, value, colName, size, onChange, className, sx } = this.props;

        switch (type) {
            case 'String': 
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value}
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        onChange={(e) => onChange(e.target.value)}
                        sx={sx}
                    />
                );
            case 'Int':
                return (
                    <NumberInputNoTicks
                        fullWidth
                        key={colName}
                        value={value}
                        type="number"
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        sx={sx}
                    /> 
                );
            case 'Float':
                return (
                    <NumberInputNoTicks
                        fullWidth
                        key={colName}
                        value={value}
                        type="number"
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        sx={sx}
                    /> 
                );
            case 'JSON': 
                return (
                    <TextField
                        fullWidth
                        multiline
                        key={colName}
                        value={value}
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        onChange={(e) => onChange(e.target.value)}
                        sx={sx}
                    />
                );
            case 'Boolean':
                return (
                        <Select
                            fullWidth
                            key={colName}
                            value={value.toString()}
                            className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                            onChange={(e) => onChange(Boolean(e.target.value))}
                            sx={sx}
                        >
                            <MenuItem value={1}>true</MenuItem>
                            <MenuItem value={0}>false</MenuItem>
                        </Select>
                );
            case 'Date':
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value}
                        type="date"
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        onChange={(e) => onChange(e.target.value)}
                        sx={sx}
                    />
                );
            case 'DateTime':
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value}
                        type="datetime-local"
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => onChange(e.target.value)}
                        sx={sx}
                    />
                );
            default:
                console.error('Unrecognised type.');
                break;
        }
    }
}

export default GetInputFromType;