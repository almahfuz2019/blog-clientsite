import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const UpdateCategory = () => {
     const[category,setCategory]=useState([]);
    const { id } = useParams();
    console.log(category);
useEffect(()=>{
     const url=`http://localhost:5000/readcategory/${id}`
     fetch(url)
     .then(res=>res.json())
     .then(data=>setCategory(data))
    
},[])
const handleCatagoryNameChange = e => {
     setCategory({ name: e.target.value });   
 }
 const handleUpdateCatagory = async(e) => {
  e.preventDefault();
     const url = `http://localhost:5000/updatecategory/${id}`;
     await axios.put(url,category)
          toast.success('Update Successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
                 e.target.reset();
         
 } 
     return (
          <div>
            <form onSubmit={handleUpdateCatagory}>
     <section className="text-gray-600 body-font relative ">
     <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap ">
    <div className="border-primary  border-2 md:w-1/2 bg-white flex flex-col md:mx-auto w-full md:py-8 mt-8 md:mt-0  rounded-md p-5">
      <h2 className="text-gray-900 text-lg mb-1 
     title-font font-semibold">Add a product</h2>
      <div className="relative mb-4">
        <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name"  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={category.name} onChange={handleCatagoryNameChange}/>
      </div>
      <input className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" value="save" type="submit"/>
      <p className="text-xs text-gray-500 mt-3">This is very important for your website.So,be careful.</p>
    </div>
  </div>
</section>
</form>
          </div>
     );
};
export default UpdateCategory;