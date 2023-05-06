import React from 'react';
import "../../App.css"
import { Link, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import Loading from './Loading';
const NavbarForLargeScreen = () => {
  const [user, loading, error] = useAuthState(auth);
  if(loading){
    return <Loading/>
  }
  if(error){
    console.log(error);
  }
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  let navitems=<>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/authors">Authors</NavLink></li>
  <li><NavLink to="/faq">FAQ</NavLink></li>
  <li><NavLink to="/deshboard">Deshboard</NavLink></li>
  <li><NavLink to="/contact">Contact</NavLink></li>
  </>
     return (
          <div className=' bg-white border-b-4 border-primary lg:block hidden'>
               <div className="navbar bg-base-100 ">
  <div className="navbar-start">
    <Link to="/" className=" text-primary rounded  cursor-pointer text-4xl logo">MindScape</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {navitems}
    </ul>
  </div>
  <div className="navbar-end">
   
    {user? <button onClick={logout}>Sign out</button>:  <Link to="/login" className="bg-base-200 px-3 rounded font-bold py-1 cursor-pointer hover:text-primary">Login</Link>}
  </div>
</div>
          </div>
     );
};
export default NavbarForLargeScreen;