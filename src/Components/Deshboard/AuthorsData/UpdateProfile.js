import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useAuthState, useSendPasswordResetEmail,  useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shired/Loading';
import { toast } from 'react-toastify';
const UpdateProfile = () => {
     const [user, loading, error] = useAuthState(auth);
     const [email, setEmail] = useState(user?.email);
     const [displayName, setDisplayName] = useState(user?.displayName);
     const [photoURL, setPhotoURL] = useState(user?.photoURL);
     const [updateProfile, updating, profileerror] = useUpdateProfile(auth);
     const [sendPasswordResetEmail, sending, error1] = useSendPasswordResetEmail(
      auth
    );
  const imageHostKey = "887fe618a11124584e3e5d5893d310bc";
  const firstImageUpload = (event) => {
    const imageurl = event.target.files[0];
    if (event.target.files[0].size > 262144) {
      alert("Your file size is greater than 250KB");
      event.target.value = "";
    }
    const formData = new FormData();
    formData.set("image", imageurl);
    axios
      .post(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, formData)
      .then((res) => {
		setPhotoURL(res.data.data.display_url);
      })
      .catch((error) => {});
  };
  if (profileerror) {
     return (
       <div>
         <p>Error: {profileerror?.message}</p>
       </div>
     );
   }
  if (error ) {
     return (
       <div>
         <p>Error: {error?.message}</p>
       </div>
     );
   }
  if (error1) {
     return (
       <div>
         <p>Error: {error1?.message}</p>
       </div>
     );
   }
  if (updating || loading || sending) {
     return <Loading/>;
   }
   const actionCodeSettings = {
    url: 'http://localhost:3000/login',
  };
     return (
          <div>
            <section className="text-gray-600 body-font relative ">
          <div className="container px-5 sm:py-24 mx-auto flex sm:flex-nowrap flex-wrap ">
            <div className="border-primary border-2 md:w-1/2 bg-white flex flex-col md:mx-auto w-full md:py-8 mt-8 md:mt-0  rounded-md p-5">
              <h2
                className="text-gray-900 text-lg mb-1 
     title-font font-semibold"
              >
                Update firebase data
              </h2>
              <div className="relative mb-4">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  User name
                </label>
                <input
                  type="displayName"
                  placeholder='displayName'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3"
                />
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Profile picture
                </label>
                  <input
                    type="file"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                    onChange={firstImageUpload}
                  />
              </div>
              <img className='mx-auto h-20 w-20 border border-primary p-0.5 rounded-md mb-3' src={user?.photoURL}  alt="" />
              <button
              className='btn-primary rounded-md text-white py-1'
        onClick={async () => {
          const success = await updateProfile({displayName,  photoURL});
          if (success) {
               toast.success("Updated profile and user name", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                  });
     
          }
        }}
      >
        Update name and profile
      </button>
              <div className="relative mt-4">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Update password
                </label>
                <input
            type="email"
            value={user?.email}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button  className='btn-primary rounded-md text-white py-1 w-full mt-3'
        onClick={async () => {
          const success = await sendPasswordResetEmail(
            email,actionCodeSettings
          );
          if (success) {
            toast.success("Check your email", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          }
        }}
      >
        Reset password
      </button>
               
              </div>
              
              
              <p className="text-xs text-gray-500 mt-3">
                This is very important for your blog.So,be careful.
              </p>
            </div>
          </div>
        </section>
          </div>
     );
};
export default UpdateProfile;