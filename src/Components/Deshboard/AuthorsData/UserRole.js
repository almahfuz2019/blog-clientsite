import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const UserRole = () => {
    
     const[role,setRole]=useState("");
     console.log(role);
     const { id } = useParams();
     const handleNameChange = e => {
          const updateName = e.target.value;
          setRole(updateName);
      }
     
     const handleUpdateCatagory = async (e) => {
          e.preventDefault();
          const url = `http://localhost:5000/updaterole/${id}`;
          try {
            const response = await axios.put(url, {role});
            console.log(response.data); // log response data for debugging purposes
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
          } catch (error) {
            console.error(error); // log error message for debugging purposes
            toast.error('Update Failed', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          }
        };
        
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
        <select className='select w-full  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 rounded'  onChange={handleNameChange}>
          <option selected>Wating</option>
          <option>Confirm</option>
          <option>Cencel</option>
          <option>Shipment</option>
          <option>Done</option>
        </select>
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
export default UserRole;