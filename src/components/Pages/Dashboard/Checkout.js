import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from './../../shared/Loader';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
    const { id } = useParams();
    const { data: order, isLoading } = useQuery(['single-order', id], () => fetch(`https://autima-pro-manufacturer.herokuapp.com/myorder/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>Checkout Now</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-8 lg:gap-10'>
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <h2 className='card-title mb-2'>{order.productName}</h2>
                        <ul className='list-none flex flex-col'>
                            <li className='font-medium flex justify-between py-2 border-t border-slate-200'>
                                <span>Quantity:</span>
                                <span>{order.quantity}</span>
                            </li>

                            <li className='font-medium flex justify-between py-2 border-t border-slate-200'>
                                <span>Total Price:</span>
                                <span>${order.price}</span>
                            </li>

                            <li className='font-medium flex justify-between py-2 border-t border-b border-slate-200'>
                                <span>Customer:</span>
                                <span>{order.customer}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <CheckoutForm order={order} />
            </div>
        </div>
    );
};

export default Checkout;