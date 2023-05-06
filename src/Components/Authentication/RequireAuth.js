import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shired/Loading';
const RequireAuth = ({children}) => {
     const location=useLocation();
     const [user, loading, error] = useAuthState(auth);
     if(!loading && !user){
          return <Navigate to="/login" state={{ from: location }} replace/>
     }
     if(loading){
          return <Loading/>
     }
     return children;
};
export default RequireAuth;