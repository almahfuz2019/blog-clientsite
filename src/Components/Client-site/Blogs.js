import React, { useEffect, useState } from "react";
import Advertisement from "../Shired/advertisement";
import axios from "axios";
import Loading from "../Shired/Loading";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseDataCount from "../Hooks/UseDataCount";
import LoadAllCategorys from "./LoadAllCategorys";
import { BiBookmark } from "react-icons/bi";
const Blogs = () => {
  const { blogsCount, waitingBlogsCount } = UseDataCount();
  const [blogs, setBlogs] = useState([]);
  const [blogswithlimit, setBlogswithlimit] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [size, setSize] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  const [keywords, setKeywords] = useState("");
  // get data
  const fetchBlogs = async () => {
    try {
      setBlogsLoading(true);
      const url = `http://localhost:5000/blogs?page=${page}&limit=${size}`;
      const response = await axios.get(url);
      // const response = await axios.get(url, {
      //   headers: { Authorization: localStorage.getItem("accessToken") },
      // });
      setPageCount(Math.ceil(response.data.count / size));
      setBlogs(response.data);
      setBlogsLoading(false);
    } catch (error) {
      setError("Something is wrong. Please try again");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [size, page]);
  //data load with limit 
  const blogLoadwithLimit=async()=>{
    try {
      setBlogsLoading(true)
      await axios.get("http://localhost:5000/readblogswithlimit")
      .then(response=>
        setBlogswithlimit(response.data),
        setBlogsLoading(false)
        )
    } catch (error) {
      console.log(error);
    }
  }
  const loadMore = () => {
    setSize(size + 4);
  };
  const parseHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  useEffect(() => {
    setBlogsLoading(true);
    fetchBlogs();
    setBlogsLoading(false);
  }, [size, page]);
  // data search start
  useEffect(() => {
    const url = `http://localhost:5000/user/search/${keywords}`;
    blogLoadwithLimit("")
    console.log(url);
    if (keywords !== "") {
      setBlogsLoading(true);
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setPageCount(Math.ceil(data.length / size));
        setBlogswithlimit([])
        setBlogsLoading(false);
      });
    } else if (keywords === "") {
      fetchBlogs();
    }
  }, [keywords]);
  // data search end
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => setKeywords(data.searchdata);
  if (blogsLoading) {
    return <Loading />;
  }
  return (
    <div className="sm:mx-10 mx-2">
     
      <h1 className="text-center text-xl sm:text-2xl md:text-4xl font-bold my-5 mx-5 heading">
        For Engineers, Developers and Server Admins.
      </h1>
      <div className="form-control mb-10 sm:mb-0">
        <div className="input-group flex justify-center ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered md:w-full w-full"
              {...register("searchdata")}
            />

            <input
              type="submit"
              value="Search"
              className="btn  btn-primary ml-1"
            />
          </form>
        </div>
      </div>
      {/* not found page start */}
      {error !== "" && (
        <main class="h-96 w-full flex flex-col justify-center items-center ">
          <h1 class="text-9xl font-extrabold text-gray-900 tracking-widest">
            404
          </h1>
          <div class="bg-primary px-2 text-sm rounded rotate-12 absolute text-white">
            Page Not Found
          </div>
          <button class="mt-5">
            <a class="relative inline-block text-sm font-medium text-primary group active:text-orange-500 focus:outline-none focus:ring">
              <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <Link className="text-white" to="/">
                  Please, Try again later
                </Link>
              </span>
            </a>
          </button>
        </main>
      )}
      {/* not found page end */}
    
                <div className=" py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl hidden md:block  lg:py-20">
      <div className="grid gap-2 lg:grid-cols-4 grid-cols-2  ">
      
          {blogswithlimit.map((singleBlog) => (
            <>
       
      
        <div className=" border  overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm ">
          <img
            src={singleBlog.image}
            className="object-cover w-full h-40"
            alt=""
          />
          <div className="p-2  bg-gray-100">
            <p className="mb-2 text-xs  font-semibold tracking-wide uppercase">
              <span
                
                className="transition-colors duration-200 hover:text-deep-purple-accent-700 text-xs"
                aria-label="Category"
                title="traveling"
              >
                {singleBlog.category}
              </span>
              <span className="">— 28 Dec 2020</span>
            </p>
            <Link to={`/blog/${singleBlog._id}`} 
              
              aria-label="Category"
              title="Film It!"
              className="inline-block mb-2 text-md sm:text-xl font-bold text-primary "
            >
            {singleBlog.title}
            </Link>
            <p className="mb-2 hidden sm:block">
            {parseHtml(singleBlog.description.slice(0, 60))}...
            </p>
            <Link to={`/blog/${singleBlog._id}`} 
             
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200  hover:text-primary underline underline-offset-2"
            >
              Learn more
              </Link>
          </div>
        </div>
            </>
        ))}
      </div>
    </div>

            
          
     
      <>
      <div className='flex items-start '>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2  w-full">

      {blogs.map((singleBlog) => (
        <>
        <section class="text-gray-600 border body-font overflow-hidden">
  <div class="container px-2 md:px-5 py-5 mx-auto">
    <div class="-my-8 divide-y-2 divide-gray-100">
      <div class="py-8 flex gap-5 flex-wrap md:flex-nowrap">
        <div class=" ">
        <img
                className="rounded-none"
                src={singleBlog.image}
                alt="Shoes"
                />
        </div>
        <div class="">
          <Link
                  to={`/blog/${singleBlog._id}`}>
          <h2 class="text-2xl font-medium text-gray-900 title-font "> 
                  
                  {singleBlog.title.slice(0, 25)}
                </h2>
                </Link>
        <p className=" font-bold mt-2">
                  <span  className="border bg-primary px-2 text-primary bg-opacity-20 border-1 border-primary ">{singleBlog.category}</span> - {singleBlog.date}
                </p>
          <p class="hidden md:block">{parseHtml(singleBlog.description.slice(0, 350))}...</p>
          <p class="md:hidden block">{parseHtml(singleBlog.description.slice(0, 60))}...</p>
         
         <div className="flex items-center justify-between">
         <Link to={`/blog/${singleBlog._id}`} class="inline-flex items-center mt-4  border bg-primary px-2 text-white font-bold  border-1 border-primary">Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        <span className="bg-black rounded text-white p-2">  <BiBookmark /></span>
         </div>
        </div>
      </div>
    
      
    </div>
  </div>
</section>
       
          </>
          ))}
          </div>
          <LoadAllCategorys/>
      </div>
      </>
      
      {blogs.length === 0 ||
      blogs.length === blogsCount.count? (
        ""
      ) : (
        <div className="mx-auto text-center mt-5">
          <button
            className="btn btn-primary w-64 text-white btn-sm sm:btn-md"
            onClick={loadMore}
          >
            load more
          </button>
        </div>
      )}
      {blogs?.length === 0 && (
        <h1 className="text-3xl text-center justify-center mx-auto text-red-700 font-bold h-screen">
          Not found
        </h1>
      )}
      {/* advertisements  */}
      <Advertisement />
    </div>
  );
};
export default Blogs;
