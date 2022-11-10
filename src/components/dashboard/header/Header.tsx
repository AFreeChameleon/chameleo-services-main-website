import React, { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Flags from 'country-flag-icons/react/3x2';

import {
    IconButton,
    Menu,
    MenuItem,
    Popover,
    Box,
    Input
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfilePicDefault from '../../../img/profile-pic-default.png';

import classes from './Header.module.scss';

type HeaderProps = {
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
        const { langAnchorEl } = this.state;
        return (
            <Box component="div" className={classes.root} sx={{ backgroundColor: (theme) => `${theme.palette.background.default}DD` }}>
                <div className={classes.rootGrid}>
                    <SearchIcon/>
                    <Input
                        placeholder="Search..."
                        className={classes.searchInput}
                        sx={{ color: 'text.primary' }}
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
            </Box>
        )
    }
}

export default Header;