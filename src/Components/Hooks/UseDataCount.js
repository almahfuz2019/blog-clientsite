import axios from 'axios';
import { useEffect, useState } from 'react';
const UseDataCount = () => {
     const [blogsCount,setBlogsCount]=useState([]);
     const [categoryCount,setCategoryCount]=useState([]);
     const [userCount,setUserCount]=useState([]);
     const [contactCount,setContactCount]=useState([]);
     const [waitingBlogsCount,setWaitingBlogsCount]=useState([]);
     useEffect(()=>{
       fetch("http://localhost:5000/blogscountwithavailable")
       .then(res=>res.json())
       .then(data=>setBlogsCount(data))
   },[])
     useEffect(()=>{
       fetch("http://localhost:5000/categorycount")
       .then(res=>res.json())
       .then(data=>setCategoryCount(data))
   },[])
     useEffect(()=>{
       fetch("http://localhost:5000/userscount")
       .then(res=>res.json())
       .then(data=>setUserCount(data))
   },[])
     useEffect(()=>{
       fetch("http://localhost:5000/contactcount")
       .then(res=>res.json())
       .then(data=>setContactCount(data))
   },[])
     useEffect(()=>{
       fetch("http://localhost:5000/waitingblogscount")
       .then(res=>res.json())
       .then(data=>setWaitingBlogsCount(data))
   },[])
  
     return {blogsCount,categoryCount,userCount,contactCount, waitingBlogsCount}
};
export default UseDataCount;