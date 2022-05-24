import React, { useState, useEffect } from 'react';
import SubHeader from '../../shared/SubHeader';
import Loader from './../../shared/Loader';
import SingleNewProduct from './../Home/SingleNewProduct';

const AllProduct = () => {
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        fetch('https://autima-pro-manufacturer.herokuapp.com/product')
            .then(res => res.json())
            .then(data => {
                setCollection(data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <SubHeader title="All Accessories" />

            <section className="py-16 md:py-20 lg:py-24 b-slate-50">
                <div className="container mx-auto px-8 lg:px-14">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12'>
                        {
                            collection?.map(item => <SingleNewProduct key={item._id} item={item} />)
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllProduct;