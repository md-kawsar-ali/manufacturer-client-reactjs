import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="bg-slate-50">
            <div className='container mx-auto py-20 lg:px-10 flex justify-center'>
                <div className="card md:w-3/5 lg:w-2/5 max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h4 className='text-3xl font-bold text-center'>Login</h4>
                        <form>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <label className="label">
                                <Link to="/register" className="text-base link link-hover">Create New Account!</Link>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;