import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../firebaseConfig';

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const email = user?.email;

        if (!email) return;

        fetch(`https://autima-pro-manufacturer.herokuapp.com/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
                setAdminLoading(false);
            })
    }, [user]);

    return [admin, adminLoading];
};

export default useAdmin;