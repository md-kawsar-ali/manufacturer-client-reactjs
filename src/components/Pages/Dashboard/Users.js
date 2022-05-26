import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../shared/Loader';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://autima-pro-manufacturer.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    // Make Admin
    const makeAdmin = (email) => {
        fetch(`https://autima-pro-manufacturer.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made admin!`);
                }

            })
    }


    // Delete User
    const MySwal = withReactContent(Swal);

    const deleteUser = (email) => {
        MySwal.fire({
            title: <strong>Are You Sure?</strong>,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://autima-pro-manufacturer.herokuapp.com/user/${email}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            refetch();
                            Swal.fire('Successfully Deleted!', '', 'success');
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
            <h1 className='text-4xl font-bold mb-7'>All Users</h1>

            <div className="overflow-x-auto">
                <table className="table w-full shadow-2xl">
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? 'Admin' : 'Customer'}</td>
                                <td>{
                                    user.role === 'admin' ?
                                        <button
                                            onClick={() => deleteUser(user.email)}
                                            className="btn btn-sm text-white btn-error">Delete</button>
                                        :
                                        <>
                                            <button
                                                onClick={() => makeAdmin(user.email)}
                                                className="btn btn-sm text-white btn-success">Make Admin</button>
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

export default Users;