import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shired/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate=useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:5000/createusermessage",data)
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
                   navigate("/")
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
  const [user, loading, error] = useAuthState(auth);
  if(loading){
    return <Loading/>
  }
     return (
          <div>
              <section class="text-gray-600 body-font relative">
  <div class="absolute inset-0 bg-gray-300">
    <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginWidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14472.921272537005!2d91.96894024229736!3d24.92422263543104!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750552bc71c899d%3A0x804e438bcc32b390!2z4Kau4KeH4Kaf4KeN4Kaw4KeL4Kaq4Kay4Ka_4Kaf4KaoIOCmh-CmieCmqOCmv-CmreCmvuCmsOCnjeCmuOCmv-Cmn-Cmvw!5e0!3m2!1sbn!2sbd!4v1685197066607!5m2!1sbn!2sbd" ></iframe>
  </div>
  <div class="container px-5 py-24 mx-auto flex">
    <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
      <p class="leading-relaxed mb-5 text-gray-600">Mindscape is a platform for express your feelings.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input {...register("userEmail")} value={user?.email || ""} type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
        <textarea placeholder='Type your comment' {...register("userComment", {
                    required: "Message is Required",
                  })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      {errors.userComment && (
                  <p className="text-red-500">{errors.userComment.message}</p>
                )}
      </div>
      <input type='submit' value="Send" class="text-white bg-primary border-0 py-2 px-6 focus:outline-none  rounded text-lg cursor-pointer"/>
      </form>
      <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
    </div>
  </div>
</section> 
          </div>
     );
};
export default Contact;