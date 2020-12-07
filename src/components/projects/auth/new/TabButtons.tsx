import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from '../../../../redux/projects/auth/new/tabs/actions';
import { setErrors } from '../../../../redux/projects/auth/new/errors/actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { checkUserModel } from './UserModel';
import { checkMailConfiguration } from './MailConfig';

const styles = makeStyles({
    tabButtons: {
        margin: '20px 0',
        display: 'flex',
        gridColumnGap: '8px',
        justifyContent: 'center'
    },
});

const TabButtons: FunctionComponent = () => {
    const classes = styles();
    const selectedTab = useSelector(state => state.tabs.selectedTab);
    const table = useSelector(state => state.model.table);
    const appSettings = useSelector(state => state.settings);
    const mail = useSelector(state => state.mail);
    const dispatch = useDispatch();

    const nextTab = (e) => {
        const errors = {
            model: checkUserModel(table),
            mail: checkMailConfiguration(mail)
        }
        if (
            selectedTab === 0 && 
            errors.model.length > 0
        ) {
            dispatch(setErrors(errors.model));
        } else if (
            selectedTab == 3 &&
            errors.mail.length > 0
        ) {
            dispatch(setErrors(errors.mail));
        } else {
            dispatch(setSelectedTab(selectedTab + 1));
        }
    }

    return (
        <div className={classes.tabButtons}>
            <Button
                disabled={selectedTab === 0}
                color="secondary"
                onClick={(e) => dispatch(setSelectedTab(selectedTab - 1))}
            >
                Back
            </Button>
            <Button
                variant="contained"
                color="secondary"
                disabled={selectedTab === 5}
                onClick={(e) => dispatch(setSelectedTab(selectedTab + 1))}
            >
                Next
            </Button>
        </div>
    )
}

export default TabButtons;