import React from 'react';

import {
    withStyles
} from '@material-ui/core/styles';

import {
    TextField,
    FormControl,
    MenuItem,
    Select
} from '@material-ui/core';

import {
    NumberInputNoTicks
} from '../Inputs';

type GetInputFromTypeProps = {
    classes: any;
    className?: string;
    type: string;
    colName: string;
    value: any;
    size?: 'small';
    onChange: (value: any) => void;
}

class GetInputFromType extends React.Component<GetInputFromTypeProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, type, value, colName, size, onChange, className } = this.props;

        switch (type) {
            case 'String': 
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value}
                        className={`${size === 'small' ? classes.smallTextField : null} ${className}`}
                        onChange={(e) => onChange(e.target.value)}
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
                    />
                );
            default:
                console.error('Unrecognised type.');
                break;
        }
    }
}

export default withStyles((theme) => ({
    smallTextField: {
        '& input': {
            fontSize: '14px'
        }
    },
}))(GetInputFromType);