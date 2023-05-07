import React from 'react';
import SingleBlog from './SingleBlog';
import Advertisement from '../Shired/advertisement';
import { Link } from 'react-router-dom';

const Blogs = () => {
     return (
          <div className='mx-2'>
          <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-bold my-5 mx-5'>Atatus Blog - For DevOps Engineers, Developers and Server Admins.</h1>
          <div className="form-control ">
  <div className="input-group flex justify-center ">
    <input type="text" placeholder="Search…" className="input input-bordered md:w-1/2 w-full" />
    <button className="btn btn-square">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-10 '>
          <SingleBlog/>
          </div>  
          
                {/* advertisements  */}
                <Advertisement/>
          </div>
     );
};
export default Blogs;