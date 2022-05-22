import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const navigation = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
    </>;

    return (
        <header className='bg-base-100 z-[9999]'>
            <div className='container mx-auto lg:px-16 py-2'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {navigation}
                            </ul>
                        </div>
                        <Link to="/" className="normal-case text-xl font-bold ml-3">daisyUI</Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {navigation}
                        </ul>
                    </div>

                    <div className="navbar-end">
                        <Link to="/" className="btn text-white px-8">Login</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;