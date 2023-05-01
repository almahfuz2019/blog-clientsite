import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import {NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Shired/Loading';
const ForgetPassword = () => {
     const [email, setEmail] = useState('');
     const auth = getAuth();
     const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth); 
      let forgotPasswordErrorMessage;
     if(error){
      forgotPasswordErrorMessage=<p className='text-red-700'>{error?.message}</p>
     }
     if (sending) {
       return <Loading/>;
     }
    return (   
   <div className="py-10 sm:py-28 bg-white ">
   <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl border-primary border border-opacity-30">
           <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage:"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"}}></div>
           <div className="w-full p-8 lg:w-1/2">
           <h1 className='text-primary font-bold text-3xl text-center
        '>Mindspace</h1>
            <div className="mt-4 flex items-center justify-between">
             <span className="border-b w-1/5 lg:w-1/4"></span>
             <a href="#" className="text-xs text-center text-gray-500 uppercase">Forgot password</a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
              <div className="mt-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
               <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" type="email" placeholder='Type your E-mail' />
              </div>
             {forgotPasswordErrorMessage}
               <div className="mt-8 mx-auto text-center w-full">
               <input type="submit" value="Submit" className='bg-primary text-white font-bold py-2 px-4 w-full rounded cursor-pointer'
           onClick={async () => {
             const success = await sendPasswordResetEmail(
               email
             );
             if (success) {
              toast.success('Please check your E-mail', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
             }
           }}
         />
         </div>
               <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
               <NavLink to="/register" className="text-xs text-gray-500 ">Don’t have an account? <span className='text-primary underline font-bold'>Sign in</span> </NavLink>
               <span className="border-b w-1/5 md:w-1/4"></span>
               </div>
                     </div>
                 </div>
             </div>
        );
};
export default ForgetPassword;