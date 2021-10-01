import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
    Modal,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Checkbox
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: theme.typography.subtitle1.fontWeight,
        color: theme.palette.primary.contrastText,
        whiteSpace: 'nowrap'
    },
    body: {
        fontSize: theme.typography.body2.fontSize,
        whiteSpace: 'nowrap'
    }
}))(TableCell);

type MoreUserModalProps = {
    classes: any;
    user: any;
    open: boolean;
    handleClose: () => void;
    schema: any[];
}

type MoreUserModalState = {

}

class MoreUserModal extends React.Component<MoreUserModalProps, MoreUserModalState> {
    constructor(props) {
        super(props);

        this.createStatsBody = this.createStatsBody.bind(this);
    }

    createHeaders() {
        const { classes, user, schema } = this.props;
        
        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name);
        
        return (
            <TableRow>
                <StyledTableCell align="left">
                    id
                </StyledTableCell>
                { filteredColumnNames.map((col, i) => (
                    <StyledTableCell align="left" key={i}>
                        {col}
                    </StyledTableCell>
                )) }
            </TableRow>
        )
    }

    createBody() {
        const { classes, user, schema } = this.props;

        const columnNames = schema.map(col => col.name);
        const emailColumn = schema.find(col => col.attributes.includes('Email') && col.attributes.includes('Username'));
        const usernameColumns = schema.filter(col => col.attributes.includes('Username'));
        const passwordColumn = schema.find(col => col.attributes.includes('Password'));
        const filteredColumnNames = columnNames.filter(c => c !== passwordColumn.name);
        
        return (<TableRow>
                <StyledTableCell align="left">
                    {user.id.toString()}
                </StyledTableCell>
                { filteredColumnNames.map((col, j) => (
                    <StyledTableCell align="left" key={j}>
                        {user[col]}
                    </StyledTableCell>
                )) }
            </TableRow>
        )
    }

    createStatsHeaders() {
        const { classes, user, schema } = this.props;

        return (
            <TableRow>
                <StyledTableCell align="left">
                    Verified
                </StyledTableCell>
                <StyledTableCell align="left">
                    Status
                </StyledTableCell>
                <StyledTableCell align="left">
                    Last device used
                </StyledTableCell>
                <StyledTableCell align="left">
                    Last logged in
                </StyledTableCell>
                <StyledTableCell align="left">
                    Last browser used
                </StyledTableCell>
                <StyledTableCell align="left">
                    Last platform used
                </StyledTableCell>
                <StyledTableCell align="left">
                    Last OS used
                </StyledTableCell>
            </TableRow>
        )
    }

    createStatsBody() {
        const { classes, user, schema } = this.props;

        return (
            <TableRow>
                <StyledTableCell align="left">
                    {user.verified.toString()}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {user.status}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {user.device}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {(new Date(user.loggedInDate)).toLocaleTimeString()} {(new Date(user.loggedInDate)).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {user.browser}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {user.platform}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {user.os}
                </StyledTableCell>
            </TableRow>
        )
    }

    render() {
        const { classes, user, open, handleClose } = this.props;

        return user && (
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className={classes.root}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className={classes.header}
                    >
                        More information
                    </Typography>
                    <div className={classes.body}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                        >
                            User Model
                        </Typography>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableHead>
                                    {this.createHeaders()}
                                </TableHead>
                                <TableBody>
                                    {this.createBody()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                        >
                            User Statistics
                        </Typography>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableHead>
                                    {this.createStatsHeaders()}
                                </TableHead>
                                <TableBody>
                                    {this.createStatsBody()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme) => ({
        modal: {
            display: 'grid',
            placeItems: 'center'
        },
        root: {
            minWidth: '500px',
            minHeight: '300px',
            maxWidth: '1366px',
            maxHeight: '980px',
            backgroundColor: theme.palette.background.paper
        },
        header: {
            padding: '20px 30px',
            borderBottom: `1px solid ${theme.palette.grey['50']}`
        },
        body: {
            padding: '20px 30px'
        },
        tableContainer: {
            padding: '10px 0 30px 0'
        }
    }))
)(MoreUserModal);