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
    type: string;
    colName: string;
    value: string;
    onChange: (value: any) => void;
}

class GetInputFromType extends React.Component<GetInputFromTypeProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, type, value, colName, onChange } = this.props;

        switch (type) {
            case 'String': 
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value}
                        className={classes.smallTextField}
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
                        className={classes.smallTextField}
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
                        className={classes.smallTextField}
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
                        className={classes.smallTextField}
                        onChange={(e) => onChange(e.target.value)}
                    />
                );
            case 'Boolean':
                return (
                    <FormControl>
                        <Select
                            key={colName}
                            value={value.toString()}
                            className={classes.smallTextField}
                            onChange={(e) => onChange(Boolean(e.target.value))}
                        >
                            <MenuItem value={1}>true</MenuItem>
                            <MenuItem value={0}>false</MenuItem>
                        </Select>
                    </FormControl>
                );
            case 'Date':
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value.toString()}
                        type="date"
                        className={classes.smallTextField}
                        onChange={(e) => onChange(new Date(e.target.value))}
                    />
                );
            case 'DateTime':
                return (
                    <TextField
                        fullWidth
                        key={colName}
                        value={value.toString()}
                        type="datetime-local"
                        className={classes.smallTextField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => onChange(new Date(e.target.value))}
                    />
                );
            default:
                console.error('Unrecognised type.');
                break;
        }
    }
}

export default withStyles((theme) => ({

}))(GetInputFromType);