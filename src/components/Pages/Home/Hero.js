import React from 'react';
import heroImg from '../../../images/hero-img.png';

const Hero = () => {

    return (
        <div className="hero bg-slate-100" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="container mx-auto lg:px-10">
                <div className="hero-content flex-col gap-x-8 lg:flex-row-reverse">
                    <div className="lg:w-2/5 md:w-2/3 w-2/3 mx-auto">
                        <img src={heroImg} className="w-full" alt="" />
                    </div>

                    <div className='lg:w-3/5 lg:text-left md:w-2/3 text-center'>
                        <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold leading-tight">Accessories Manufacturer Japan based Company</h1>
                        <p className="py-6 font-medium text-base lg:text-xl lg:w-10/12">We are manufacturing auto parts and electronics since 1995. Autima is the brand that you can trust!</p>
                        <button className="btn btn-secondary text-white font-bold px-6">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;