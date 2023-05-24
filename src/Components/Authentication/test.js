import React from 'react';
import { useForm } from 'react-hook-form';
function Test() {
     const { register, handleSubmit, watch, errors } = useForm();
     const onSubmit = (data) => {
       console.log(data);
     };
   
     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         <input
           type="password"
           name="password"
           placeholder="Password"
           ref={register({ required: true })}
         />
         {errors.password && <span>This field is required</span>}
   
         <input
           type="password"
           name="confirmPassword"
           placeholder="Confirm Password"
           ref={register({
             required: true,
             validate: (value) => value === watch('password'),
           })}
         />
         {errors.confirmPassword && <span>Passwords do not match</span>}
   
         <button type="submit">Submit</button>
       </form>
     );
   }
   
   export default Test;