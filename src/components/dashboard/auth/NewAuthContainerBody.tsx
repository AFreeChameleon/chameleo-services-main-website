import React from 'react';
import NextLink from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    addConfigModelRow,
    changeConfigModel,
    changeConfigModelLength,
    removeConfigModelRow
} from '../../../redux/container/auth/config/actions';
import { Breadcrumbs, Typography, Link, Select, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    StyledCheckbox,
    StyledSelect,
    GreenButton,
    RedButton
} from '../../inputs';

type NewAuthContainerBodyProps = {
    classes?: any;
    config: { [key: string]: any };
    dispatchChangeConfigModel: (rowName: string, key: string, value: any) => null;
    dispatchChangeConfigModelLength: (rowName: string, key: string, value: any) => null;
    dispatchRemoveConfigModelRow: (rowName: string) => null;
    dispatchAddConfigModelRow: () => null;
}

class NewAuthContainerBody extends React.Component<NewAuthContainerBodyProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            classes, 
            config, 
            dispatchChangeConfigModel, 
            dispatchChangeConfigModelLength, 
            dispatchRemoveConfigModelRow, 
            dispatchAddConfigModelRow
        } = this.props;
        console.log(config.data)
        return (
            <div className={classes.root}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />}>
                    <NextLink href="/dashboard/auth">
                        <div className={classes.breadcrumb}>Auth</div>
                    </NextLink>
                    <div className={classes.breadcrumbMain}>New Container</div>
                </Breadcrumbs>
                <div className={classes.container}>
                    <div className={classes.title}>
                        Table Columns
                    </div>
                    <div className={classes.tableContainer}>
                        <div className={classes.tableTooltip}>Click on any value to edit it</div>
                        <div className={classes.tableHeaders}>
                            <div className={classes.tableHeader}>
                                Name
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Unique
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Required
                            </div>
                            <div className={classes.tableHeader}>
                                Default
                            </div>
                            <div className={classes.tableHeader}>
                                Type
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Max. Length
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Min. Length
                            </div>
                        </div>
                        <div className={classes.tableBody}>
                            { config.model.map((row, i) => (
                                <div className={classes.tableRow} key={i}>
                                    <div className={classes.tableColumn}>
                                        <input
                                            className={classes.invisibleInput}
                                            value={row.name}
                                            onChange={(e) => 
                                                dispatchChangeConfigModel(row.name, 'name', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={`${classes.tableColumn} ${classes.center}`}>
                                        <StyledCheckbox
                                            checked={row.unique}
                                            onChange={(e) => {
                                                dispatchChangeConfigModel(row.name, 'unique', e.target.checked)
                                            }}
                                        />
                                    </div>
                                    <div className={`${classes.tableColumn} ${classes.center}`}>
                                        <StyledCheckbox
                                            checked={!row.allowNull}
                                            onChange={(e) => {
                                                dispatchChangeConfigModel(row.name, 'allowNull', !e.target.checked)
                                            }}
                                        />
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <input
                                            value={row.defaultValue ? row.defaultValue : ''}
                                            disabled={!row.allowNull}
                                            className={classes.invisibleInput}
                                            onChange={(e) => {
                                                dispatchChangeConfigModel(row.name, 'defaultValue', e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <Select
                                            variant="outlined"
                                            value={row.type}
                                            fullWidth
                                            input={<StyledSelect/>}
                                            onChange={(e) => {
                                                dispatchChangeConfigModel(row.name, 'type', e.target.value)
                                            }}
                                        >
                                            <MenuItem value="String" className={classes.menuItem}>String</MenuItem>
                                            <MenuItem value="Number" className={classes.menuItem}>Number</MenuItem>
                                            <MenuItem value="Username" className={classes.menuItem}>Username</MenuItem>
                                            <MenuItem value="Email" className={classes.menuItem}>Email</MenuItem>
                                            <MenuItem value="Password" className={classes.menuItem}>Password</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <input
                                            value={
                                                row.length && 
                                                    (!isNaN(row.length.min) ?
                                                    row.length.min : 
                                                    ''
                                            )}
                                            className={`${classes.invisibleInput} ${classes.center}`}
                                            onChange={(e) => {
                                                dispatchChangeConfigModelLength(row.name, 'min', parseInt(e.target.value))
                                            }}
                                        />
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <input
                                            value={
                                                row.length && 
                                                    (!isNaN(row.length.max) ? 
                                                    row.length.max : 
                                                    ''
                                            )}
                                            className={`${classes.invisibleInput} ${classes.center}`}
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
                    </div>
                    <div className={classes.addModelRowButton}>
                        <GreenButton
                            color="secondary"
                            variant="outlined"
                            onClick={(e) => {
                                dispatchAddConfigModelRow();
                            }}
                            endIcon={<AddIcon/>}
                        >
                            Add New Row
                        </GreenButton>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>Password Settings</div>
                    <div className={classes.passwordCheckbox}>

                    </div>
                </div>
            </div>
        )
    }
}

const styles = (): any => ({
    root: {
        backgroundColor: '#212121',
        overflowY: 'auto',
        padding: '10px 15px',
        color: '#ffffff'
    },
    breadcrumb: {
        color: '#6F6F76',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    breadcrumbMain: {
        color: '#ffffff'
    },
    container: {
        maxWidth: '1100px',
        backgroundColor: '#2C2C2C',
        marginTop: '10px',
        borderRadius: '10px',
        padding: '10px'
    },
    title: {
        fontSize: '16px',
        fontWeight: 500
    },
    tableContainer: {
        marginTop: '10px'
    },
    tableHeaders: {
        display: 'grid',
        gridTemplateColumns: '26% 6% 8% 15% 15% 11% 11% 8%',
        width: '100%',
        height: '40px',
        backgroundColor: '#51C85D',
        alignItems: 'center',
        borderRadius: '5px',
        padding: '0 5px'
    },
    tableBody: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
        paddingTop: '5px'
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '26% 6% 8% 15% 15% 11% 11% 8%',
        width: '100%',
        height: '40px',
        alignItems: 'center',
        borderRadius: '5px',
        padding: '0 5px'
    },
    center: {
        textAlign: 'center'
    },
    tableTooltip: {
        fontSize: '12px',
        color: '#6F6F76',
        paddingBottom: '5px'
    },
    invisibleInput: {
        border: 'none',
        outline: 'none',
        height: '40px',
        paddingLeft: '8px',
        width: '100%',
        fontSize: '14px',
        backgroundColor: 'transparent',
        color: '#ffffff'
    },
    menuItem: {
    },
    addModelRowButton: {
        padding: '10px 0 0 10px'
    }
});

const mapStateToProps = (state) => ({
    config: state.container.auth.config.data
});

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeConfigModel: (rowName: string, key: string, value: any) => dispatch(changeConfigModel(rowName, key, value)),
    dispatchChangeConfigModelLength: (rowName: string, key: string, value: any) => dispatch(changeConfigModelLength(rowName, key, value)),
    dispatchRemoveConfigModelRow: (rowName: string) => dispatch(removeConfigModelRow(rowName)),
    dispatchAddConfigModelRow: () => dispatch(addConfigModelRow())
})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles), 
)(NewAuthContainerBody);