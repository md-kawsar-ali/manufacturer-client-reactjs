import React from 'react';
import Loader from './../../shared/Loader';
import useAdmin from './../../../hooks/useAdmin';
import NotFoundImg from '../../../images/not-found.png';

const RequireCustomer = ({ children }) => {
    const [admin, adminLoading] = useAdmin();

    if (adminLoading) {
        return <Loader />;
    }

    if (admin) {
        return (
            <div className='py-12 lg:h-full flex items-center justify-center'>
                <img src={NotFoundImg} className='px-10 lg:px-0 max-w-md mx-auto' alt="Page Not Found" />
            </div>
        )
    }

    return children;
};

export default RequireCustomer;