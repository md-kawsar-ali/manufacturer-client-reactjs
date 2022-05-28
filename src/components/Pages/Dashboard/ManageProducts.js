import React from 'react';
import { useQuery } from 'react-query';
import Loader from './../../shared/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ManageProducts = () => {

    const { data: products, isLoading, refetch } = useQuery('manageProducts', () => fetch(`https://autima-pro-manufacturer.herokuapp.com/product/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    // Cancel product
    const MySwal = withReactContent(Swal);

    const deleteProduct = (id) => {

        MySwal.fire({
            title: <strong>Are You Sure?</strong>,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://autima-pro-manufacturer.herokuapp.com/product/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ id })

                }).then(res => res.json())
                    .then(data => {
                        if (data.deletedCount === 1) {
                            refetch();
                            Swal.fire('Product Deleted!', '', 'success');
                        } else {
                            Swal.fire('Failed to Delete!', '', 'error');
                        }
                    })
            }
        })
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>Manage Products</h1>

            <div className="overflow-x-auto">
                <table className="table w-full shadow-2xl">
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Min Order</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((product, index) => <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.quantity} pcs</td>
                                <td>${product.price}</td>
                                <td>{product.minOrder}</td>
                                <td>
                                    <button onClick={() => deleteProduct(product._id)} className="btn btn-sm text-white btn-error mr-1">Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;