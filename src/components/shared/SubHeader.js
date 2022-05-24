import React from 'react';

const SubHeader = ({ title }) => {
    return (
        <section className='py-24 md:py-28 lg:py-32 bg-slate-100'>
            <div className="container mx-auto lg:px-10">
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase'>{title}</h1>
            </div>
        </section>
    );
};

export default SubHeader;