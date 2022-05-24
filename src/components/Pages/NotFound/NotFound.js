import React from 'react';
import notFountImg from '../../../images/not-found.png';

const NotFound = () => {
    return (
        <section className='bg-slate-200'>
            <div className="h-screen container flex items-center justify-center mx-auto px-10">
                <img src={notFountImg} className="max-w-lg mx-auto" alt="Not Found 404!" />
            </div>
        </section>
    );
};

export default NotFound;