import React from 'react';
import axios from 'axios';

import { compose } from 'redux';
import { connect } from 'react-redux';

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
} from '@mui/material';

import { styled } from '@mui/styles';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import MoreUserModal from './MoreUserModal';
import { NumberInputNoTicks } from '../../../../Inputs';
import GetInputFromType from '../../../GetInputFromType';
import { fetchAllUsers } from '../../../../../redux/container/auth/stats/actions';

import classes from './UserTable.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
}));

type UserTableProps = {
    users: any[];
    schema: any[];
    containerId: string;
    dispatchFetchAllUsers: (containerId: string) => void;
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
        this.deleteUser = this.deleteUser.bind(this);
        this.createHeaders = this.createHeaders.bind(this);
        this.saveEditedUser = this.saveEditedUser.bind(this);

        this.state = {
            userIdsSelected: [],
            userMoreSelected: -1,

            userViewModalOpen: false,
            userViewSelected: null,

            editingUser: {}
        }
    }

    deleteUser(user) {
        const { containerId, dispatchFetchAllUsers } = this.props;
        axios.post(`/api/container/auth/${containerId}/user/destroy`, {
            user_id: user.id,
        }, { withCredentials: true })
        .then((res) => {
            console.log(res.data)
            dispatchFetchAllUsers(containerId);
        })
        .catch((err) => {
            console.error(err);
        })
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
        const { users, schema } = this.props;
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

    createEditingUserRow(user: any) {
        const { users, schema } = this.props;
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
                            size="small"
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
        const { users, schema } = this.props;
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
                                                this.deleteUser(user);
                                                this.setState({
                                                    userMoreSelected: -1
                                                });
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
        const { users, schema } = this.props;
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
    dispatchFetchAllUsers: (containerId) => dispatch(fetchAllUsers(containerId))
})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps)
)(UserTable);