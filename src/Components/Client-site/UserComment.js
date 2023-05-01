import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const UserComment = () => {
     const {id}=useParams();
     console.log(id);
     const postID=id;
     const { register, handleSubmit, formState: { errors } } = useForm();
     const onSubmit = (data) => {
     axios.post("http://localhost:5000/createusercomment",  { ...data,postID})
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
<div>
<section className=" text-gray-100 ">
<form onSubmit={handleSubmit(onSubmit)} className="container w-full  p-8  space-y-6 rounded-md shadow  ng-untouched ng-pristine ng-valid bg-gray-900">
<h2 className="w-full text-3xl font-bold leading-tight">Comments</h2>
<div>
<label for="name" className="block mb-1 ml-1">Name</label>
<input  {...register("userName", { required: true })} type="text" placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-primary bg-gray-800" />
{errors.userName && <span>This field is required</span>}
</div>
<div>
<label for="email" className="block mb-1 ml-1">Email</label>
<input  {...register("userEmail", { required: true })} type="email" placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-primary bg-gray-800" />
{errors.userEmail && <span>This field is required</span>}
</div>
<div>
<label for="message" className="block mb-1 ml-1">Message</label>
<textarea {...register("userComment", { required: true })} type="text" placeholder="Message..." className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-primary bg-gray-800"></textarea>
{errors.userComment && <span>This field is required</span>}
</div>
<div>
<button type="submit" className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-primary focus:ring-primary hover:ring-primary text-gray-100">Send</button>
</div>
</form>
</section> 
</div>
     );
};
export default UserComment;