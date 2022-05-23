import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.webp';

const Footer = () => {
    return (
        <>
            <footer className="py-20 bg-slate-100 text-base-content">
                <div className='footer container mx-auto lg:px-10'>
                    <div>
                        <img src={logo} className="h-7 mb-3" alt="" />
                        <p>Autima Pro Industries Ltd.<br />Providing reliable parts and electronics for car since 1995</p>
                    </div>
                    <div>
                        <span className="footer-title">Services</span>
                        <Link to='/' className="link link-hover">Branding</Link>
                        <Link to='/' className="link link-hover">Design</Link>
                        <Link to='/' className="link link-hover">Marketing</Link>
                        <Link to='/' className="link link-hover">Advertisement</Link>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <Link to='/' className="link link-hover">About us</Link>
                        <Link to='/' className="link link-hover">Contact</Link>
                        <Link to='/' className="link link-hover">Jobs</Link>
                        <Link to='/' className="link link-hover">Press kit</Link>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <Link to='/' className="link link-hover">Terms of use</Link>
                        <Link to='/' className="link link-hover">Privacy policy</Link>
                        <Link to='/' className="link link-hover">Cookie policy</Link>
                    </div>
                </div>
            </footer>

            <footer className="py-6 bg-slate-100 border-t border-slate-200 text-base-content">
                <div className='container footer footer-center mx-auto lg:px-10'>
                    <p>Copyright © 2022 - All right reserved by Autima</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;