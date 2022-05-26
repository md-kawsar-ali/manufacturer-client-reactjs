import React from 'react';

const SingleProduct = ({ product }) => {
    const { img, name, price, minOrder, quantity } = product;

    return (
        <div className="card card-compact w-full bg-slate-100 shadow-slate-300 shadow-md">
            <div className='px-8 pt-8'>
                <figure className="bg-white rounded-xl">
                    <img src={img} alt={name} className="w-2/3 mx-auto" />
                </figure>
            </div>

            <div className="card-body">
                <div className="px-3 py-2">
                    <h2 className="card-title text-2xl font-bold">{name}</h2>
                    <ul className='flex flex-col gap-2 text-base list-none mt-3 mb-4'>
                        <li className='flex justify-between'>
                            <strong className='font-medium'>Price: </strong><span>${price} per pcs</span>
                        </li>
                        <li className='flex justify-between border-t border-b py-2'>
                            <strong className='font-medium'>Min Order: </strong><span>{minOrder} pcs</span>
                        </li>
                        <li className='flex justify-between'>
                            <strong className='font-medium'>Quantity: </strong><span>{quantity >= minOrder ? `${quantity} pcs` : 'Out of Stock'}</span>
                        </li>
                    </ul>

                    <p className='text-lg font-medium text-red-500'>Note: You have to order at least {minOrder} pcs</p>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;