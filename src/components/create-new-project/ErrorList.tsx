import { FunctionComponent, useEffect } from 'react';
import { Error } from '../../types';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import errorListStyles from '../../styles/create-new-project/components/errorListStyles';

type ErrorListProps = {
    errors: string[];
}

const ErrorList: FunctionComponent<ErrorListProps> = ({ errors }) => {
    const classes = makeStyles(errorListStyles)();
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
