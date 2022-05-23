import React from 'react';

const SingleNewProduct = ({ item }) => {
    const { img, name, price, quantity, minOrder } = item;
    return (
        <div className="card card-compact w-full bg-slate-100 shadow-slate-300 shadow-md">
            <div className='px-8 pt-8'>
                <figure className="bg-white rounded-xl">
                    <img src={img} alt={name} className="w-2/3 mx-auto" />
                </figure>
            </div>

            <div className="card-body">
                <div className="px-3 py-2">
                    <h2 className="card-title font-bold">{name}</h2>
                    <ul className='flex flex-col gap-1 text-base list-none mb-4'>
                        <li className='flex justify-between'>
                            <strong className='font-medium'>Price: </strong><span>${price} per pcs</span>
                        </li>
                        <li className='flex justify-between'>
                            <strong className='font-medium'>Min Order: </strong><span>{minOrder} pcs</span>
                        </li>
                        <li className='flex justify-between'>
                            <strong className='font-medium'>Quantity: </strong><span>{quantity} pcs</span>
                        </li>
                    </ul>

                    <div className="card-actions justify-start">
                        <button className="btn btn-sm btn-primary">Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNewProduct;