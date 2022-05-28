import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const imageStorageKey = 'da7eb1047ad6681a62292d3b5e87a532';

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { name: '', price: '', minOrder: '', quantity: '', img: null } });

    const onSubmit = data => {
        setIsLoading(true);

        // Image upload
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        img,
                        name: data.name,
                        price: parseFloat(data.price),
                        minOrder: parseInt(data.minOrder),
                        quantity: parseInt(data.quantity)
                    }

                    // Add to Database
                    fetch('https://autima-pro-manufacturer.herokuapp.com/product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Product added successfully')
                                reset({ name: '', price: '', minOrder: '', quantity: '', img: null });
                            }
                            else {
                                toast.error('Failed to add the Product');
                            }
                        })
                }
                setIsLoading(false);
            });
    }


    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>Add Product</h1>

            <div className="card w-full md:w-8/12 shadow-md bg-base-100">
                <div className="card-body">
                    <form className='grid grid-cols-1 lg:grid-cols-2 gap-x-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="input input-bordered w-full"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Product Name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="text-base text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price ($)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Price Per Piece"
                                className="input input-bordered w-full"
                                {...register("price", {
                                    required: {
                                        value: true,
                                        message: 'Product Price is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.price?.type === 'required' && <span className="text-base text-red-500">{errors.price.message}</span>}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Min Order Quantity</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Min Order Quantity"
                                className="input input-bordered w-full"
                                {...register("minOrder", {
                                    required: {
                                        value: true,
                                        message: 'Min Order Quantity is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.minOrder?.type === 'required' && <span className="text-base text-red-500">{errors.minOrder.message}</span>}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="input input-bordered w-full"
                                {...register("quantity", {
                                    required: {
                                        value: true,
                                        message: 'Quantity is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.quantity?.type === 'required' && <span className="text-base text-red-500">{errors.quantity.message}</span>}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input
                                type="file"
                                className="input input-bordered pl-1 py-1 w-full file:bg-primary file:border-none file:rounded-md file:h-full file:px-5 file:mr-3"
                                {...register("img", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.img?.type === 'required' && <span className="text-base text-red-500">{errors.img.message}</span>}
                            </label>
                        </div>

                        <div className="form-control mt-6 md:mt-9">
                            <button type='submit' className={`btn btn-primary ${isLoading && 'loading'}`} disabled={isLoading}>Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;