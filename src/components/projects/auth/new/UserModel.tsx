import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    modelSetRow,
    modelAddRow,
    modelRemoveRow
} from '../../../../redux/projects/auth/new/model/actions';

import 
    attributeTableStyles, 
    { tableTheme, errorTheme } 
from '../../../../styles/projects/auth/new/components/attributeTableStyles';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import {
    Checkbox,
    Button
} from '@material-ui/core';
import {
    Add as AddIcon,
    Remove as RemoveIcon
} from '@material-ui/icons';

type TableDataProps = {
    name: string,
    unique: boolean,
    required: boolean,
    default: string,
    type: string,
    max: number,
    min: number
}

const AttributeTable: FunctionComponent = () => {
    const classes = makeStyles(attributeTableStyles)();
    const table: TableDataProps[] = useSelector(state => state.model.table);
    const dispatch = useDispatch();
    return (
        <div className={classes.root}>
            <div className={classes.title}>User Model</div>
            <div className={classes.subTitle}>What data will be stored inside your table:</div>
            <ThemeProvider theme={tableTheme}>
                <div className={classes.table}>
                    <div className={`${classes.row} ${classes.headers}`}>
                        <div className={`${classes.column} ${classes.header} ${classes.left}`}>Column Name</div>
                        <div className={`${classes.column} ${classes.header}`}>Unique</div>
                        <div className={`${classes.column} ${classes.header}`}>Required</div>
                        <div className={`${classes.column} ${classes.header} ${classes.left}`}>Default</div>
                        <div className={`${classes.column} ${classes.header} ${classes.left}`}>Type</div>
                        <div className={`${classes.column} ${classes.header}`}>Max. Length</div>
                        <div className={`${classes.column} ${classes.header}`}>Min. Length</div>
                    </div>
                    { table.map((row, i) => (
                        <div className={classes.row} key={i}>
                            <div className={classes.column}>
                                <input
                                    className={classes.input}
                                    type="text"
                                    defaultValue={row.name}
                                    onBlur={(e) => {
                                        dispatch(modelSetRow(i, 'name', e.target.value));
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <Checkbox
                                    checked={row.unique}
                                    onChange={(e) => {
                                        dispatch(modelSetRow(i, 'unique', e.target.checked));
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <Checkbox
                                    checked={row.required}
                                    onChange={(e) => {
                                        dispatch(modelSetRow(i, 'required', e.target.checked));
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <input
                                    className={classes.input}
                                    type="text"
                                    value={!row.required ? row.default : ''}
                                    disabled={row.required}
                                    onChange={(e) => {
                                        dispatch(modelSetRow(i, 'default', e.target.value));
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <select 
                                    className={classes.select}
                                    value={row.type}
                                    onChange={(e) => {
                                        dispatch(modelSetRow(i, 'type', e.target.value));
                                    }}
                                >
                                    <option>String</option>
                                    <option>Number</option>
                                    <option>Username</option>
                                    <option>Email</option>
                                    <option>Password</option>
                                </select>
                            </div>
                            <div className={classes.column}>
                                <input
                                    className={classes.input}
                                    type="number"
                                    value={row.max}
                                    onChange={(e) => {
                                        dispatch(modelSetRow(i, 'max', e.target.valueAsNumber));
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <input
                                    className={classes.input}
                                    type="number"
                                    value={row.min}
                                    onChange={(e) => {
                                        dispatch(modelSetRow(i, 'min', e.target.valueAsNumber));
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <ThemeProvider theme={errorTheme}>
                                    <Button
                                    color="secondary"
                                    onClick={(e) => {
                                        dispatch(modelRemoveRow(i));
                                    }}>
                                        <RemoveIcon/>
                                    </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                    )) }
                </div>
                <div className={classes.addRow}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => {
                            dispatch(modelAddRow({
                                name: 'Column Name',
                                unique: false,
                                required: false,
                                default: 'default',
                                type: 'String',
                                max: 250,
                                min: 3
                            }));
                        }}
                        startIcon={<AddIcon/>}
                    >
                        Add Property
                    </Button>
                </div>
            </ThemeProvider>
        </div>
    )
}

export const checkUserModel = (table: TableDataProps[]) => {
    const errors: string[] = [];
    const regex = {
        name: /^[A-Za-z0-9_-]*$/,
    }
    if (!table.find(row => row.type === 'Email')) {
        errors.push('Model must include an Email column.');
    }
    if (!table.find(row => row.type === 'Password')) {
        errors.push('Model must include an Password column.');
    }
    if (table.filter(row => !row.name.match(regex.name)).length > 0) {
        errors.push('Special characters are not allowed in model names except _-')
    }
    const uniqueErrors: string[] = [...new Set(errors)]
    return uniqueErrors;
}

export default AttributeTable;