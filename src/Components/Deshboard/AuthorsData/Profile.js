import React from 'react';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../Shired/Loading';
const Profile = () => {
     const [user, loading, error] = useAuthState(auth);
     if(loading){
          return <Loading/>
     }
     // console.log(user?.providerData[0].phoneNumber);
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
				<div className=" p-3 border-gray-300  border-t-2 text-start">
				<p className='mb-1'><span className='font-bold '>Email:</span> {user?.email}</p>
			     <h1  className='mb-1'><span className='font-bold '>Login Time:</span> {user?.metadata?.lastSignInTime}</h1>
               <h1 className='mb-1'> <span className='font-bold'>Creation Time:</span> {user?.metadata?.creationTime}</h1>
              <h1><span className='font-bold'>Email verification:</span> {user?.emailVerified===true ? "Verified":" Not Verified"}</h1> 
				</div>
			</div>
		</div>
	</div>
</section>
          </div>
     );
};

export default Profile;