import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, useLocation } from 'react-router-dom';
import auth from './../../../firebaseConfig';
import Loader from './../../shared/Loader';
import useAdmin from './../../../hooks/useAdmin';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin();

    if (loading || adminLoading) {
        return <Loader />;
    }

    if (!user || !admin) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
};

export default RequireAdmin;