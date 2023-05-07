import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserComment from './UserComment';
import LoadUserComments from './LoadUserComments';
import LoadAllCategorys from './LoadAllCategorys';
import Advertisement from '../Shired/advertisement';
import "./Style.css";
const BlogDetails = () => {
     const {id}=useParams();
     const [blog,setBlog]=useState({});
     const [error,setError]=useState("");
     const quillHtml = blog.description;
     // const parser = new DOMParser();
     // const quillDoc = parser.parseFromString(quillHtml, "text/html");
     // const plainText = quillDoc.body.textContent;
     const detailsOfBlog = async() => {
try{
    const response=await axios.get(`http://localhost:5000/readblog/${id}`)
    setBlog(response.data)
}catch(error){
    setError("something is wrong.Please try again")
}
      }
      useEffect(()=>{
detailsOfBlog();
      },[id]);

     return (
<div className='mx-3'>
  <div className='md:flex items-start '>
<div className='my-10'>
<h1 className='text-xl sm:text-3xl text-center font-bold'>{blog.title}</h1>
     <p className='text-xs text-center font-bold mt-2'> {blog.date} <span className='text-primary'>
          { blog.keywords}
          </span> </p>
     <div className='flex justify-center items-center mt-10 '>
     <img className='rounded md:h-96' src={blog.image} alt="Shoes" />
     </div>
     <div className='text-justify mt-5 md:mt-8 md:mx-4'>
          <span dangerouslySetInnerHTML={{__html: quillHtml}} className='blogdetails'>
          </span>
     </div>
  {/* advertisements  */}
  <Advertisement/>
{/* user form  */}
<UserComment/>
{/* user comments  */}
<br />
<LoadUserComments/>
<br />
</div>
<div>
<LoadAllCategorys/>
</div>

</div>
      

</div>
     );
};
export default BlogDetails;