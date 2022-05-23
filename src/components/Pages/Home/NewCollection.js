import React from 'react';
import SingleNewProduct from './SingleNewProduct';
import Title from './Title';

const NewCollection = () => {

    const collection = [
        {
            '_id': 1,
            'img': 'https://htmldemo.net/autima/autima/assets/img/product/product10.jpg',
            'name': 'Accusantium Heavy Tier',
            'price': 320,
            'quantity': 1020,
            'minOrder': 12,
        },
        {
            '_id': 2,
            'img': 'https://htmldemo.net/autima/autima/assets/img/product/product4.jpg',
            'name': 'Alumunium Tier Disc D33',
            'price': 420,
            'quantity': 1050,
            'minOrder': 12,
        },
        {
            '_id': 3,
            'img': 'https://htmldemo.net/autima/autima/assets/img/product/product9.jpg',
            'name': 'Silver White Outter Pro',
            'price': 350,
            'quantity': 720,
            'minOrder': 12,
        }
    ]

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