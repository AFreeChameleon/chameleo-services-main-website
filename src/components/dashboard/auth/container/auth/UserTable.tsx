import React from 'react';

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
    ListItemText
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreUserModal from './MoreUserModal';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: theme.typography.subtitle1.fontWeight,
        color: theme.palette.primary.contrastText
    },
    body: {
        fontSize: theme.typography.body2.fontSize
    }
}))(TableCell);

type UserTableProps = {
    classes: any;
    users: any[];
    schema: any[];
}

type UserTableState = {
    userIdsSelected: number[] | ['all'];
    userMoreSelected: number;
    userViewModalOpen: boolean;
    userViewSelected: any
}

class UserTable extends React.Component<UserTableProps, UserTableState> {
    private openUserRef: React.RefObject<any>
    constructor(props) {
        super(props);

        this.openUserRef = React.createRef();
        this.createHeaders = this.createHeaders.bind(this);

        this.state = {
            userIdsSelected: [],
            userMoreSelected: -1,

            userViewModalOpen: false,
            userViewSelected: null
        }
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
                <StyledTableCell size="small" className={classes.checkboxCol}>
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
                <StyledTableCell align="center" size="small" className={classes.moreCol}>
                </StyledTableCell>
            </TableRow>
        )
    }

    createBody() {
        const { classes, users, schema } = this.props;
        const { userIdsSelected, userMoreSelected, userViewSelected } = this.state;

        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name);
        
        return users.map((user, i) => (<TableRow key={i}>
                <StyledTableCell size="small" className={classes.checkboxCol}>
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
                <StyledTableCell align="center" size="small" className={classes.moreCol}>
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
                                                console.log('Profile')
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
        ))
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
        }
    }))
)(UserTable);