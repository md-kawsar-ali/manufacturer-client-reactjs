import React, { useState, useEffect } from 'react';
import Loader from '../../shared/Loader';
import SingleNewProduct from './SingleNewProduct';
import Title from './Title';

const NewCollection = () => {
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        fetch('https://autima-pro-manufacturer.herokuapp.com/product?size=3')
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
        <section className='py-24'>
            <div className="container mx-auto px-8 lg:px-14">
                <Title title='New Collection' />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12'>
                    {
                        collection?.map(item => <SingleNewProduct key={item._id} item={item} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default NewCollection;