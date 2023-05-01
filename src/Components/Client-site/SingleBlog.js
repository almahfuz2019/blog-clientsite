import {BiRightArrowAlt} from "react-icons/bi";
import { Link } from 'react-router-dom';
import UseAllBlogs from '../Hooks/UseAllBlogs';
import { useEffect } from "react";
import ReactQuill from "react-quill";
const SingleBlog = () => {
    const {allBlogs,blog}=UseAllBlogs();
    const parseHtml = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    };
  useEffect(()=>{
    
    allBlogs();
  },[])
     return (
          <>
            {blog.map(singleBlog=>
                
                <div className=" w-full bg-base-200 shadow" key={singleBlog._id}>
  <img className='rounded-none' src={singleBlog.image} alt="Shoes" />
  <div className="px-2 pb-5">
     <p className='text-primary font-bold mt-4 '>{singleBlog.keywords}</p>
    <Link to={`/blog/${singleBlog._id}`} className="card-title font-bold hover:text-primary cursor-pointer text-xl my-1 hover:underline hover:underline-offset-4">
    {singleBlog.title.slice(0,25)} 
    </Link>
    <p className='mb-2 text-xs'>By <span className='font-bold'>{singleBlog.authorName}</span>, Published on {singleBlog.date} </p>
    {/* <p>{singleBlog.description.slice(0,61)} .....</p> */}
   
          <p>{parseHtml(singleBlog.description.slice(0,38))}...</p>
  <Link to={`/blog/${singleBlog._id}`}  className='flex items-end hover:font-bold text-primary mt-3 hover:ease-in duration-300'>Continue Reading <BiRightArrowAlt className='text-xl font-extrabold'/> </Link>
  </div>
</div>
               )}
             
          </>
     );
};
export default SingleBlog;