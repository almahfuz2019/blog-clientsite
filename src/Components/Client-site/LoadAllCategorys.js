
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UseCategory from '../Hooks/UseCategory';
const LoadAllCategorys = () => {
  const {categorys,loadCategorys}=UseCategory();
   useEffect(()=>{
    loadCategorys();
   },[categorys])
     return (
          <div className='sticky top-0  w-60 hidden md:block'>
     <div className='border-2 border-primary p-3 m-5 font-bold rounded-md  '>
  <h1 className='text-xl border-b-4 border-primary pb-1'>Categories</h1>
 {
     categorys.map(category=>
          <div className='mt-3 flex justify-between' key={category._id}>
 <Link to={`/blogs/${category.name}`} className='hover:underline underline-offset-4'>#{category.name}</Link>
 </div>
          )
 }
</div>
   </div>
     );
};
export default LoadAllCategorys;