import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shired/Loading';
import UseDataCount from '../Hooks/UseDataCount';
import UseToken from '../Hooks/UseToken';
import axios from 'axios';
const BasicInfo = () => {
  const [userData,setUserData]=useState([]);
  const [user, loading, error] = useAuthState(auth);
  const authorEmail=user?.email;
  const detailsOfBlog = async() => {
    try{
        const response=await axios.get(`http://localhost:5000/readblogswithemail/${authorEmail}`)
        // console.log("res",response);
        setUserData(response.data)
    }catch(error){
        console.log("something is wrong.Please try again")
    }
          }
          useEffect(()=>{
            detailsOfBlog();
       },[userData]);
  const {blogsCount,categoryCount,userCount,contactCount, waitingBlogsCount}=UseDataCount();
  const [token, authUser] = UseToken(user);
  if(loading){
    return <Loading/>
  }
     let timeOfDay;
const date = new Date();
const hours = date.getHours();
if (hours < 12) {
  timeOfDay = 'Good Morning';
} else if (hours >= 12 && hours < 17) {
  timeOfDay = 'Good Afternoon';
} else {
  timeOfDay = 'Good Night';
}
     return (
          <div>
                <section className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-16 lg:px-8">
            <div className="text-3xl ">
              <h2 className="text-4xl font-bold text-primary sm:text-5xl ">
                 {timeOfDay}, {user?.displayName} .{user?.emailVerified===true ?"": <span className='text-rose-700 text-3xl'><br /> Please verify your email address to access everything.</span>}
           
              </h2>
            </div>
        <>{authUser?.role==="Admin" &&
            <div className="mt-8 sm:mt-12">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center"
                >
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Total Blogs
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">
                    {blogsCount.count}
                  </dd>
                </div>
        
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center "
                >
               
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Waiting Blogs
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">{waitingBlogsCount.count}</dd>
                  
                </div>
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center "
                >
               
                  <dt className="order-last text-lg font-medium text-gray-500">
                  Available Blogs
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">{blogsCount.count}</dd>
                  
                </div>
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center "
                >
               
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Category
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">{categoryCount.count}</dd>
                  
                </div>
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center "
                >
               
                  <dt className="order-last text-lg font-medium text-gray-500">
                     Total Users
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">{userCount.count}</dd>
                  
                </div>
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center"
                >
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Total Messages
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">{contactCount.count}</dd>
                </div>
                
               
              </dl>
            </div>
       } </>
        <>{authUser?.role==="Author" &&
            <div className="mt-8 sm:mt-12">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                  className="flex flex-col rounded-lg border border-primary px-4 py-8 text-center"
                >
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Total Blogs
                  </dt>
        
                  <dd className="text-4xl font-extrabold text-primary md:text-5xl">
                    {userData.length}
                  </dd>
                </div>
        
                
                
               
              </dl>
            </div>
       } </>
          </div>
        </section>
          </div>
     );
};
export default BasicInfo;