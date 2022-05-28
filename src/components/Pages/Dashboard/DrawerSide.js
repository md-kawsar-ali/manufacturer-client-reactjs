import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import auth from './../../../firebaseConfig';
import useAdmin from './../../../hooks/useAdmin';

const DrawerSide = () => {
    const [admin] = useAdmin();

    return (
        <div className="drawer-side">
            <label tabIndex="1" htmlFor="sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-slate-100 text-base-content font-medium">
                <li><Link to='/dashboard'>Overview</Link></li>

                {
                    admin ?
                        <>
                            <li><Link to='/dashboard/manage-products'>Manage Products</Link></li>
                            <li><Link to='/dashboard/manage-orders'>Manage Orders</Link></li>
                            <li><Link to='/dashboard/add-product'>Add Product</Link></li>
                            <li><Link to='/dashboard/users'>All Users</Link></li>
                        </>
                        :
                        <>
                            <li><Link to='/dashboard/my-orders'>My Orders</Link></li>
                            <li><Link to='/dashboard/add-review'>Add Review</Link></li>
                        </>
                }

                <li><Link to='/dashboard/my-profile'>My Profile</Link></li>
                <li><button className="font-medium" onClick={() => {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                }}>Log Out</button></li>
            </ul>
        </div>
    );
};

export default DrawerSide;