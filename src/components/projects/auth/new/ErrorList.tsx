import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import errorListStyles from '../../../../styles/projects/auth/new/components/errorListStyles';

const ErrorList: FunctionComponent = () => {
    const classes = makeStyles(errorListStyles)();
    const errors: string[] = useSelector(state => state.errors);

    return (
        <div className={classes.root}>
            { errors.map((message: string, i: number) => (
                <Alert
                key={i}
                severity="error"
                className={classes.error}>
                    {message}
                </Alert>
            )) }
        </div>
    )
}


export default ErrorList;
