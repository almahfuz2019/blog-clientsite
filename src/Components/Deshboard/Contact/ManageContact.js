import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEye } from "react-icons/hi";
import UseDataCount from '../../Hooks/UseDataCount';
const ManageContact = () => {
  const {contactCount}=UseDataCount();
  
 const [keywords,setKeywords]=useState("")
     const [authors,setAuthors]=useState([]);
     useEffect(()=>{
          detailsOfBlog();
     },[]);
     const detailsOfBlog = async() => {
          try{
              const response=await axios.get(`http://localhost:5000/readmessage`)
              // console.log("res",response);
              setAuthors(response.data)
          }catch(error){
              console.log("something is wrong.Please try again")
          }
                }
      // search 
      const handleSearch = (e) => {
        setKeywords(e.target.value);
      };
  useEffect(()=>{
    const url=`http://localhost:5000/usercomment/search/${keywords}`;
    console.log(url);
    if(keywords!==""){
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
        setAuthors(data)
       
      })
    }else if(keywords===""){
      detailsOfBlog()
    }
  },[keywords])
             
     return (
          <div>
          <div className="overflow-x-auto">
          <div className='text-center my-5'><span className='bg-primary rounded p-2 text-white font-bold text-xl sm:text-3xl '>Total Blogs: {contactCount.count}</span></div>
        
     <div className='mx-auto text-center mb-5'>
     <input type="text" placeholder="Search here by product name" className="input input-bordered input-accent w-full sm:max-w-sm input-sm sm:input-md max-w-xs border border-primary" onChange={handleSearch}/>
     </div>
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Message</th>
                <th>View</th>
              </tr>
            </thead>
         {authors.map((blog,index)=>
            <tbody key={blog._id}>
              <tr className='border bg-white'>
                <th>{index+1}</th>
                <td>
                {blog?.userEmail} 
                </td>
                <td>
                {blog?.userComment?.slice(0,20)} 
                </td>
                <td className='flex gap-3 text-2xl'>
                <Link to={`/contact/${blog._id}`} > <HiOutlineEye className='text-2xl font-extrabold'/> </Link>
                </td>
              </tr>
            </tbody>
          )}
          </table>
        </div>
        
               </div>
     );
};
export default ManageContact;