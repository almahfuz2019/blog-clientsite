import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const LoadUserComments = () => {
  const {id}=useParams();
  const [comments,setComments]=useState([]);
  const [error,setError]=useState("");
  const loadComments=async()=>{
    try {
      const response=await axios.get(`http://localhost:5000/readblogcomment/${id}`);
      setComments(response.data);
    } catch (error) {
      setError("something is wrong.Please try again")
    }
   }
   useEffect(()=>{
    loadComments();
   },[comments])
     return (
          <div>
            <h1 className='text-xl font-bold border border-primary p-1'>Total Comments: {comments.length}</h1>
              {comments.map(comment=>
                 <div class="relative rounded-lg border border-primary shadow-lg w-full container mt-3" key={comment._id}>
                 <div class="flex items-center gap-4 p-4">
                   <img
                     alt="Women"
                     src="https://www.w3schools.com/howto/img_avatar.png"
                     class="h-12 w-12 rounded-lg object-cover"
                   />
               
                   <div>
                     <p class="font-medium text-gray-900">{comment.userName}</p>
                     <p class="line-clamp-1 text-sm text-gray-500">
                       {comment.userComment}
                     </p>
                   </div>
                 </div>
               </div>
                )}
          </div>
     );
};
export default LoadUserComments;