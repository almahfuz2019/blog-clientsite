import {BiRightArrowAlt} from "react-icons/bi";
import { Link } from 'react-router-dom';
import UseAllBlogs from '../Hooks/UseAllBlogs';
import { useEffect } from "react";
import Loading from "../Shired/Loading";
import { useState } from "react";
import axios from "axios";
const SingleBlog = () => {
  const[products,setProducts]=useState([]);
  const[productLoading,setProductLoading]=useState(true);
  const[page,setPage]=useState(1);
  const [error,setError]=useState("");
  const[size,setSize]=useState(4);
  const[pageCount,setPageCount]=useState(0);
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
  if(productLoading){
    return <Loading/>
  }
     return (
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
               )}
   {
   size===products.length===0?"":<div className='mx-auto text-center mt-5'>
  <button className='btn btn-primary w-64 btn-sm sm:btn-md' onClick={loadMore}>load more</button> 
  </div>
}
{
    products.length === 0 && <h1 className='text-3xl text-center justify-center mx-auto text-red-700 font-bold h-screen'>Not found</h1>
  }
          </>
     );
};
export default SingleBlog;