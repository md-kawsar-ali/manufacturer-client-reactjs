import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.webp';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebaseConfig';

const Header = () => {
    const [user] = useAuthState(auth);
    const pathname = useLocation().pathname;

    const navigation = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blog">Blog</Link></li>
    </>;

    return (
        <header className='bg-base-100 z-[9999]'>
            <div className='container mx-auto lg:px-10 py-2'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-medium uppercase text-secondary">
                                {navigation}
                            </ul>
                        </div>
                        <Link to="/" className="ml-3">
                            <img src={logo} style={{ maxHeight: '25px' }} alt={'Autima Pro'} />
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu font-medium uppercase text-secondary menu-horizontal p-0">
                            {navigation}
                        </ul>
                    </div>

                    <div className="navbar-end">
                        {
                            user ?
                                <Link to="/dashboard" className="btn text-white px-8 hidden lg:inline-flex">Dashboard</Link>
                                :
                                <Link to="/login" className="btn text-white px-8">Login</Link>
                        }
                        {
                            user && pathname.includes('dashboard') && <label tabIndex="1" htmlFor="sidebar" className="ml-2 btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        }
                        {
                            user && !pathname.includes('dashboard') &&
                            <Link to='dashboard' className="btn btn-ghost bg-slate-100 hover:bg-primary btn-md ml-2 lg:hidden">
                                Dashboard
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;