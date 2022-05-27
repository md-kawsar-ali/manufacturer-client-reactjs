import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebaseConfig';
import Loader from './../../shared/Loader';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ product, refetch }) => {
    const { _id, name, quantity, minOrder, price } = product;
    const [orderLoading, setOrderLoading] = useState(false);
    const [user, loading] = useAuthState(auth);
    const { displayName, email } = user;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    // Handle Total Price
    const pickedQuantity = watch('quantity');
    useEffect(() => {
        (async () => {
            if (pickedQuantity && price) {
                const total = parseInt(pickedQuantity) * parseFloat(price);
                setTotalPrice(total);
            }
        })();
    }, [pickedQuantity, price]);

    const onSubmit = async data => {
        setOrderLoading(true);

        const order = {
            productId: _id,
            productName: name,
            quantity: data.quantity,
            price: totalPrice,
            customer: data.name,
            email: data.email,
            address: data.address
        }

        fetch('https://autima-pro-manufacturer.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    navigate('/dashboard/my-orders');
                    toast.success('Order Placed! Please, Make Payment!');
                    refetch();
                } else {
                    toast.error('Failded to Order!');
                }
                setOrderLoading(false);
            })
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="card shadow-xl bg-base-100 border borde-base-200">
            <div className="card-body">
                <h4 className='text-2xl font-bold text-center uppercase'>Place the Order</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            {...register("name")}
                            defaultValue={displayName}
                            type="text"
                            className="input input-bordered bg-slate-100 mb-1" readOnly />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            defaultValue={email}
                            className="input input-bordered bg-slate-100 mb-1" readOnly />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>
                        <input
                            {...register("quantity", { required: true, min: minOrder, max: quantity })}
                            type="number"
                            defaultValue={minOrder}
                            className="input input-bordered mb-1" />

                        <span className="text-base text-red-500">
                            {errors.quantity?.type === 'required' && `Quantity is Required!!!`}
                        </span>

                        <span className="text-base text-red-500">
                            {errors.quantity?.type === 'max' && `You can order maximum ${quantity} pcs`}
                        </span>

                        <span className="text-base text-red-500">
                            {errors.quantity?.type === 'min' && `You have to order minimum ${minOrder} pcs`}
                        </span>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            {...register("pricing")}
                            type="text"
                            value={`$${totalPrice}`}
                            className="input input-bordered mb-1 bg-slate-100" readOnly />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            {...register("address", { required: true })}
                            type="text"
                            placeholder='Full Address'
                            className="input input-bordered mb-1" />

                        <span className="text-base text-red-500">
                            {errors.address?.type === 'required' && `Address is Required!!!`}
                        </span>
                    </div>

                    <div className="form-control mt-6">
                        <button type='submit' className={`btn btn-primary uppercase ${orderLoading && 'loading'}`} disabled={orderLoading}>Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;