import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ifAuth from '../../hoc/ifAuth';
import LeftSidebar from '../../components/dashboard/left_sidebar/LeftSidebar';
import DashboardMain from '../../components/dashboard/main/DashboardMain';
import RightSidebar from '../../components/dashboard/right_sidebar/RightSidebar';
import Header from '../../components/dashboard/header/Header';

import classes from './Dashboard.module.scss';


function Dashboard (props) {
    const [containers, setContainers] = useState([]);
    useEffect(() => {
        axios.get('/api/container/all')
        .then((res) => {
            setContainers(res.data.containers);
        }).catch((err) => {
            console.error(err);
        })
    }, []);

    return (
        <Provider store={store}>
            <div className={classes.root}>
                <LeftSidebar selectedTab="dashboard" />
                <div>
                    <Header/>
                    <DashboardMain containers={containers}/>
                </div>
            </div>
        </Provider>
    )
}

const AuthenticatedDashboard = ifAuth(Dashboard as any);
export default AuthenticatedDashboard;