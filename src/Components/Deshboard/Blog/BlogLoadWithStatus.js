import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BlogLoadWithStatus = () => {
     const [keywords,setKeywords]=useState("")
    const[blogs,setBlogs]=useState([]);
    const [productsCount,setProductsCount]=useState([]);
    console.log(productsCount.message);
    useEffect(()=>{
      fetch("http://localhost:5000/waitingblogscount")
      .then(res=>res.json())
      .then(data=>setProductsCount(data))
  },[blogs])
  const handleSearch = (e) => {
    setKeywords(e.target.value);
  };
  // delete products 
  const handleProductDelete=async(id)=>{
    const proceed=window.confirm("are you sure you want to delete?");
    if(proceed){
    await axios.delete(`http://localhost:5000/deleteblog/${id}`)
     .then(response=>{
          if(response.data.deletedCount>0){
               const deletedremaining=blogs.filter(x=>x._id !==id);
               setBlogs(deletedremaining)
          }
     })
}
}
  //get allproducts 
      const fetchProducts = () => {
         fetch(`http://localhost:5000/readblogswithwaiting`)
         .then(res=>res.json())
         .then(data=>setBlogs(data))
       }
  useEffect(()=>{
    fetchProducts()
  },[])
  useEffect(()=>{
    const url=`http://localhost:5000/waitingblog/search/${keywords}`;
    if(keywords!==""){
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
        setBlogs(data)
       
      })
    }else if(keywords===""){
      fetchProducts()
    }
  },[keywords])
     return (
          <div>
          <div className="overflow-x-auto">
          <div className='text-center my-5'><span className='bg-primary rounded p-2 text-white font-bold text-xl sm:text-3xl '>Total Blogs: {productsCount.count}</span></div>
        
     <div className='mx-auto text-center mb-5'>
     <input type="text" placeholder="Search here by product name" className="input input-bordered input-accent w-full sm:max-w-sm input-sm sm:input-md max-w-xs border border-primary" onChange={handleSearch}/>
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
         {blogs.map((blog,index)=>
            <tbody key={blog._id}>
              <tr className='border bg-white'>
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
                <td>{blog.status}</td>
                <td className='flex gap-3 text-2xl'>
                 <Link to={`/updateblog/${blog._id}`}>
                 <FaRegEdit/>
                 </Link>
                 <Link onClick={()=>handleProductDelete(blog._id)}>
                 <FaRegTrashAlt/>
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
export default BlogLoadWithStatus;