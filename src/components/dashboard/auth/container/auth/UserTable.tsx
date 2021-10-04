import React from 'react';
import axios from 'axios';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { 
    Checkbox,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Paper,
    IconButton,
    Popper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Grow,
    ListItemIcon,
    ListItemText,
    TextField,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import MoreUserModal from './MoreUserModal';
import { NumberInputNoTicks } from '../../../../Inputs';
import GetInputFromType from '../../../GetInputFromType';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: theme.typography.subtitle1.fontWeight,
        color: theme.palette.primary.contrastText
    },
    body: {
        fontSize: theme.typography.body2.fontSize,
        height: '61px'
    }
}))(TableCell);

type UserTableProps = {
    classes: any;
    users: any[];
    schema: any[];
    containerId: string;
}

type UserTableState = {
    userIdsSelected: number[] | ['all'];
    userMoreSelected: number;
    userViewModalOpen: boolean;
    userViewSelected: any;
    editingUser: {[key: string]: any};
}

class UserTable extends React.Component<UserTableProps, UserTableState> {
    private openUserRef: React.RefObject<any>
    constructor(props) {
        super(props);

        this.openUserRef = React.createRef();
        this.createHeaders = this.createHeaders.bind(this);
        this.getInputFromType = this.getInputFromType.bind(this);
        this.saveEditedUser = this.saveEditedUser.bind(this);

        this.state = {
            userIdsSelected: [],
            userMoreSelected: -1,

            userViewModalOpen: false,
            userViewSelected: null,

            editingUser: {}
        }
    }

    saveEditedUser() {
        const { containerId } = this.props;
        const { editingUser } = this.state;

        axios.patch(`/api/container/auth/${containerId}/user/edit`, {
            user_id: editingUser.id,
            edit: {
                ...editingUser
            }
        }, { withCredentials: true })
        .then((res) => {
            console.log(res.data)
            this.setState({
                editingUser: {}
            });
        })
        .catch((err) => {
            console.error(err)
            this.setState({
                editingUser: {}
            });
        })
    }

    createHeaders() {
        const { classes, users, schema } = this.props;
        const { userIdsSelected } = this.state;
        
        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name);
        
        return (
            <TableRow>
                <StyledTableCell size="small" className={classes.checkboxCol} colSpan={1}>
                    <Checkbox
                        checked={userIdsSelected[0] === 'all' || userIdsSelected.length === users.length}
                        indeterminate={userIdsSelected[0] !== 'all' && (userIdsSelected.length > 0 && userIdsSelected.length !== users.length)}
                        className={classes.whiteCheckbox}
                        onChange={(e) => this.setState({
                            userIdsSelected: e.target.checked ? ['all'] : [] 
                        })}
                    />
                </StyledTableCell>
                { filteredColumnNames.map((col, i) => (
                    <StyledTableCell align="left" key={i}>
                        {col}
                    </StyledTableCell>
                )) }
                <StyledTableCell align="center">
                    verified
                </StyledTableCell>
                <StyledTableCell align="center">
                    account created
                </StyledTableCell>
                <StyledTableCell align="center" size="small" className={classes.moreCol} colSpan={1}>
                </StyledTableCell>
            </TableRow>
        )
    }

    getInputFromType(type: string, col: string) {
        const { classes } = this.props;
        const { editingUser } = this.state;

        switch (type) {
            case 'String': 
                return (
                    <TextField
                        fullWidth
                        key={col}
                        value={editingUser[col]}
                        className={classes.smallTextField}
                        onChange={(e) => {
                            this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: e.target.value
                                }
                            })
                        }}
                    />
                );
            case 'Int':
                return (
                    <NumberInputNoTicks
                        fullWidth
                        key={col}
                        value={editingUser[col]}
                        type="number"
                        className={classes.smallTextField}
                        onChange={(e) => {
                            this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: parseInt(e.target.value)
                                }
                            })
                        }}
                    /> 
                );
            case 'Float':
                return (
                    <NumberInputNoTicks
                        fullWidth
                        key={col}
                        value={editingUser[col]}
                        type="number"
                        className={classes.smallTextField}
                        onChange={(e) => {
                            this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: parseFloat(e.target.value)
                                }
                            })
                        }}
                    /> 
                );
            case 'JSON': 
                return (
                    <TextField
                        fullWidth
                        multiline
                        key={col}
                        value={editingUser[col]}
                        className={classes.smallTextField}
                        onChange={(e) => {
                            this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: e.target.value
                                }
                            })
                        }}
                    />
                );
            case 'Boolean':
                return (
                    <FormControl>
                        <Select
                            key={col}
                            value={editingUser[col].toString()}
                            className={classes.smallTextField}
                            onChange={(e) => {
                                this.setState({
                                    editingUser: {
                                        ...editingUser,
                                        [col]: Boolean(e.target.value)
                                    }
                                })
                            }}
                        >
                            <MenuItem value={'true'}>true</MenuItem>
                            <MenuItem value={'false'}>false</MenuItem>
                        </Select>
                    </FormControl>
                );
            case 'Date':
                return (
                    <TextField
                        fullWidth
                        key={col}
                        value={editingUser[col]}
                        label={col}
                        type="date"
                        className={classes.smallTextField}
                        onChange={(e) => {
                            this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: new Date(e.target.value)
                                }
                            })
                        }}
                    />
                );
            case 'DateTime':
                return (
                    <TextField
                        fullWidth
                        key={col}
                        value={editingUser[col]}
                        label={col}
                        type="datetime-local"
                        className={classes.smallTextField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: new Date(e.target.value)
                                }
                            })
                        }}
                    />
                );
            default:
                console.error('Unrecognised type.');
                break;
        }
    }

    createEditingUserRow(user: any) {
        const { classes, users, schema } = this.props;
        const { userIdsSelected, userMoreSelected, userViewSelected, editingUser } = this.state;

        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name);

        return (
            <TableRow>
                <StyledTableCell size="small" className={classes.checkboxCol} colSpan={1}>
                    <IconButton
                        className={classes.smallIconButton}
                        onClick={(e) => {
                            this.setState({
                                editingUser: {}
                            });
                        }}
                    >
                        <CancelIcon/>
                    </IconButton>
                </StyledTableCell>
                { filteredColumnNames.map((col, j) => (
                    <StyledTableCell align="left" size="small" key={j}>
                        <GetInputFromType 
                            type={schema.find(r => r.name === col).type} 
                            colName={col} value={editingUser[col]} 
                            onChange={(newValue) => this.setState({
                                editingUser: {
                                    ...editingUser,
                                    [col]: newValue
                                }
                            })} />
                    </StyledTableCell>
                )) }
                <StyledTableCell align="center">
                    {user.verified.toString()}
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.noWrap}>
                    {(new Date(user.createdAt)).toLocaleTimeString()} {(new Date(user.createdAt)).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center" size="small" className={classes.moreCol} colSpan={1}>
                    <IconButton
                        className={classes.smallIconButton}
                        onClick={(e) => {
                            this.saveEditedUser()
                        }}
                    >
                        <SaveIcon/>
                    </IconButton>
                </StyledTableCell>
            </TableRow>
        )
    }

    createBody() {
        const { classes, users, schema } = this.props;
        const { userIdsSelected, userMoreSelected, userViewSelected, editingUser } = this.state;

        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name);
        
        return users.map((user, i) => (user.id !== editingUser.id) ? (
            <TableRow key={i}>
                <StyledTableCell size="small" className={classes.checkboxCol} colSpan={1}>
                    <Checkbox
                        checked={(userIdsSelected as number[]).includes(user.id) || userIdsSelected[0] === 'all'}
                        onChange={(e) => this.setState({
                            userIdsSelected: e.target.checked ? 
                                [ ...userIdsSelected, user.id ] : 
                                [ ...(userIdsSelected as number[]).filter(u => u !== user.id) ]
                        })}
                    />
                </StyledTableCell>
                { filteredColumnNames.map((col, j) => (
                    <StyledTableCell align="left" key={j}>
                        {user[col]}
                    </StyledTableCell>
                )) }
                <StyledTableCell align="center">
                    {user.verified.toString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {(new Date(user.createdAt)).toLocaleTimeString()} {(new Date(user.createdAt)).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center" size="small" className={classes.moreCol} colSpan={1}>
                    <IconButton
                        ref={this.openUserRef}
                        onClick={(e) => {
                            this.setState({
                                userMoreSelected: user.id,
                            });
                            this.openUserRef.current.focus();
                        }}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Popper
                        open={userMoreSelected === user.id}
                        anchorEl={this.openUserRef.current}
                        role={undefined}
                        placement="right-end"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                    placement === 'right-end' ? 'right top' : 'right bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={(e) => this.setState({
                                        userMoreSelected: -1
                                    })}>
                                        <MenuList
                                            autoFocusItem={userMoreSelected === user.id}
                                        >
                                            <MenuItem onClick={(e) => {
                                                this.setState({
                                                    userViewModalOpen: true,
                                                    userViewSelected: user,
                                                    userMoreSelected: -1
                                                });
                                            }}>
                                                <ListItemIcon>
                                                    <DescriptionOutlinedIcon color="secondary"/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    View
                                                </ListItemText>
                                            </MenuItem>
                                            <MenuItem onClick={(e) => {
                                                this.setState({
                                                    editingUser: user,
                                                    userMoreSelected: -1
                                                })
                                            }}>
                                                <ListItemIcon>
                                                    <CreateOutlinedIcon color="secondary"/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    Edit
                                                </ListItemText>
                                            </MenuItem>
                                            <MenuItem onClick={(e) => {
                                                console.log('Logout')
                                            }}>
                                                <ListItemIcon>
                                                    <DeleteOutlinedIcon color="secondary"/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    Delete
                                                </ListItemText>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </StyledTableCell>
            </TableRow>
        ) : this.createEditingUserRow(user))
    }

    render() {
        const { classes, users, schema } = this.props;
        const { userViewModalOpen, userMoreSelected, userViewSelected } = this.state;

        return (
            <div className={classes.root}>
                <MoreUserModal 
                    schema={schema}
                    open={userViewModalOpen} 
                    user={userViewSelected} 
                    handleClose={() => this.setState({ userViewModalOpen: false })}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            {this.createHeaders()}
                        </TableHead>
                        <TableBody>
                            {this.createBody()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.container.auth.stats.users,
});

const mapDispatchToProps = dispatch => ({

})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme) => ({
        root: {

        },
        headers: {
            background: theme.palette.primary.main,
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 25px 0 10px',
            columnGap: '10px',
            overflowX: 'auto'
        },
        header: {
            color: theme.palette.primary.contrastText,
            minWidth: '120px'
        },
        cell: {
            minWidth: '120px'
        },
        moreCol: {
            width: '0px'
        },
        row: {
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 25px 0 10px',
            columnGap: '10px',
            overflowX: 'auto',
            borderBottom: `1px solid ${theme.palette.grey['50']}`
        },
        flexGrow: {
            flexGrow: 1
        },
        whiteCheckbox: {
            color: '#ffffff !important'
        },
        checkboxCol: {
            paddingRight: '16px',
            width: '50px'
        },
        smallIconButton: {
            padding: '9px'
        },
        smallTextField: {
            '& input': {
                fontSize: '14px'
            }
        },
        noWrap: {
            whiteSpace: 'nowrap'
        }
    }))
)(UserTable);