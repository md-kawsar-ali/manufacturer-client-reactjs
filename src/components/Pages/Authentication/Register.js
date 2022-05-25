import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from './../../../firebaseConfig';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        firebaseError,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating] = useUpdateProfile(auth);

    useEffect(() => {
        if (user) {
            toast.success('Account Created!', {
                duration: 3000
            });

            const email = user?.user?.email;

            fetch(`https://autima-pro-manufacturer.herokuapp.com/token/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: email })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('accessToken', data.accessToken);
                    navigate('/dashboard', { replace: true });
                })
                .catch(err => console.error(err));

        }
        else if (firebaseError) {
            let msg;
            if (firebaseError.message.includes('already')) {
                msg = 'Email Already Exist!';
            } else {
                msg = 'Something Went Wrong!'
            }

            toast.error(msg, {
                duration: 3000
            });
        }
    }, [user, firebaseError, navigate]);

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };

    if (loading || updating) {
        return <Loader />;
    }

    return (
        <div className="bg-slate-50">
            <div className='container mx-auto py-20 lg:px-10 flex justify-center'>
                <div className="card md:w-3/5 lg:w-2/5 max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h4 className='text-3xl font-bold text-center'>Register</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered mb-1" />

                                <span className="text-base mt-1 text-red-500">
                                    {errors.name?.type === 'required' && 'Name is Required!'}
                                </span>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered mb-1" />

                                <span className="text-base text-red-500">
                                    {errors.email?.type === 'required' && 'Email is Required!'}
                                </span>
                                <span className="text-base text-red-500">
                                    {errors.email?.type === 'pattern' && 'Enter valid Email!'}
                                </span>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", { required: true, minLength: 6 })}
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered mb-1" />

                                <span className="text-base text-red-500">
                                    {errors.password?.type === 'required' && 'Password is Required!'}
                                </span>

                                <span className="text-base text-red-500">
                                    {errors.password?.type === 'minLength' && 'Password must be 6 or more character!'}
                                </span>
                            </div>

                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Register</button>
                            </div>

                            <label className="label">
                                <Link to="/login" className="text-base link link-hover">Have Account? Login Now!</Link>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;