import axios from "axios";
import {  useState } from "react";
// get all blogs 
const AllBlogs = () => {
     const [blog,setBlog]=useState([]);
     const [error,setError]=useState("");
     const allBlogs=async()=>{
      try {
        const response=await axios.get(`http://localhost:5000/readblogs`);
        setBlog(response.data);
      } catch (error) {
        setError("something is wrong.Please try again")
      }
     }
     return{allBlogs,blog,error}
};
export default AllBlogs;