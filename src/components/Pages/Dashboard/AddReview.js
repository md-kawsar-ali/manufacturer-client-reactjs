import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebaseConfig';
import Loader from '../../shared/Loader';
import { toast } from 'react-hot-toast';

const AddReview = () => {
    const [user, loading] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { comment: '', ratings: '5' } });

    const onSubmit = data => {
        setIsLoading(true);
        const review = {
            name: user?.displayName,
            email: user?.email,
            ratings: data.ratings,
            comment: data.comment
        }

        fetch('https://autima-pro-manufacturer.herokuapp.com/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    reset({ comment: '', ratings: '5' });
                    toast.success('Review Added! Thanks!')
                } else {
                    toast.error('Failed to Add Review!')
                }

                setIsLoading(false);
            })
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>Add Review</h1>

            <div className="card w-full md:w-7/12 shadow-md bg-base-100">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="text-base font-medium">Select Ratings</span>
                            </label>

                            <div className="rating">
                                <input
                                    {...register("ratings")}
                                    type="radio"
                                    value="1"
                                    className="mask mask-star-2 bg-primary" />
                                <input
                                    {...register("ratings")}
                                    type="radio"
                                    value="2"
                                    className="mask mask-star-2 bg-primary" />
                                <input
                                    {...register("ratings")}
                                    type="radio"
                                    value="3"
                                    className="mask mask-star-2 bg-primary" />
                                <input
                                    {...register("ratings")}
                                    type="radio"
                                    value="4"
                                    className="mask mask-star-2 bg-primary" />
                                <input
                                    {...register("ratings")}
                                    type="radio"
                                    value="5"
                                    className="mask mask-star-2 bg-primary" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="text-base font-medium">Your Comment</span>
                            </label>
                            <textarea
                                {...register("comment", {
                                    required: true,
                                    maxLength: 255,
                                    minLength: 100
                                })}
                                type="text"
                                rows="5"
                                placeholder="Write your comment..."
                                className="textarea textarea-bordered text-base mb-1" />

                            <span className="text-base text-red-500">
                                {errors.comment?.type === 'required' && 'Comment is Required!'}
                            </span>

                            <span className="text-base text-red-500">
                                {errors.comment?.type === 'minLength' && 'Comment must be 100 to 255 Characters'}
                            </span>

                            <span className="text-base text-red-500">
                                {errors.comment?.type === 'maxLength' && 'Comment must be 100 to 255 Characters'}
                            </span>
                        </div>

                        <div className="form-control mt-6">
                            <button type='submit' className={`btn btn-primary ${isLoading && 'loading'}`} disabled={isLoading}>Add Review</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;