import React from 'react';
import SubHeader from './../../shared/SubHeader';
import SingleProduct from './SingleProduct';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loader from './../../shared/Loader';
import OrderForm from './OrderForm';

const Product = () => {
    const { id } = useParams();
    const { data: product, isLoading, refetch } = useQuery(["product", id], () => fetch(`https://autima-pro-manufacturer.herokuapp.com/product/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <SubHeader title="Purchase Product" />

            <section className="py-16 md:py-20 lg:py-24 b-slate-50">
                <div className="container mx-auto px-8 lg:px-48">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12'>
                        <SingleProduct product={product} refetch={refetch} />

                        <OrderForm product={product} refetch={refetch} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Product;