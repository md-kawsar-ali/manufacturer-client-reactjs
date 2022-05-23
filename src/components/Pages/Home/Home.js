import React from 'react';
import Hero from './Hero';
import NewCollection from './NewCollection';
import Stats from './Stats';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <>
            <Hero />
            <NewCollection />
            <Stats />
            <Testimonial />
        </>
    );
};

export default Home;