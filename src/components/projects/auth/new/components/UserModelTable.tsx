import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    changeConfigModel,
    changeConfigModelLength,
    removeConfigModelRow,
    changeConfigModelTitle,
    addConfigModelRow
} from '../../../../../redux/projects/auth/new/config/actions';

import {
    Typography,
    Select,
    MenuItem,
} from '@material-ui/core';
import {
    StyledCheckbox,
    StyledSelect,
    RedButton,
    GreenButton
} from './inputs';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

class UserModelTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            classes, 
            configObj, 
            project,
            dispatchChangeConfigModel,
            dispatchChangeConfigModelLength,
            dispatchRemoveConfigModelRow,
            dispatchChangeConfigModelTitle,
            dispatchAddConfigModelRow
        }: any = this.props;
        const config = configObj.data;
        console.log(config.model);
        return (
            <div>
                <div className={classes.modelTable}>
                    <div className={classes.modelHeaders}>
                        <div className={classes.modelHeader}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Name
                            </Typography>
                        </div>
                        <div className={`${classes.modelHeader} ${classes.center}`}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Unique
                            </Typography>
                        </div>
                        <div className={`${classes.modelHeader} ${classes.center}`}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Required
                            </Typography>
                        </div>
                        <div className={classes.modelHeader}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Default
                            </Typography>
                        </div>
                        <div className={classes.modelHeader}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Type
                            </Typography>
                        </div>
                        <div className={`${classes.modelHeader} ${classes.center}`}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Max. Length
                            </Typography>
                        </div>
                        <div className={`${classes.modelHeader} ${classes.center}`}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Min. Length
                            </Typography>
                        </div>
                        <div className={`${classes.modelHeader} ${classes.center}`}>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                color="primary"
                            >
                                Remove
                            </Typography>
                        </div>
                    </div>
                    { config.model && config.model.map((row, i) => (
                        <div className={classes.modelRow} key={i}>
                            <div className={classes.modelInputColumn}>
                                <input
                                    value={row.name}
                                    className={classes.input}
                                    onChange={(e) => {
                                        dispatchChangeConfigModel(row.name, 'name', e.target.value)
                                    }}
                                />
                            </div>
                            <div className={`${classes.modelColumn} ${classes.center}`}>
                                <StyledCheckbox
                                    checked={row.unique}
                                    onChange={(e) => {
                                        dispatchChangeConfigModel(row.name, 'unique', e.target.checked)
                                    }}
                                />
                            </div>
                            <div className={`${classes.modelColumn} ${classes.center}`}>
                                <StyledCheckbox
                                    checked={!row.allowNull}
                                    onChange={(e) => {
                                        dispatchChangeConfigModel(row.name, 'allowNull', !e.target.checked)
                                    }}
                                />
                            </div>
                            <div className={classes.modelInputColumn}>
                                <input
                                    value={row.defaultValue ? row.defaultValue : ''}
                                    disabled={!row.allowNull}
                                    className={classes.input}
                                    onChange={(e) => {
                                        dispatchChangeConfigModel(row.name, 'defaultValue', e.target.value)
                                    }}
                                />
                            </div>
                            <div className={classes.modelInputColumn}>
                                <Select
                                    variant="outlined"
                                    value={row.type}
                                    fullWidth
                                    input={<StyledSelect/>}
                                    onChange={(e) => {
                                        dispatchChangeConfigModel(row.name, 'type', e.target.value)
                                    }}
                                >
                                    <MenuItem value="String">String</MenuItem>
                                    <MenuItem value="Number">Number</MenuItem>
                                    <MenuItem value="Username">Username</MenuItem>
                                    <MenuItem value="Email">Email</MenuItem>
                                    <MenuItem value="Password">Password</MenuItem>
                                </Select>
                            </div>
                            <div className={classes.modelInputColumn}>
                                <input
                                    value={
                                        row.length && 
                                            (!isNaN(row.length.min) ?
                                            row.length.min : 
                                            ''
                                    )}
                                    className={`${classes.input} ${classes.center}`}
                                    onChange={(e) => {
                                        console.log(row)
                                        dispatchChangeConfigModelLength(row.name, 'min', parseInt(e.target.value))
                                    }}
                                />
                            </div>
                            <div className={classes.modelInputColumn}>
                                <input
                                    value={
                                        row.length && 
                                            (!isNaN(row.length.max) ? 
                                            row.length.max : 
                                            ''
                                    )}
                                    className={`${classes.input} ${classes.center}`}
                                    onChange={(e) => {
                                        dispatchChangeConfigModelLength(row.name, 'max', parseInt(e.target.value))
                                    }}
                                />
                            </div>
                            <div className={`${classes.modelColumn} ${classes.center}`}>
                                <RedButton
                                    onClick={(e) => {
                                        dispatchRemoveConfigModelRow(row.name);
                                    }}
                                >
                                    <RemoveIcon/>
                                </RedButton>
                            </div>
                        </div>
                    )) }
                </div>
                <div className={classes.addModelRowButton}>
                    <GreenButton
                        color="secondary"
                        variant="outlined"
                        onClick={(e) => {
                            dispatchAddConfigModelRow();
                        }}
                    >
                        <AddIcon/>
                    </GreenButton>
                </div>
            </div>
        )
    }
}

const styles: any = (theme) => ({
    modelTable: {
        marginTop: '20px'
    },
    modelHeaders: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '26% 7% 7% 15% 15% 11% 11% 8%',
        width: '100%',
        padding: '10px 0',
        boxShadow: '0px 1px 6px rgb(0, 0, 0, 0.3)',
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        zIndex: '50',
        height: '50px'
    },
    modelHeader: {
        padding: '0 5px',
    },
    modelRow: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '26% 7% 7% 15% 15% 11% 11% 8%',
        width: '100%',  
        borderBottom: '1px solid #888888',
        height: '56px'
    },
    modelColumn: {
        padding: '10px 5px',
    },
    modelInputColumn: {
        padding: '0px 5px',
    },
    center: {
        textAlign: 'center'
    },
    input: {
        border: 'none',
        outline: 'none',
        height: '52px',
        paddingLeft: '8px',
        width: '100%',
        fontSize: '14px'
    },
    addModelRowButton: {
        paddingTop: '10px',
        paddingLeft: '10px'
    }
})

const mapStateToProps = (state) => {
    return {
        project: state.project,
        configObj: state.config
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchChangeConfigModel: (rowName: string, key: string, value) => dispatch(changeConfigModel(rowName, key, value)),
        dispatchChangeConfigModelLength: (modelKey: string, key: string, value) => dispatch(changeConfigModelLength(modelKey, key, value)),
        dispatchRemoveConfigModelRow: (rowName: string) => dispatch(removeConfigModelRow(rowName)),
        dispatchChangeConfigModelTitle: (oldName: string, newName: string) => dispatch(changeConfigModelTitle(oldName, newName)),
        dispatchAddConfigModelRow: () => dispatch(addConfigModelRow())
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(UserModelTable);