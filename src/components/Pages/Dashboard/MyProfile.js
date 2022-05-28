import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebaseConfig';
import Loader from './../../shared/Loader';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

const MyProfile = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [user, loading] = useAuthState(auth);

    const url = `https://autima-pro-manufacturer.herokuapp.com/user/${user?.email}`;
    const { data: userInfo, isLoading, refetch } = useQuery('userInfo', () => fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Replace Default value with existing data
    useEffect(() => {
        if (userInfo) {
            reset({ phone: userInfo?.phone, linkedin: userInfo?.linkedin, address: userInfo?.address, education: userInfo?.education });
        }
    }, [userInfo, reset]);


    // Update Profile
    const onSubmit = data => {
        setBtnLoading(true);

        const userProfile = {
            phone: data.phone,
            linkedin: data.linkedin,
            address: data.address,
            education: data.education
        }

        fetch(`https://autima-pro-manufacturer.herokuapp.com/user/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(userProfile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1 || data.upsertedCount === 1) {
                    refetch();
                    toast.success('Saved Changes!')
                } else {
                    toast.error('Failed to Change!')
                }
                setBtnLoading(false);
            })
    }

    if (loading || isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>My Profile</h1>

            <div className="card w-full md:w-8/12 shadow-md bg-base-100">
                <div className="card-body">
                    <form className='grid grid-cols-1 lg:grid-cols-2 gap-x-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full disabled:bg-base-100"
                                value={user?.displayName}
                                title="You can't change Name"
                                disabled
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full disabled:bg-base-100"
                                value={user?.email}
                                title="You can't change Email"
                                disabled
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="+8801555555555"
                                className="input input-bordered w-full"
                                {...register("phone")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">LinkedIn Profile</span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://www.linkedin.com/in/mdkawsarali"
                                className="input input-bordered w-full"
                                {...register("linkedin", {
                                    pattern: /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm
                                })}
                            />
                            <span className="text-base text-red-500">
                                {errors.linkedin?.type === 'pattern' && 'Invalid LinkedIn Profile!'}
                            </span>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder='Address'
                                {...register("address")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder='Education'
                                {...register("education")}
                            />
                        </div>

                        <div className="form-control mt-6 md:mt-9">
                            <button type='submit' className={`btn btn-primary ${btnLoading && 'loading'}`} disabled={btnLoading}>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;