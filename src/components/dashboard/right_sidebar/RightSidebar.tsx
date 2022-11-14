import React from 'react';
import { DatabaseIcon, AuthIcon, SettingsIcon } from '../../Icons';
import { 
    FormControl, 
    Select, 
    MenuItem 
} from '@mui/material';

import classes from './RightSidebar.module.scss';

type RightSidebarState = {
    selectedTab: 'authentication' | 'database';
}

class RightSidebar extends React.Component<any, RightSidebarState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'database'
        }
    }

    render() {
        const { selectedTab } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.iconRow}>
                    <div 
                        className={`${classes.icon} ${selectedTab === 'database' ? classes.selectedIcon : ''}`}
                        onClick={(e) => this.setState({ selectedTab: 'database' })}
                    >
                        <DatabaseIcon/>
                    </div>
                    <div 
                        className={`${classes.icon} ${selectedTab === 'authentication' ? classes.selectedIcon : ''}`}
                        onClick={(e) => this.setState({ selectedTab: 'authentication' })}
                    >
                        <AuthIcon/>
                    </div>
                </div>
                <div className={classes.containers}>
                    <div className={classes.containersHeader}>
                        Containers
                    </div>
                    <div className={classes.containerList}>
                        <div className={classes.containerItem}>
                            <div className={classes.containerItemHeader}>
                                <div className={classes.containerItemID}>
                                    elpu6t0mzofjb9l6k8or
                                </div>
                                <div className={classes.miniIcon}>
                                    <SettingsIcon/>
                                </div>
                            </div>
                            <div className={classes.containerItemStatus}>
                                Status: <span className={classes.stopped}>Stopped</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.containerStats}>
                    <div className={classes.containerStatsHeader}>Container Statistics</div>
                    <div className={classes.containerStatsSelect}>
                        <Select
                            value={'elpu6t0mzofjb9l6k8or'}
                            className={classes.select}
                            fullWidth
                        >
                            <MenuItem value={'elpu6t0mzofjb9l6k8or'}>elpu6t0mzofjb9l6k8or</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}

export default RightSidebar;