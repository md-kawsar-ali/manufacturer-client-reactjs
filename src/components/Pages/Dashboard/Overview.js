import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebaseConfig';
import Loader from '../../shared/Loader';

const Overview = () => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-7'>Welcome to Dashboard</h1>
            <p className='text-base font-medium mb-1'>Hello {user?.displayName},</p>
            <p className='text-base font-medium mb-1'>Welcome to our minimal manufacturing dashboard! You can manage everything from here! We really care about you. Please, send us your feedback if you face any issue to use our dashboard! We are always happy to hear you!</p>
            <p className='text-base font-medium'>- Autima Pro</p>
        </div>
    );
};

export default Overview;