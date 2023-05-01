import axios from 'axios';
import { useState } from 'react';
const Category = () => {
  // categorys,setCategorys
  // comments,setComments 
     const [categorys,setCategorys]=useState([]);
     const [catagorys,setCatagorys]=useState([]);
     const [error,setError]=useState("");
    //  load all categorys 
     const loadCategorys=async()=>{
       try {
         const response=await axios.get(`http://localhost:5000/readcategory`);
         setCategorys(response.data);
       } catch (error) {
         setError("something is wrong.Please try again")
       }
      }
      // delete category 
      const handleCatagoryDelete=async(id)=>{
        const proceed=window.confirm("are you sure you want to delete?");
        if(proceed){
             await axios.delete(`http://localhost:5000/deletecategory/${id}`)
             .then(response=>{
                  if(response.data.deletedCount>0){
                       const deletedremaining=catagorys.filter(item=>item._id !==id);
                       setCatagorys(deletedremaining)
                  }
             })
        }
   }
  //  create category 
  
     return {categorys,loadCategorys,setCategorys,handleCatagoryDelete}
};
export default Category;