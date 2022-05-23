import React from 'react';
import employees from '../../../images/employees.png';
import products from '../../../images/product-list.png';
import revenue from '../../../images/revenue.png';
import happiness from '../../../images/happiness.png';

const Stats = () => {
    return (
        <section className='py-24 bg-slate-100'>
            <div className="container mx-auto px-8 lg:px-14">
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12'>
                    <div className='text-center px-4'>
                        <img src={employees} alt={employees} className="mb-2 mx-auto" />
                        <span className="text-4xl font-bold block mb-2">1050</span>
                        <span className="text-2xl font-bold block uppercase">Employees</span>
                    </div>

                    <div className='text-center px-4'>
                        <img src={products} alt={products} className="mb-2 mx-auto" />
                        <span className="text-4xl font-bold block mb-2">1225</span>
                        <span className="text-2xl font-bold block uppercase">Products</span>
                    </div>

                    <div className='text-center px-4'>
                        <img src={revenue} alt={revenue} className="mb-2 mx-auto" />
                        <span className="text-4xl font-bold block mb-2">16 M</span>
                        <span className="text-2xl font-bold block uppercase">Revenue</span>
                    </div>

                    <div className='text-center px-4'>
                        <img src={happiness} alt={happiness} className="mb-2 mx-auto" />
                        <span className="text-4xl font-bold block mb-2">4800</span>
                        <span className="text-2xl font-bold block uppercase">Customer</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;