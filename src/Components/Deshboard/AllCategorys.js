import axios from 'axios';
import React, { useEffect } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UseCategory from '../Hooks/UseCategory';
import { useForm } from 'react-hook-form';
const AllCategorys = () => {
     const {categorys,loadCategorys,handleCatagoryDelete}=UseCategory();
     useEffect(()=>{
          loadCategorys()
     },[categorys]);
     // create a category 
     const {register, handleSubmit, formState: { errors }} = useForm();
     const onSubmit = (data) => {
          axios.post("http://localhost:5000/createcategory",data)
          .then(response => {
          toast.success('Submitted Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          });
          data.target.reset();
  })
  .catch(error => {
     toast.error({error}, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
  });
             };
     return (
          <>
          <div className='sm:mx-10 mx-2 mt-10'>
    <div className=' p-2 border-primary border-2 rounded-lg'>
    <h2 className='font-bold text-xl sm:text-3xl'>Create a Category</h2>
     <form  onSubmit={handleSubmit(onSubmit)} >
     <div className="relative mb-4">
        <label for="name" className="leading-7 text-sm text-gray-600">Category Name</label>
        <input  {...register("name", { required: true })}  placeholder='Type here' type="text"   className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {errors.name && <span>This field is required</span>}
      </div>
  <input type="submit" className="btn btn-primary sm:btn-md btn-sm" value="submit"/>
</form>   
    </div>
          </div>
          <div className="overflow-x-auto sm:m-10 m-2">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
 <th >No</th>
 <th className='text-center'>Category</th>
 <th className='text-end'>Action</th>
              </tr>
            </thead>
 
         {categorys.map((category,index)=>
            <tbody key={category._id}>
              <tr className='border rounded'>
 <td>{index+1}</td>

 <td  className='text-center'>{category?.name}</td>
 
 <td className='flex gap-3 text-2xl justify-end'>
 <Link to={`/updatecatagory/${category._id}`}>
            <FaRegEdit/>
            </Link>
            <Link onClick={()=>handleCatagoryDelete(category._id)}>
            <FaRegTrashAlt/>
            </Link>
 </td>
              </tr>
            </tbody>
          )}
          </table>
        </div>
          </>
     );
};
export default AllCategorys;