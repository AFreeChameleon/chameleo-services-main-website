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
    Paper
} from '@material-ui/core';

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
    userSummary: any[];
}

class UserTable extends React.Component<UserTableProps, UserTableState> {
    constructor(props) {
        super(props);

        this.createHeaders = this.createHeaders.bind(this);

        this.state = {
            userSummary: []
        }
    }

    createHeaders() {
        const { classes, users, schema } = this.props;
        
        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name)
        return (
            <TableRow>
                <StyledTableCell size="small" className={classes.checkboxCol}>
                    <Checkbox
                        className={classes.whiteCheckbox}
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
            </TableRow>
        )
    }

    createBody() {
        const { classes, users, schema } = this.props;
        
        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name)

        return users.map((user, i) => (
            <TableRow key={i}>
                <StyledTableCell size="small" className={classes.checkboxCol}>
                    <Checkbox
                        className={classes.whiteCheckbox}
                    />
                </StyledTableCell>

            </TableRow>
        ))
    }

    render() {
        const { classes, users } = this.props;
        const { userSummary } = this.state;

        console.log(users)
        return (
            <div className={classes.root}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {this.createHeaders()}
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell size="small">
                                    <Checkbox
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    ben.evans@chamel.io
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Ben Evans
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Benamon
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    True
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    26/06/2020
                                </StyledTableCell>
                            </TableRow>
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

               /* <div className={classes.headers}>
                    <Checkbox
                        className={classes.whiteCheckbox}
                    />
                    <Typography 
                        variant="subtitle1"
                        className={`${classes.header} ${classes.flexGrow}`}
                    >
                        Email
                    </Typography>
                    <Typography 
                        variant="subtitle1"
                        className={classes.header}
                    >
                        Name
                    </Typography>
                    <Typography 
                        variant="subtitle1"
                        className={classes.header}
                    >
                        Verified
                    </Typography>
                    <Typography 
                        variant="subtitle1"
                        className={classes.header}
                    >
                        Username
                    </Typography>
                    <Typography 
                        variant="subtitle1"
                        className={classes.header}
                    >
                        Account Created
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Checkbox
                        color="default"
                    />
                    <Typography
                        className={`${classes.flexGrow} ${classes.cell}`}
                    >
                        ben.evans@chameleo.dev
                    </Typography>
                    <Typography
                        className={classes.cell}
                    >
                        Ben Evans
                    </Typography>
                    <Typography
                        className={classes.cell}
                    >
                        Ben Evans
                    </Typography>
                </div> */