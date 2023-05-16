import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BiRightArrowAlt } from 'react-icons/bi';
import Advertisement from '../Shired/advertisement';
const BlogLoadByCategory = () => {
     const {category}=useParams();
     console.log(category);
     const [blog,setBlog]=useState([]);
     const [error,setError]=useState("");
     const parseHtml = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    };
     const allBlogs=async()=>{
      try {
        const url=`http://localhost:5000/readblogswithcategory/${category}`;
        const response=await axios.get(url);
        setBlog(response.data);
      } catch (error) {
        setError("something is wrong.Please try again")
      }
     }
     useEffect(()=>{
      allBlogs();
     },[category])
     return (
          <div className='mx-2'>
          <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-bold my-5 mx-5'>For DevOps Engineers, Developers and Server Admins.
         </h1>
         <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-bold my-5 mx-5 text-primary underline underline-offset-4'>Total : {blog?.length}</h1>
          <div className="form-control ">
</div>
           {
            blog.length>0? 
           
           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-10 '>
         
           <>
            {blog.map(singleBlog=>
                
                <div className=" w-full bg-base-200 shadow" key={singleBlog._id} >
  <img className='rounded-none' src={singleBlog.image} alt="Shoes" />
  <div className="px-2 pb-5">
     <p className='text-primary font-bold mt-4 '>{singleBlog.keywords}</p>
    <Link to={`/blog/${singleBlog._id}`} className="card-title font-bold hover:text-primary cursor-pointer text-xl my-1 hover:underline hover:underline-offset-4">
    {singleBlog.title.slice(0,25)} 
    </Link>
    <p className='mb-2 text-xs'>By <span className='font-bold'>{singleBlog.authorName}</span>, Published on {singleBlog.date} </p>
    <p>{parseHtml(singleBlog.description.slice(0,38))}.....</p>
    
  <Link to={`/blog/${singleBlog._id}`}  className='flex items-end hover:font-bold text-primary mt-3 hover:ease-in duration-300'>Continue Reading <BiRightArrowAlt className='text-xl font-extrabold'/> </Link>
  </div>
</div>
               )}
             
          </>
          
          </div>  
          :<div className='mt-10'>
            <section className="flex items-center h-full p-16  ">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-7xl dark:text-gray-600">
				NOT FOUND
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find any <span className='text-primary font-bold'>{category}</span> related Blog.</p>
			<p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you will upload blogs related to {category}.</p>
			<Link to="/" rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded bg-primary text-white">Back to homepage</Link>
		</div>
	</div>
</section>
            </div>}
                {/* advertisements  */}
                <Advertisement/>
          </div>
     );
};
export default BlogLoadByCategory;