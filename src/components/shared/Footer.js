import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.webp';

const Footer = () => {
    return (
        <>
            <footer class="py-20 bg-slate-100 text-base-content">
                <div className='footer container mx-auto lg:px-10'>
                    <div>
                        <img src={logo} className="h-7 mb-3" alt="" />
                        <p>Autima Pro Industries Ltd.<br />Providing reliable parts and electronics for car since 1995</p>
                    </div>
                    <div>
                        <span class="footer-title">Services</span>
                        <Link to='/' class="link link-hover">Branding</Link>
                        <Link to='/' class="link link-hover">Design</Link>
                        <Link to='/' class="link link-hover">Marketing</Link>
                        <Link to='/' class="link link-hover">Advertisement</Link>
                    </div>
                    <div>
                        <span class="footer-title">Company</span>
                        <Link to='/' class="link link-hover">About us</Link>
                        <Link to='/' class="link link-hover">Contact</Link>
                        <Link to='/' class="link link-hover">Jobs</Link>
                        <Link to='/' class="link link-hover">Press kit</Link>
                    </div>
                    <div>
                        <span class="footer-title">Legal</span>
                        <Link to='/' class="link link-hover">Terms of use</Link>
                        <Link to='/' class="link link-hover">Privacy policy</Link>
                        <Link to='/' class="link link-hover">Cookie policy</Link>
                    </div>
                </div>
            </footer>

            <footer class="py-6 bg-slate-100 border-t border-slate-200 text-base-content">
                <div className='container footer footer-center mx-auto lg:px-10'>
                    <p>Copyright © 2022 - All right reserved by Autima</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;