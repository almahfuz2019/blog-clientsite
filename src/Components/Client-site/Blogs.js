import React, { useEffect, useState } from 'react';
import Advertisement from '../Shired/advertisement';
import axios from 'axios';
import Loading from '../Shired/Loading';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import UseDataCount from '../Hooks/UseDataCount';
const Blogs = () => {
  const {blogsCount,waitingBlogsCount}=UseDataCount();
  const[blogs,setBlogs]=useState([]);
  const[blogsLoading,setBlogsLoading]=useState(true);
  const[page,setPage]=useState(1);
  const [error,setError]=useState("");
  const[size,setSize]=useState(4);
  const[pageCount,setPageCount]=useState(0);
  const [keywords,setKeywords]=useState("");
  // get data 
  const fetchBlogs = async() => {
    try{
      // setBlogsLoading(true);
      const url=`http://localhost:5000/blogs?page=${page}&limit=${size}`;
      const response=await axios.get(url);
      setPageCount(Math.ceil(response.data.count/size));
          setBlogs(response.data);
          setBlogsLoading(false);
    }
    catch(error){
      setError("Something is wrong. Please try again")
    };
  }
  useEffect(()=>{
      fetchBlogs()
    },[size,page])
//  
  const loadMore=()=>{
    setSize(size+4)
  }
    const parseHtml = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    };
  useEffect(()=>{
    setBlogsLoading(true)
    fetchBlogs();
    setBlogsLoading(false)
  },[size,page])
  // data search start
  useEffect(()=>{
    const url=`http://localhost:5000/user/search/${keywords}`;
    console.log(url);
    if(keywords!==""){
      setBlogsLoading(true)
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
        setBlogs(data)
        setPageCount(Math.ceil(data.length/size))
        setBlogsLoading(false)
      })
    }else if(keywords===""){
      fetchBlogs()
    }
  },[keywords]) 
  // data search end
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => setKeywords(data.searchdata);
  if(blogsLoading){
    return <Loading/>
  }
     return (
          <div className='mx-2'>
          <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-bold my-5 mx-5'>For Engineers, Developers and Server Admins.</h1>
          <div className="form-control ">
  <div className="input-group flex justify-center ">
    <form  onSubmit={handleSubmit(onSubmit)} className='flex'>
    <input type="text" placeholder="Search…" className="input input-bordered md:w-full w-full"  {...register("searchdata")}/>
    
    <input type='submit' value="Search" className="btn  btn-primary ml-1"/>
  
    </form>
  </div>
</div>
{/* not found page start */}
{error !== "" && <main class="h-96 w-full flex flex-col justify-center items-center ">
	<h1 class="text-9xl font-extrabold text-gray-900 tracking-widest">404</h1>
	<div class="bg-primary px-2 text-sm rounded rotate-12 absolute text-white">
		Page Not Found
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-primary group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <Link className='text-white' to="/">Please, Try again later</Link>
        </span>
      </a>
    </button>
</main>}
{/* not found page end */}
           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-10 '>
     <>
     {blogs.map(singleBlog=>
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
               )}</>
          </div>  
          {blogs.length===0 || (blogs.length=== blogsCount.count-waitingBlogsCount.count) ?"" :<div className='mx-auto text-center mt-5'>
  <button className='btn btn-primary w-64 btn-sm sm:btn-md' onClick={loadMore}>load more</button> 
  </div>
}
{/* {
    blogs.length === 0 && <h1 className='text-3xl text-center justify-center mx-auto text-red-700 font-bold h-screen'>Not found</h1>
  } */}
                {/* advertisements  */}
                <Advertisement/>
          </div>
     );
};
export default Blogs;