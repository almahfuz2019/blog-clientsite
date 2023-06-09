import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../../Shired/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { FaRegEdit} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ManageData = () => {
     const [userData,setUserData]=useState([]);
     useEffect(()=>{
          detailsOfBlog();
     },[userData]);
     const [user, loading, error] = useAuthState(auth);
     const authorEmail=user?.email;
     if(loading){
       return <Loading/>
     }
     const detailsOfBlog = async() => {
          try{
              const response=await axios.get(`http://localhost:5000/readblogswithemail/${authorEmail}`)
              // console.log("res",response);
              setUserData(response.data)
          }catch(error){
              console.log("something is wrong.Please try again")
          }
                }
             
     return (
          <div>
          <div className="overflow-x-auto">
          <div className='text-center my-5'><span className='bg-primary rounded p-2 text-white font-bold text-xl sm:text-3xl '>Total Blogs: {userData.length}</span></div>
        
     <div className='mx-auto text-center mb-5'>
     <input type="text" placeholder="Search here by product name" className="input input-bordered input-accent w-full sm:max-w-sm input-sm sm:input-md max-w-xs border border-primary" />
     </div>
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
         {userData.map((blog,index)=>
         
            <tbody key={blog._id}>
             { blog?.status==="Draft" ? <><tr className='border bg-white '>
                <th>{index+1}</th>
                <td>
                <div className="avatar  border-rose-700 rounded border-2">
                   <div className="mask mask-squircle w-12 h-12 ">
                     {
                     blog?.image?
         <img  src={blog?.image} alt="product image"/>:
         <img src="" className='bg-rose-700' alt='not found image'/>
                     }
                   </div>
                 </div>
                </td>
                <td className=''>{blog?.title.slice(0,25)}</td>
                <td className=''>{blog?.category} 
                <br />
                Author: {blog?.authorName}
                <br/>
                {blog?.dateAndTime}
                </td>
                <td><span  className='bg-rose-700 px-2 py-1 text-white rounded'>{blog.status}</span></td>
                <td className='flex gap-3 text-2xl'>
                 <Link to={`/updateblog/${blog._id}`}>
                 <FaRegEdit/>
                 </Link>
                 {/* <Link onClick={()=>handleProductDelete(blog._id)}>
                 <FaRegTrashAlt/>
                 </Link> */}
                </td>
              </tr></>:blog?.status==="waiting" ?<><tr className='border bg-white'>
                <th>{index+1}</th>
                <td>
                <div className="avatar  border-primary rounded border-2">
                   <div className="mask mask-squircle w-12 h-12 ">
                     {
                     blog?.image?
         <img  src={blog?.image} alt="product image"/>:
         <img src="" className='bg-primary' alt='not found image'/>
                     }
                   </div>
                 </div>
                </td>
                <td>{blog?.title.slice(0,25)}</td>
                <td>{blog?.category} 
                <br />
                Author: {blog?.authorName}
                <br/>
                {blog?.dateAndTime}
                </td>
                <td><span  className='bg-yellow-700 px-2 py-1 text-white rounded'>{blog.status}</span></td>
                <td className='flex gap-3 text-2xl'>
                 <Link to={`/updateblog/${blog._id}`}>
                 <FaRegEdit/>
                 </Link>
                 {/* <Link onClick={()=>handleProductDelete(blog._id)}>
                 <FaRegTrashAlt/>
                 </Link> */}
                </td>
              </tr></>:<><tr className='border bg-white'>
                <th>{index+1}</th>
                <td>
                <div className="avatar  border-primary rounded border-2">
                   <div className="mask mask-squircle w-12 h-12 ">
                     {
                     blog?.image?
         <img  src={blog?.image} alt="product image"/>:
         <img src="" className='bg-primary' alt='not found image'/>
                     }
                   </div>
                 </div>
                </td>
                <td>{blog?.title.slice(0,25)}</td>
                <td>{blog?.category} 
                <br />
                Author: {blog?.authorName}
                <br/>
                {blog?.dateAndTime}
                </td>
                <td><span  className='bg-green-700 px-2 py-1 text-white rounded'>{blog.status}</span></td>
                <td className='flex gap-3 text-2xl'>
                 <Link to={`/updateblog/${blog._id}`}>
                 <FaRegEdit/>
                 </Link>
                 {/* <Link onClick={()=>handleProductDelete(blog._id)}>
                 <FaRegTrashAlt/>
                 </Link> */}
                </td>
              </tr></>} 
            </tbody>
          )}
          </table>
        </div>
        
               </div>
     );
};
export default ManageData;