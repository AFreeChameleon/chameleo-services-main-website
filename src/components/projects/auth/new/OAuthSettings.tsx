import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    oauthSetGoogleValue
} from '../../../../redux/projects/auth/new/oauth/actions';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../styles/projects/auth/new/components/oauthSettingsStyles';

import {
    Card,
    Collapse,
    IconButton,
    TextField
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Add as AddIcon,
    Remove as RemoveIcon
} from '@material-ui/icons';

type OAuthProps = {
    google: {
        clientID: string,
        clientSecret: string,
        redirectURI: string
    }
}

const OAuthSettings: FunctionComponent = () => {
    const classes = makeStyles(styles)();
    const [collapsed, setCollapsed] = useState({
        google: false
    });
    const oauth: OAuthProps = useSelector(state => state.oauth);
    const dispatch = useDispatch();

    console.log(oauth)
    
    return (
        <div className={classes.root}>
            <div className={classes.title}>OAuth Settings</div>
            <div className={classes.subTitle}>For third party authentication</div>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <div 
                        className={classes.listItemHeader} 
                        onClick={(e) => setCollapsed({
                            ...collapsed,
                            google: !collapsed.google
                        })}
                    >
                        <div className={classes.listItemHeaderText}>
                            Google
                        </div>
                        <div className={classes.listItemHeaderText}>
                            { collapsed.google ? 
                                <RemoveIcon color="secondary" style={{verticalAlign: 'middle'}}/> :
                                <AddIcon color="secondary" style={{verticalAlign: 'middle'}}/>
                            }
                        </div>
                    </div>
                    <Collapse in={collapsed.google}>
                        <div className={classes.listItemCollapse}>
                            <TextField
                                variant="outlined"
                                color="secondary"
                                label="Client ID"
                                className={classes.listItemCollapseTextField}
                                value={oauth.google.clientID}
                                onChange={(e) => {
                                    console.log(oauth.google.clientID)
                                    dispatch(oauthSetGoogleValue('clientID', e.target.value));
                                }}
                                fullWidth
                            />
                            <TextField
                                variant="outlined"
                                color="secondary"
                                label="Client Secret"
                                className={classes.listItemCollapseTextField}
                                value={oauth.google.clientSecret}
                                onChange={(e) => {
                                    console.log(oauth.google.clientSecret)
                                    dispatch(oauthSetGoogleValue('clientSecret', e.target.value));
                                }}
                                fullWidth
                            />
                            <TextField
                                variant="outlined"
                                color="secondary"
                                label="Redirect URI"
                                className={classes.listItemCollapseTextField}
                                value={oauth.google.redirectURI}
                                onChange={(e) => {
                                    console.log(oauth.google.redirectURI)
                                    dispatch(oauthSetGoogleValue('redirectURI', e.target.value));
                                }}
                                fullWidth
                            />
                        </div>
                    </Collapse>
                </li>
            </ul>
        </div>
    )
}

export default OAuthSettings;