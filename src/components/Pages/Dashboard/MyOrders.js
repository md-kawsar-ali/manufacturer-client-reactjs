import React from 'react';

const MyOrders = () => {
    const myOrders = [
        {
            "_id": 1,
            "name": "Silver White Outter Pro",
            "quantity": 12,
            "price": 3600,
            "email": "facebookerjordan@gmail.com",
            "paid": true
        },
        {
            "_id": 2,
            "name": "Silver White Outter Pro",
            "quantity": 15,
            "price": 4000,
            "email": "facebookerjordan@gmail.com",
            "paid": true
        },
        {
            "_id": 3,
            "name": "White Outter Disk",
            "quantity": 12,
            "price": 3400,
            "email": "facebookerjordan@gmail.com",
            "paid": false
        },
        {
            "_id": 4,
            "name": "Heavy Tier 3DD",
            "quantity": 18,
            "price": 3900,
            "email": "facebookerjordan@gmail.com",
            "paid": false
        },
        {
            "_id": 5,
            "name": "White Outter Disk",
            "quantity": 16,
            "price": 4200,
            "email": "facebookerjordan@gmail.com",
            "paid": true
        }
    ]

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>My Orders</h1>

            <div className="overflow-x-auto">
                <table className="table w-full shadow-2xl">
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myOrders?.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.name}</td>
                                <td>{order.quantity} pcs</td>
                                <td>${order.price}</td>
                                <td>{
                                    order.paid ?
                                        <span className="font-medium text-green-700 bg-green-200 py-1 px-3 inline-block rounded-lg">Paid</span>
                                        :
                                        <>
                                            <button className="btn btn-sm text-white btn-error mr-1">Cancel</button> <button className="btn btn-sm text-white btn-success">Pay Now</button>
                                        </>
                                }</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;