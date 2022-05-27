import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from './../../../firebaseConfig';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        firebaseError,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (user || gUser) {
            toast.success('You are Logged In!', {
                duration: 3000
            });

            const email = user?.user?.email || gUser?.user?.email;

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
                    navigate(from, { replace: true });
                })
                .catch(err => { console.error(err) });

        } else if (firebaseError || gError) {
            let msg;
            if (firebaseError.message.includes('not-found')) {
                msg = 'User Not Found!';
            } else if (firebaseError.message.includes('wrong-password')) {
                msg = 'Wrong Password!'
            }
            else {
                msg = 'Something Went Wrong!'
            }

            toast.error(msg, {
                duration: 3000
            });
        }
    }, [user, firebaseError, navigate, gUser, gError, from]);

    const onSubmit = async data => {
        await signInWithEmailAndPassword(data.email, data.password);
    };

    if (loading || gLoading) {
        return <Loader />;
    }

    return (
        <div className="bg-slate-50">
            <div className='container mx-auto py-20 lg:px-10 flex justify-center'>
                <div className="card md:w-3/5 lg:w-2/5 max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h4 className='text-3xl font-bold text-center'>Login</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>

                            <label className="label">
                                <Link to="/register" className="text-base link link-hover">Wanna Create Account? Register!</Link>
                            </label>
                        </form>

                        <div className="divider mt-0 mb-2">OR</div>
                        <button
                            onClick={() => signInWithGoogle()}
                            className="btn btn-md btn-outline w-full border-slate-400 mt-1">Continue with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;