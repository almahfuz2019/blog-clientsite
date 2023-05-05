import axios from 'axios';
import { useEffect, useState } from 'react';
const UseToken = (user) => {
     const [token,setToken]=useState('');
     useEffect(()=>{
          const email=user?.email;
          const currentUser={email:email};
          console.log(
               "user inside in tokend",user
          );
          console.log(token);
          if(email){
               // console.log(currentUser);
                    //  axios.post('http://localhost:5000/users', currentUser);
                    axios.post('http://localhost:5000/users',currentUser)
                       .then(response => {
                         console.log(response.data);
                         setToken(response.data.token)
                       })
                       .catch(error => {
                         console.error(error);
                       });
          } 
               },[user]);
     
     return [token];
};
export default UseToken;