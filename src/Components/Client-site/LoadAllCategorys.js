
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UseCategory from '../Hooks/UseCategory';
const LoadAllCategorys = () => {
  const {categorys,loadCategorys}=UseCategory();
   useEffect(()=>{
    loadCategorys();
   },[categorys])
     return (
          <div className='sticky top-0  w-80 hidden md:block '>
     <div className='border-2  p-3 mx-5 font-bold rounded-md  '>
  <h1 className='text-xl border-b-4 border-primary pb-1'>Categories</h1>
 {
     categorys.map(category=>
          <div className='mt-3 flex justify-between w-full' key={category._id}>
 <Link to={`/blogs/${category.name}`} className='hover:underline underline-offset-4 w-full'>#{category.name}</Link>
 </div>
          )
 }
</div>
   </div>
     );
};
export default LoadAllCategorys;