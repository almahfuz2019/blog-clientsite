import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
const ContactDetails = () => {
     const {id}=useParams();
     const [blog,setBlog]=useState({});
     console.log(blog);
     const [error,setError]=useState("");
     const detailsOfBlog = async() => {
          try{
              const response=await axios.get(`http://localhost:5000/readcontactinfo/${id}`)
              setBlog(response.data)
          }catch(error){
              setError("something is wrong.Please try again")
          }
                }
                useEffect(()=>{
          detailsOfBlog();
                },[id]);
     return (
          <div className='ml-2 sm:p-5 sm:pb-10 bg-white container'>
          <a  href = "javascript:history.back()"><span className="pl-2 text-2xl  text-primary">
           <FaArrowCircleLeft/></span></a>
       <div className="chat chat-start">
<div className="chat-image avatar">
<div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
 <img src="https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792__340.png" />
</div>
</div>
<div className="chat-header">

</div>
<div className="chat-bubble bg-gray-100 text-black"> {blog.userComment}</div>
<div className="chat-footer text-black">
{blog.userEmail}
</div>
</div> 
     </div>
     );
};
export default ContactDetails;