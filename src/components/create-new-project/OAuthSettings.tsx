import { FunctionComponent, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/create-new-project/components/oauthSettingsStyles';

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
import { OAuth } from '../../types';

type OAuthSettingsProps = {
    oauth: OAuth,
    setOAuth: (oauth: OAuth) => void,
}

const OAuthSettings: FunctionComponent<OAuthSettingsProps> = ({ oauth, setOAuth }) => {
    const classes = makeStyles(styles)();
    const [collapsed, setCollapsed] = useState({
        google: false
    })
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
                                    setOAuth({
                                        google: {
                                            ...oauth.google,
                                            clientID: e.target.value
                                        }
                                    })
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
                                    setOAuth({
                                        google: {
                                            ...oauth.google,
                                            clientSecret: e.target.value
                                        }
                                    })
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
                                    setOAuth({
                                        google: {
                                            ...oauth.google,
                                            redirectURI: e.target.value
                                        }
                                    })
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