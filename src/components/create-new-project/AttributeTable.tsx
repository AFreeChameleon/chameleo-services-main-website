import { FunctionComponent, useEffect, useState } from 'react';
import { TableData, Error } from '../../types';

import attributeTableStyles, { tableTheme, errorTheme } from '../../styles/create-new-project/components/attributeTableStyles';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import {
    Checkbox,
    Button
} from '@material-ui/core';
import {
    ControlPoint as ControlPointIcon,
    Add as AddIcon,
    Remove as RemoveIcon
} from '@material-ui/icons';

type AttributeTableProps = {
    table: TableData[];
    setTable: (table: TableData[]) => void;
    pushError: (error: string) => void;
    removeError: (id: string) => void;
}

const AttributeTable: FunctionComponent<AttributeTableProps> = ({ table, setTable, pushError, removeError }) => {
    const classes = makeStyles(attributeTableStyles)();
    const regex = {
        name: /^[A-Za-z0-9_-]*$/,
    }
    return (
        <div className={classes.root}>
            <div className={classes.title}>User Model</div>
            <div className={classes.subTitle}>What data will be stored:</div>
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
                                        if (!regex.name.test(e.target.value)) {
                                            pushError('Special characters are not allowed in column names except _-')
                                        } else {
                                            removeError('Special characters are not allowed in column names except _-')
                                        }
                                        const newTable = table;
                                        newTable[i].name = e.target.value;
                                        setTable([
                                            ...newTable
                                        ]);
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <Checkbox
                                    checked={row.unique}
                                    onChange={(e) => {
                                        const newTable = table;
                                        newTable[i].unique = e.target.checked;
                                        setTable([
                                            ...newTable
                                        ]);
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <Checkbox
                                    checked={row.required}
                                    onChange={(e) => {
                                        const newTable = table;
                                        newTable[i].required = e.target.checked;
                                        setTable([
                                            ...newTable
                                        ]);
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <input
                                    className={classes.input}
                                    type="text"
                                    value={!row.required ? row.default : ''}
                                    disabled={row.required}
                                    onChange={(e) => {
                                        const newTable = table;
                                        newTable[i].default = e.target.value;
                                        setTable([
                                            ...newTable
                                        ]);
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <select 
                                className={classes.select}
                                value={row.type}
                                onChange={(e) => {
                                    const newTable = table;
                                    newTable[i].type = e.target.value;
                                    console.log(e.target.value)
                                    setTable([
                                        ...newTable
                                    ]);
                                }}>
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
                                        const newTable = table;
                                        newTable[i].max = parseInt(e.target.value);
                                        setTable([
                                            ...newTable
                                        ]);
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <input
                                    className={classes.input}
                                    type="number"
                                    value={row.min}
                                    onChange={(e) => {
                                        const newTable = table;
                                        newTable[i].min = parseInt(e.target.value);
                                        setTable([
                                            ...newTable
                                        ]);
                                    }}/>
                            </div>
                            <div className={classes.column}>
                                <ThemeProvider theme={errorTheme}>
                                    <Button
                                    color="secondary"
                                    onClick={(e) => {
                                        const newArray = table;
                                        newArray.splice(i, 1);
                                        setTable([
                                            ...newArray
                                        ]);
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
                        const newArray = [
                            ...table,
                            {
                                name: 'Column Name',
                                unique: false,
                                required: false,
                                default: 'default',
                                type: 'String',
                                max: 250,
                                min: 3
                            }
                        ]
                        setTable([
                            ...newArray,
                        ])
                    }}>
                        <AddIcon/>
                    </Button>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default AttributeTable;