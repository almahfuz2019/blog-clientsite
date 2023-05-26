import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SocialLogin from './SocialLogin';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Shired/Loading';
import UseToken from '../Hooks/UseToken';
const Registration = () => {
  const [agree,setAgree]=useState(false);
    const { register,watch, formState: { errors }, handleSubmit } = useForm();
    const password = React.useRef({});
    password.current = watch('password', '');
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
  
    const[token]=UseToken(user?.user);
    const navigate =useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
   if(token){
     console.log(token);
     navigate(from, { replace: true });
   }
   const onSubmit=async(data)=>{console.log(data)
     await createUserWithEmailAndPassword(data.email,data.password);
     await updateProfile({ displayName:data.name});
     };
   if(loading || updating){
     return <Loading/>
   }
   let signInError;
   if(error || updateError){
     signInError=<p className='text-red-700'>Error: {error?.message || updateError?.message}</p>
   }
     return (
<div className="py-10 bg-white">
<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl border border-primary border-opacity-30">
        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage:"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"}}></div>
        <div className="w-full p-8 lg:w-1/2">
        <h1 className='text-primary font-bold text-3xl text-center
        '>Mindspace</h1>
        <SocialLogin/>
       
         <form onSubmit={handleSubmit(onSubmit)}>
         <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <a href="#" className="text-xs text-center text-gray-500 uppercase">OR</a>
           <span className="border-b w-1/5 lg:w-1/4"></span>
           </div>
           <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input placeholder='Type your name' className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" type="text"
            {...register("name",{
                required:{
                value: true,
                message:"Name is Required"
            }
              })}
            />
            <label className='label '>
            {errors.name?.type === 'required' && <p className='text-red-600' >{errors.name.message}</p>}
            </label>
           </div>
           <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input placeholder='Type a valid email' className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" type="email"
            {...register("email",{
                required:{
                value: true,
                message:"E-mail is Required"
            }, 
            pattern: { 
                value:/@[a-z]/,message:"Provide a valid Email"
            }
              })}
            />
            <label className='label '>
            {errors.email?.type === 'required' && <p className='text-red-600' >{errors.email.message}</p>}
            {errors.email?.type === 'pattern' && <p className='text-red-600' >{errors.email.message}</p>}
            </label>
           </div>
           <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" placeholder='Type a unique password' type="password"
            {...register("password",{
                required:{
                value: true,
                message:"Password is Required"
            }, 
            minLength: { 
                value:6,
                message:"Must be 6 char password or long"
            }
              })}
            />
            <label className='label'>
            {errors.password?.type === 'required' && <p className=' text-red-600' >{errors.password.message}</p>}
            {errors.password?.type === 'minLength' && <p className=' text-red-600' >{errors.password.message}</p>}
            </label>
           </div>
           <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm password</label>
            <input className="bg-gray-200 text-primary focus:outline-primary focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none caret-primary" placeholder='Confirm password' 
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === password.current || 'Passwords do not match.',
            })}
            />
            <label className='label'>
            {<p className=' text-red-600' > {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}</p>}
            </label>
           </div>
           
        
         
          
          <div className="mt-2">

<input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary text-white">✕</label>
    <h3 className="text-2xl font-bold text-primary">Terms and conditions</h3>
    <div>
               
               <div className='bg-white pt-4   pb-5'>
              
              
               <section>
                <p className='mb-6'>আমাদের যেকোন সার্ভিস, প্রোডাক্ট, সফটওয়ার বা সেবা ব্যাবহার কিংবা ক্রয় করার পূর্বে কাইন্ডলি এই <span className='font-semibold'>টার্মস এবং কন্ডিশন</span> গুলো পড়ে নেয়ার অনুরোধ রইলো।
                  <br />
                   আমাদের সার্ভিস ব্যাবহার করার মানেই হলো আপনি আমাদের <span className='font-semibold'>টার্মস এবং কন্ডিশন</span> গুলো পড়ে নিয়েছেন এবং এতে সম্মত আছেন। কিন্তু, আপনি যদি আমাদের <span className='font-semibold'>টার্মস এবং কন্ডিশন</span> গুলোতে সম্মত না থাকেন, তাহলে আমাদের সার্ভিস ব্যাবহার না করাটাই শ্রেয়। এটি CHAAYASURGICAL.COM এবং আপনার মধ্যকার End-User লাইসেন্স এগ্রিমেন্ট, যাতে লাইসেন্সর বা আমরা হচ্ছি CHAAYASURGICAL.COM এবং আপনি হচ্ছেন গ্রাহক কিংবা কাস্টমার।
<br />
আমাদের ওয়েবসাইট ভিজিট এবং/অথবা আমাদের কাছ থেকে কোন প্রোডাক্ট ক্রয় করার মাধ্যমে আপনি আমাদের ওয়েবসাইটের একজন ইউজার হলেন এবং আমাদের সার্ভিসের সাথে সংযুক্ত হলেন এবং আমাদের “Terms of Service”, “Terms of use” অথবা “Terms” এর সাথে সম্মতি পোষন করলেন। এই <span className='font-semibold'>টার্মস এবং কন্ডিশন</span> গুলো সকল ওয়েবসাইট ইউজার, যারা ব্রাউজ করছেন, ভেন্ডর, কাস্টমার, মার্চেন্টস, এফিলিয়েট প্রোগ্রামার এবং/অথবা কন্টেন্ট কন্ট্রিবিউটরদের জন্য প্রযোজ্য।
<br />
যেকোন সময় আপনি এই পেজটি ভিজিট করার মাধ্যমে আমাদের আপডেটেড <span className='font-semibold'>টার্মস এবং কন্ডিশন</span> গুলো সম্পর্কে পড়তে এবং জানতে পারবেন। তাই, আমাদের টার্মস এন্ড কন্ডিশনের নতুন ফিচার, নতুন যোগ কিংবা নতুন সেকশনে ও আপনি সম্মত আছেন বলে ধরে নেয়া হবে।
</p>
               </section>
               <div className="space-y-4">
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
    
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg  text-gray-900 font-semibold">
      সাধারন কন্ডিশন
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    প্রোডাক্ট প্রাইস এবং প্রোডাক্ট স্টক
যেকোন প্রোডাক্ট এর প্রাইস এবং প্রোডাক্ট টি এভেইলেবল আছে কি না সেটা পুরোপুরি নির্ভর করে প্রোডাক্ট এর স্টক এর ওপর। যদি কোন প্রোডাক্ট বা সার্ভিস এভেইলেবল না থাকে তাহলে CHAAYASURGICAL.COM যত দ্রুত সম্ভব আপনাকে জানাবে এবং সিমিলার বা অলটারনেটিভ প্রোডাক্ট সাজেস্ট করবে অথবা এডভান্স পেমেন্ট করা থাকলে সেটা রিফান্ড পলিসি অনুযায়ী রিফান্ড করবে। আমাদের রিফান্ড পলিসি সম্পর্কে বিস্তারিত জানতে রিফান্ড পলিসি সেকশন দেখে নিতে পারেন।
<br />
আমাদের ওয়েবসাইট CHAAYASURGICAL.COM ভিজিট করার মাধ্যমে বা ওয়েবসাইট থেকে কিছু ক্রয় করার মাধ্যমে আপনি সম্মতি দিচ্ছেন যে ব্যাবসার ধরন, প্রাকৃতিক অবস্থা কিংবা বৈশ্বিক অবস্থার, ইনকামিং স্টক বা সোল্ড আউট হবার কারনে অর্ডার প্লেস করার পরও প্রোডাক্ট স্টক না থাকার কারনে কাস্টমারকে সিমিলার কিংবা অল্টারনেটিভ প্রোডাক্ট সাজেস্ট করা হতে পারে অথবা পুরো অর্ডারটিই ক্যান্সেল করা হতে পারে।
<br />
আমাদের সাইটের যেকোন প্রোডাক্ট এর প্রাইস কোন প্রকার নোটিফিকেশন ছাড়াই বা বার্তা ছাড়াই পরিবর্তন হতে পারে। আমরা সর্বাত্মক চেষ্টা করি আমাদের সাইটের প্রাইস গুলো সঠিক রাখতে, কিন্তু সময়ের সাথে সাথে দাম পরিবর্তন হতে পারে। এক্ষেত্রে অর্ডার ডেলিভারিতে পাঠানোর আগেই আপনাকে জানানো হবে এবং আপনি চাইলে অর্ডারটা নিতে পারেন কিংবা ক্যান্সেল ও করতে পারেন। ছায়া সার্জিক্যাল যেকোন সময় যেকোন সার্ভিস বা অফার বা ডেলিভারি বন্ধ করা, পরিবর্তন কিংবা পরিবর্ধন করার অধিকার রাখে। ছায়া সার্জিক্যাল, আপনি বা অন্য কারো কাছে এসব পরিবর্তনের জন্য দায়বদ্ধ থাকবেনা।

    </p>
  </details>

  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      প্রোডাক্টস
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    আমাদের সকল প্রোডাক্ট CHAAYASURGICAL.COM এর মাধ্যমে অনলাইনে এভেইলেবল রয়েছে। প্রোডাক্ট গুলোর পরিমান সীমিত সংখ্যক ও হতে পারে, তাই রিটার্ন এবং এক্সচেঞ্জ সুবিধা কেবল আমাদের Return Policy অনুযায়ী প্রসেস করা হবে।
<br />
CHAAYASURGICAL.COM সর্বাত্মক চেষ্টা করে সাইটের সকল প্রোডাক্ট এর কালার, সাইজ বা অন্য কোন ভেরিয়েশন থাকলে তা সঠিকভাবে ওয়েবসাইটে দেখানোর জন্য কিংবা বর্ণনা করার জন্য এবং সিলেকশনের অপশন দেয়ার। তারপর ও ইউজারের ডিভাইস সেটিংস, ডিভাইস মডেল, ওএস রিজিয়ন কিংবা কালার ক্যালিব্রেশন এর জন্য প্রোডাক্ট এর কালার কিংবা সাইজ ভিন্ন দেখা যেতে পারে। তাই CHAAYASURGICAL.COM নিশ্চয়তা দিতে পারেনা যে প্রোডাক্ট বাস্তবে দেখতে হুবহু সাইটে দেখানো প্রোডাক্ট এর ছবির মত হবে। যদি কোন প্রোডাক্ট ওয়েবসাইটের বর্ননার সাথে না মিলে, এক্ষেত্রে আপনি চাইলে প্রোডাক্ট টি অব্যাবহৃত অবস্থায় আমাদের Return and Replacement Policy অনুযায়ী রিটার্ন করতে পারেন। তাছাড়া, যেকোন প্রোডাক্ট এর স্টক কে সীমিত করার, নোটিফিকেশন ছাড়াই প্রাইস কিংবা বর্ণনা পরিবর্তন করার অধিকার আমরা সংরক্ষন করি।

    </p>
  </details>
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      বিলিং এবং একাউন্ট ইনফরমেশন সঠিক দেয়া
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    আমাদের কাছে প্লেস করা আপনার যেকোন অর্ডার আমরা প্রত্যাখ্যান করা, যেকোন অর্ডার, প্রি-অর্ডার এ প্রোডাক্ট সংখ্যা সীমিত বা ক্যান্সেল করার অধিকার রাখি। এই বাধ্যবাধকতাটি সেইম একাউন্ট, সেইম বিলিং এড্রেস, সেইম পেমেন্ট একাউন্ট, এবং/অথবা সেইম শিপিং এড্রেস হলেও কার্যকর হতে পারে। যেকোন অর্ডার ক্যান্সেল, প্রোডাক্ট পরিমান সীমিতকরণ, প্রোডাক্ট পরিমান ক্যান্সেল করার ক্ষেত্রে আমরা প্লেস করা অর্ডার ইনফরমেশনে থাকা কন্টাক্ট নাম্বার অথবা মেইল এড্রেস এর মাধ্যমে কাস্টমারের সাথে যোগাযোগ করার সর্বাত্মক চেষ্টা করবো। কোন স্পেশাল অফারের ক্ষেত্রে, আমাদের জাজমেন্টের মাধ্যমে আমরা যদি মনে করি যে, কোন ডিলার, ডিস্ট্রিবিউটর বা রিসেলার অর্ডার করেছেন, সেই অর্ডার ক্যান্সেল করার ও অধিকার রাখি আমরা।
<br />
একজন ওয়েবসাইট ইউজার কিংবা ক্রেতা হিসেবে আমাদের কাছ থেকে প্রতিটা অর্ডারে আপনি আপনার সম্পূর্ন সঠিক একাউন্ট ইনফরমেশন আমাদেরকে প্রদান করতে সম্মতি প্রকাশ করছেন। এছাড়া ও ক্রেতা হিসেবে প্রতিনিয়ত আপনি আপনার একাউন্ট ইনফরমেশন, মেইল এড্রেস, কন্টাক্ট নাম্বার এবং পেমেন্ট একাউন্ট ডিটেইলস আপডেট করতে সম্মতি প্রকাশ করছেন, যাতে করে আমরা আপনার ট্রাঞ্জেকশন সম্পন্ন করতে পারি এবং প্রয়োজনে আপনার সাথে যোগাযোগ করে দ্রুত প্রোডাক্ট বা সেবা প্রদান করতে পারি।
<br />
একটা ফোন নাম্বার বা মেইল এড্রেস অথবা একাউন্ট ইনফরমেশন দিয়ে কাস্টমার একাধিক একাউন্ট রেজিস্ট্রেশন করতে পারবেনা। যদি কোনভাবে করতে সক্ষমও হন, আমাদের অফার, ডিস্কাউন্ট, ডিলস, কুপন কিংবা আকস্মিক অফার একের অধিক নিতে পারবেন না এবং সাবমিট করা অর্ডার ক্যান্সেল হতে পারে।

    </p>
  </details>
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      ডিসকাউন্ট
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    কুপন কোড, প্রমো কোড, ডিস্কাউন্ট অফার, বা সাইনআপ অফার মুলত প্রোডাক্ট এর সাধারন প্রাইস কে কমিয়ে দেয়। ডিসকাউন্ট কুপন, গিফট কার্ড এর অর্ডার সাকসেস হবার পর সেটা আর রিফান্ড, রিটার্ন অথবা এক্সেঞ্জ হবেনা। এই পলিসি অনুযায়ী সেইম ফোন নাম্বার বা মেইল এড্রেস দিয়ে ক্রিয়েট করা কোন কাস্টমার একের অধিকবার ডিস্কাউন্ট বা অফার নিতে পারবেন না। প্রমোশনাল এসএমএস কিংবা অফারের ব্যানারের কন্টেন্টে শুধুমাত্র অফারের মেইন কন্টেন্ট লিখা থাকবে, বিস্তারিত টার্মস এবং কন্ডিশুন গুলো ওয়েবসাইটে উল্লেখ থাকে, তাই অফার নেয়ার আগে টার্মস গুলো দেখ নেয়ার সুযোগ রয়েছে। CHAAYASURGICAL.COM কোন প্রকার পূর্ব অবগতি ছাড়াই যেকোন অফার যেকোন সময় সংশোধন, পরিবর্তন, পরিবর্ধন বা বাতিল করার অধিকার রাখে।
    </p>
  </details>
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      থার্ড পার্টি লিংক
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    বেস্ট কাস্টমার সার্ভিস দেয়ার জন্য কিছু কিছু সার্ভিস আছে যেগুলো আমরা প্রোভাইড করলেও কিছু ক্ষেত্রে থার্ড পার্টি সার্ভিস এর সেবা থাকতে পারে। যেসব ক্ষেত্রে আমরা থার্ড পার্টি প্রোভাইডরের লিংক প্রোভাইড করি, সেসব ক্ষেত্রে লিংক প্রবেশের মাধ্যমের আপনি থার্ড পার্টি ওয়েবসাইটে যাবেন, যাদের সাথে আমরা এফিলিয়েটেড না। এসব থার্ডপার্টি ওয়েবসাইট লিংক ব্যাবহার করে সার্ভিস ব্যাবহার গ্রহন করলে, সেক্ষেত্রে কোন সমস্যা হলে সেই দায়ভার বিডিশপের না।
<br />
থার্ড পার্টি এই ওয়েবসাইট গুলো থেকে কোন ড্যামেজ প্রোডাক্ট, সার্ভিস, রিসোর্স, কন্টেন্ট কিংবা ট্রাঞ্জেকশন এর মাধ্যমে ক্ষতিগ্রস্থ হলে সেই দায়ভার ছায়া সার্জিক্যাল নিবেনা। থার্ডপার্টি থেকে কোন প্রোডাক্ট নেয়ার আগে কিংবা ট্রানজেকশন করার আগে তাদের পলিসি সম্পর্কে বিস্তারিত জেনে নেয়ার পরামর্শ থাকল। থার্ডপার্টি থেকে নেয়া যেকোন প্রোডাক্ট রিলেটেড কমপ্লেইন, ক্লেইম, কিংবা প্রশ্ন থার্ডপার্টিদের কে করতে হবে।

    </p>
  </details>
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      ভুল ইনফরমেশন এবং ত্রুটি
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    অনাকাঙ্ক্ষিতভাবে আমাদের ওয়েবসাইটে এমন কিছু প্রোডাক্ট বা সার্ভিস সম্পর্কে ভুল তথ্য থাকতে পারে। যেমন, টাইপিং ভুল, ভুল ইনফরমেশন অথবা ত্রুটি, যা যেকোন প্রোডাক্ট এর বিস্তারিত, মূল্য, প্রমোশন, অফার বা প্রোডাক্ট ডেলিভারি চার্জ কিংবা প্রোডাক্ট স্টক সম্পর্কে হতে পারে। তাই পূর্ব ঘোষনা ছাড়াই এধরনের ভুল ইনফরেশন কারেক্ট করার বা প্রয়োজনে পরিবর্তন করার অধিকার আমাদের রয়েছে। ভুলে কোন প্রোডাক্ট এর দাম অস্বাভাবিকভাবে কমে গেলে এবং সেই প্রোডাক্ট এর অর্ডার করলেও সেই অর্ডার ক্যান্সেল করা হতে পারে। যেমন ১২০০ টাকার প্রোডাক্টের প্রাইস যদি ভুলে ১২.০০ হয়ে যায় এমন ক্ষেত্রে পেমেন্ট করা অর্ডারও ক্যান্সেল করে রিফান্ড করা হতে পারে।
    </p>
  </details>
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      অর্ডার ক্যান্সেল
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    CHAAYASURGICAL.COM সব সময়ই অরিজিনাল এবং অথেনটিক প্রোডাক্ট বিক্রয় করে। তাই, যেকোন প্রোডাক্ট অথরাইজড ভেন্ডর থেকে রিসিভ করে ডেলিভারির আগে কোয়ালিটি চেক করা হয়। তাই, কোন প্রোডাক্ট এর কোয়ালিটি চেক করার পর প্রোডাক্ট এ কোন সমস্যা থাকলে ছায়া সার্জিক্যাল সেই অর্ডার ক্যান্সেল করার অধিকার রাখে। কারন, আমরা চেষ্টা করছি আমাদের গ্রাহকদেরকে বেস্ট শপিং এক্সপেরিয়েন্স প্রদান করার। এছাড়া ও কোন প্রোডাক্ট স্টক না থাকলে কিংবা স্টক আউট হয়ে গেলেও ছায়া সার্জিক্যাল সেই অর্ডার টি ক্যান্সেল করার অধিকার রাখে। কারন, কিছু কিছু কারনে প্রোডাক্ট স্টক আগে থেকে বোঝা যায়না। যেমন, অপ্রত্যাশিত ইনভেন্টরি সমস্যা, ওয়েবসাইট ম্যানেজমেন্ট সমস্যা, ভেন্ডর স্টক আপডেট সমস্যা বা অপ্রত্যাশিত অন্য কোন সমস্যা বা হঠাত কোন প্রোডাক্ট এর চাহিদা বেড়ে গিয়ে স্টক আউট হয়ে গেলে এবং কোন অতিরিক্ত অর্ডার থাকলে তা ক্যান্সেল এবং রিফান্ড করা হতে পারে।
    </p>
  </details>
  <details
    className="group border-l-4 border-primary bg-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary className="flex items-center justify-between cursor-pointer">
      <h2 className="text-lg font-semibold text-gray-900">
      নিষিদ্ধ ব্যবহার
      </h2>

      <span
        className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
    যেসব কারনে আমাদের ওয়েবসাইট ব্যাবহারে নিষেধাজ্ঞা রয়েছে, নিম্নে তা বর্ননা করা হলো।
<br />
(ক) অনৈতিক কাজে ব্যাবহার করা।<br />
(খ) অনৈতিক কাজে কাউকে প্ররোচিত করার জন্য ব্যাবহার করা।<br />
(গ) যেকোন আন্তর্জাতিক, ফেডারেল, প্রাদেশিক বা জাতীয় প্রবিধান, রুলস, আইন, অথবা স্থানীয় নিয়ম অমান্য করার জন্য ব্যাবহার করা।<br />
(ঘ) আমাদের বা অন্য কারো মেধা শক্তির অধিকার লঙ্ঘন করার জন্য ব্যাবহার করা।<br />
(ঙ) লিঙ্গ, যৌন প্রবণতা, ধর্ম, জাতি, বয়স, জাতীয় উৎপত্তি, বা অক্ষমতার উপর ভিত্তি করে হয়রানি, অপব্যবহার, অপমান, ক্ষতি, বদনাম, অপবাদ, অসম্মান বা ভয় দেখানোর জন্য ব্যাবহার করা।<br />
(চ) ভুল বা মিথ্যে তথ্য সরবরাহের জন্য।<br />
(ছ) ভাইরাস কিংবা মালিশয়াস কোড আপলোড করা যা সাইটের স্বাভাবিক কার্যক্ষমতায় ব্যাঘাত ঘটাবে এবং যার জন্য অন্যরা ক্ষতিগ্রস্ত হবে এমন কাজে ব্যাবহার করা।<br />
(জ) অন্যদের পার্সোনাল ইনফরমেশন বের করার জন্য ব্যাবহার করা।<br />
(ঝ) স্প্যাম, ফিশ, ফার্ম, প্রিটেক্সট, স্পাইডার, ক্রল, বা স্ক্র্যাপ এর মত নিষিদ্ধ কাজে ব্যাবহার করার জন্য।<br />
(ঞ) কোন অশ্লীল বা অনৈতিক উদ্দেশ্যে ব্যাবহার করলে।<br />
(চ) সার্ভিস বা ওয়েবসাইট সংশ্লিষ্ট অথবা ইন্টারনেট সিকিউরিটি বৈশিষ্টে হস্তক্ষেপ করা বা বাধা দেওয়া।<br />

এই নিষিদ্ধ কাজগুলো করার কারনে আমরা আপনার সার্ভিস ইউজেস কিংবা একাউন্ট টার্মিনেট করার অধিকার রাখি।

    </p>
  </details>
</div>

          </div>

               </div>
  </div>
</div>
{signInError}
<div className="col-span-6">
     <input onClick={()=>setAgree(!agree)} type="checkbox" name="trems" id="terms" className='accent-primary'/>
     <label className={agree?'text-primary ml-2':'text-black ml-2'} htmlFor="terms">I agree with the </label><label htmlFor="my-modal-3"><span className='text-red-600 underline cursor-pointer' >terms and conditions.</span></label>
   </div>
      </div>
      <div className="col-span-6 mt-2">
            {
              agree?<input type="submit"
              className="block w-full rounded-md btn-primary py-2 text-xl font-semibold text-white transition hover:shadow-lg cursor-pointer"
            value="Register"/>:<input type="submit"
            className="block w-full rounded-md btn-primary py-2 text-xl font-semibold text-white transition hover:shadow-lg hover:text-white hover:bg-gray-300  bg-gray-300 cursor-not-allowed btn-disabled"
          value="Register"/>
            }
          </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
           <span className="border-b  w-1/1"></span>
            <NavLink to="/login" className="text-xs text-gray-500 ">Already have an account?  <span className='text-primary underline font-bold '>Log in</span> </NavLink>
            <span className="border-b  w-1/1"></span>
            </div>
                  </div>
              </div>

          </div>
     );
};
export default Registration;