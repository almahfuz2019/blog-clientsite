import React from 'react';
import auth from '../../../firebase.init';
import { useAuthState, useSendEmailVerification, useUpdatePassword } from 'react-firebase-hooks/auth';
import Loading from '../../Shired/Loading';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit } from "react-icons/fi";
const Profile = () => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [photoURL, setPhotoURL] = useState("");
	console.log("firebase image",photoURL);
	const auth = getAuth();
	const [sendEmailVerification, sending, veryficationerror] = useSendEmailVerification(auth);
  const [updateProfile, updating, profileerror] = useUpdateProfile(auth); 
  const [updatePassword, passwordupdating, passeorderror] = useUpdatePassword(auth);
     const [user, loading, error] = useAuthState(auth);
     if(loading){
          return <Loading/>
     }

  if (error || profileerror ||veryficationerror || passwordupdating) {
    return (
      <div>
        <p>Error: {error?.message}</p>
      </div>
    );
  }
  if (updating || sending ||passwordupdating) {
    return <Loading/>;
  }
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
     return (
          <div>
			
               <section className="py-3 ">
		
	<div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
		{/* <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">User profile</p> */}
		<h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Your profile</h1>
		<div className="flex flex-row flex-wrap-reverse justify-center mt-8">
			<div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md  bg-gray-200 ">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-800" src={user?.photoURL} />
				<div className="flex-1 my-4">
					
					<p className="text-xl font-semibold leading-snug">{user?.displayName}</p>
					
				</div>
				<Link to="update-profile" className='flex items-center mx-auto text-2xl mb-3 text-primary'>
				<FiEdit/><span className='text-sm ml-2'>Edit your information</span>
				</Link>
				<div className=" p-3 border-gray-300  border-t-2 text-start">
				<p className='mb-1'><span className='font-bold '>Email:</span> {user?.email}</p>
			     <h1  className='mb-1'><span className='font-bold '>Login Time:</span> {user?.metadata?.lastSignInTime}</h1>
               <h1 className='mb-1'> <span className='font-bold'>Creation Time:</span> {user?.metadata?.creationTime}</h1>
              <h1><span className='font-bold'>Email verification:</span> {user?.emailVerified===true ? "Verified":<span className='text-rose-700'>Not verifyed.   
	<button className='bg-rose-700 cursor-pointer px-2 py-1 rounded-md btn-xs ml-3 text-white'
        onClick={async () => {
          const success = await sendEmailVerification();
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
        Verify email
      </button></span>}
	 </h1> 
				</div>
			</div>
		</div>
	</div>
	
</section>
          </div>
     );
};

export default Profile;