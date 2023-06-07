import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserComment from './UserComment';
import LoadUserComments from './LoadUserComments';
import LoadAllCategorys from './LoadAllCategorys';
import Advertisement from '../Shired/advertisement';
import { BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";

import { MdShare } from "react-icons/md";
import "./Style.css";
const BlogDetails = () => {
     const {id}=useParams();
     const [blog,setBlog]=useState({});
     const [error,setError]=useState("");
     const quillHtml = blog.description;
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
           let shareblog=
          [
  {
    title: "facebook",
    url: "https://www.facebook.com/sharer.php?u=",
    icon: <BsFacebook />,
  },
  {
    title: "whatsapp",
    url: "https://api.whatsapp.com/send?text=",
    icon: <BsWhatsapp />,
  },
  {
    title: "linkedin",
    url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    icon: <BsLinkedin />,
  },
  {
    title: "twiter",
    url: "https://twitter.com/share?url=",
    icon: <BsTwitter />,
  },
];
let siteurl= window.location.href

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
  {/* blog share */}
  <div className="mb-5 ">
      <div className="flex justify-center sm:justify-between border border-gray-400 p-4 rounded-lg">
     
        <span className="flex items-center gap-3  ">
          <MdShare className="text-green-600 hidden sm:block" /> <span className='hidden sm:block'>share this article</span>
        </span>
        

        <div className="flex gap-4">
          {shareblog.map((item) => (
            <a
              key={item.title}
          //     href={item.url + siteInfo.url + router.asPath}
              href={item.url+ siteurl}
              target="_blank"
              rel="noreferrer"
              className="border border-gray-400 p-2 rounded-lg text-2xl hover:border-primary"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
{/* user form  */}
<UserComment/>
{/* user comments  */}
<br />
<LoadUserComments/>
<br />
</div>
<div>
  <br />
  <br />
<LoadAllCategorys />
</div>

</div>
      

</div>
     );
};
export default BlogDetails;