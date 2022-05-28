import React from 'react';
import { useQuery } from 'react-query';
import Loader from './../../shared/Loader';

const ManageOrders = () => {

    const { data: orders, isLoading } = useQuery('manageOrders', () => fetch(`https://autima-pro-manufacturer.herokuapp.com/order`, {
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
            <h1 className='text-4xl font-bold mb-7'>Manage Orders</h1>

            <div className="overflow-x-auto">
                <table className="table w-full shadow-2xl">
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Customer</th>
                            <th>Transaction ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders?.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.productName}</td>
                                <td>{order.customer}</td>
                                <td>{order.transactionId ? order.transactionId : 'Unpaid'}</td>
                                <td>{order.quantity} pcs</td>
                                <td>${order.price}</td>
                                <td>{
                                    order.paid ?
                                        <span className="font-medium text-green-700 bg-green-200 py-1 px-3 inline-block rounded-lg">Paid</span>
                                        :
                                        <span className="font-medium text-red-700 bg-red-200 py-1 px-3 inline-block rounded-lg">Unpaid</span>
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;