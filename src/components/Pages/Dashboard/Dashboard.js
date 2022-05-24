import React from 'react';
import { Outlet } from 'react-router-dom';
import DrawerSide from './DrawerSide';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile bg-slate-50">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-8 lg:p-12">
                <Outlet />
            </div>
            <DrawerSide />
        </div>
    );
};

export default Dashboard;