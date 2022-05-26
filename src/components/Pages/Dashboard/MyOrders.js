import React from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebaseConfig';
import Loader from './../../shared/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [user, loading] = useAuthState(auth);

    const { data: orders, isLoading, refetch } = useQuery('myOrders', () => fetch(`https://autima-pro-manufacturer.herokuapp.com/order/${user?.email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    // Cancel Order
    const MySwal = withReactContent(Swal);

    const cancelOrder = (id) => {
        const email = user?.email;

        MySwal.fire({
            title: <strong>Are You Sure?</strong>,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://autima-pro-manufacturer.herokuapp.com/order/${email}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ id })

                }).then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            refetch();
                            Swal.fire('Order Cancelled!', '', 'success');
                        } else {
                            Swal.fire('Failed to Cancel!', '', 'error');
                        }
                    })
            }
        })
    }

    if (loading || isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>My Orders</h1>

            <div className="overflow-x-auto">
                <table className="table w-full shadow-2xl">
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Transaction ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders?.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.productName}</td>
                                <td>{order.transactionId ? order.transactionId : 'Not Paid'}</td>
                                <td>{order.quantity} pcs</td>
                                <td>${order.price}</td>
                                <td>{
                                    order.paid ?
                                        <span className="font-medium text-green-700 bg-green-200 py-1 px-3 inline-block rounded-lg">Paid</span>
                                        :
                                        <>
                                            <button onClick={() => cancelOrder(order._id)} className="btn btn-sm text-white btn-error mr-1">Cancel</button>

                                            <Link to={`/dashboard/checkout/${order._id}`} className="btn btn-sm text-white btn-success">Pay Now</Link>
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