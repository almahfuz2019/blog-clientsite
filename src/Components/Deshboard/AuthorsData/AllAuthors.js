import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UseDataCount from '../../Hooks/UseDataCount';
const AllAuthors = () => {
 const {userCount}=UseDataCount();
 const [keywords,setKeywords]=useState("")
     const [authors,setAuthors]=useState([]);
     useEffect(()=>{
          detailsOfBlog();
     },[]);
     const detailsOfBlog = async() => {
          try{
              const response=await axios.get(`http://localhost:5000/getusers`, {
                headers: {
                  'authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
              })
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
    const url=`http://localhost:5000/users/search/${keywords}`;
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
          <div className='text-center my-5'><span className='bg-primary rounded p-2 text-white font-bold text-xl sm:text-3xl '>Total users: {userCount.count}</span></div>
        
     <div className='mx-auto text-center mb-5'>
     <input type="text" placeholder="Search here by user name or email" className="input input-bordered input-accent w-full sm:max-w-sm input-sm sm:input-md max-w-xs border border-primary" onChange={handleSearch}/>
     </div>
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
         {authors.map((blog,index)=>
            <tbody key={blog._id}>
              <tr className='border bg-white'>
                <th>{index+1}</th>
                <td>
                {blog?.email} 
                </td>
                <td>
                  {blog?.role==="	Author"?<span className='bg-yello-700 px-2 py-1 rounded'> {blog?.role} </span>:<span> {blog?.role} </span>}
               
                </td>
                <td className='flex gap-3 text-2xl'>
                 <Link to={`/updaterole/${blog._id}`}>
                 <FaRegEdit/>
                 </Link>
                </td>
              </tr>
            </tbody>
          )}
          </table>
        </div>
        
               </div>
     );
};
export default AllAuthors;