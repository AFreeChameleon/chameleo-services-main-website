import React, { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Flags from 'country-flag-icons/react/3x2';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ProfilePicDefault from '../../../img/profile-pic-default.png';

type HeaderProps = {
    classes: any;
}

type HeaderState = {
    langAnchorEl: null | any;
}

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props) {
        super(props);
        this.state = {
            langAnchorEl: null
        }

        this.openLangDropdown = this.openLangDropdown.bind(this);
        this.closeLangDropdown = this.closeLangDropdown.bind(this);
    }

    openLangDropdown(e) {
        this.setState({
            langAnchorEl: e.currentTarget
        });
    }
    closeLangDropdown(e) {
        this.setState({
            langAnchorEl: null
        });
    }

    render() {
        const { classes } = this.props;
        const { langAnchorEl } = this.state;
        return (
            <>
                <div className={classes.root}>
                    <div className={classes.rootGrid}>
                        <SearchIcon/>
                        <input
                            placeholder="Search..."
                            className={classes.searchInput}
                        />
                        <IconButton className={classes.flagButton} onClick={this.openLangDropdown}>
                            <Flags.GB/>
                        </IconButton>
                        <Menu
                            anchorEl={langAnchorEl}
                            keepMounted
                            open={Boolean(langAnchorEl)}
                            onClose={this.closeLangDropdown}
                        >
                            <MenuItem onClick={this.closeLangDropdown}>Profile</MenuItem>
                            <MenuItem onClick={this.closeLangDropdown}>My account</MenuItem>
                            <MenuItem onClick={this.closeLangDropdown}>Logout</MenuItem>
                        </Menu>
                        <IconButton>
                            <NotificationsIcon/>
                        </IconButton>
                        <IconButton>
                            <Image
                                src={ProfilePicDefault}
                                width={26}
                                height={26}
                                alt="Profile picture"
                                layout="fixed"
                            />
                        </IconButton>
                    </div>
                </div>
            </>
        )
    }
}

const styles = withStyles((theme) => ({
    headerPlaceholder: {
        height: '90px'
    },
    root: {
        width: 'calc(100vw - 280px)',
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        background: `${theme.palette.background.default}DD`,
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)'
    },
    rootGrid: {
        display: 'grid',
        gridTemplateColumns: '20px auto 50px 50px 50px',
        alignItems: 'center',
        columnGap: '10px',
        width: '80vw'
    },
    searchInput: {
        fontSize: '16px',
        fontWeight: 700,
        border: 'none',
        outline: 'none',
        color: theme.palette.text.primary,
        padding: '10px 0',
        marginLeft: '10px',
        background: 'transparent'
    },
    flagButton: {
        height: '50px',
        width: '100%'
    }
}));

export default styles(Header);