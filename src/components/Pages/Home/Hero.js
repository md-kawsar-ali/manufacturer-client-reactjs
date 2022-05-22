import React from 'react';
const Img = `https://api.lorem.space/image/fashion?w=1000&h=800`;

const Hero = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${Img})` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content container mx-auto lg:px-16">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-slate-100">Hello there</h1>
                    <p className="mb-5 text-slate-200">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary bg-slate-100 border-slate-100">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;