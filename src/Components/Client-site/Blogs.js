import React, { useEffect, useState } from 'react';
import SingleBlog from './SingleBlog';
import Advertisement from '../Shired/advertisement';
import axios from 'axios';
import Loading from '../Shired/Loading';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useForm } from 'react-hook-form';

const Blogs = () => {
  const[products,setProducts]=useState([]);
  const[productLoading,setProductLoading]=useState(true);
  const[page,setPage]=useState(1);
  const [error,setError]=useState("");
  const[size,setSize]=useState(4);
  const[pageCount,setPageCount]=useState(0);
  const [keywords,setKeywords]=useState("")
  const fetchProducts = async() => {
    try{
    //   setProductLoading(true);
      const url=`http://localhost:5000/data?page=${page}&limit=${size}`;
    //   console.log(url);
      const response=await axios.get(url);
      setPageCount(Math.ceil(response.data.count/size));
          setProducts(response.data);
         //  setProductLoading(false);
    }
    catch(error){
      setError("something is wrong.Please try again")
    };
  }
  useEffect(()=>{
      fetchProducts()
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
    setProductLoading(true)
    fetchProducts();
    setProductLoading(false)
  },[size,page])
  // data search start
  useEffect(()=>{
    const url=`http://localhost:5000/user/search/${keywords}`;
    console.log(url);
    if(keywords!==""){
      setProductLoading(true)
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
        setProducts(data)
        setPageCount(Math.ceil(data.length/size))
        setProductLoading(false)
      })
    }else if(keywords===""){
      fetchProducts()
    }
  },[keywords]) 
  const handleSearch = (e) => {
    setKeywords(e.target.value);
  };
  // data search end
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => setKeywords(data.searchdata);
  if(productLoading){
    return <Loading/>
  }
     return (
          <div className='mx-2'>
          <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-bold my-5 mx-5'>Atatus Blog - For DevOps Engineers, Developers and Server Admins.</h1>
          <div className="form-control ">
  <div className="input-group flex justify-center ">
    <form  onSubmit={handleSubmit(onSubmit)} className='flex'>
    <input type="text" placeholder="Search…" className="input input-bordered md:w-full w-full"  {...register("searchdata")}/>
    
    <input type='submit' value="Search" className="btn  btn-primary ml-1"/>
  
    </form>
  </div>
</div>
           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-10 '>
     <>
     {products.map(singleBlog=>
                
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
          {products.length===0 ?"":<div className='mx-auto text-center mt-5'>
  <button className='btn btn-primary w-64 btn-sm sm:btn-md' onClick={loadMore}>load more</button> 
  </div>
}
{
    products.length === 0 && <h1 className='text-3xl text-center justify-center mx-auto text-red-700 font-bold h-screen'>Not found</h1>
  }
                {/* advertisements  */}
                <Advertisement/>
          </div>
     );
};
export default Blogs;