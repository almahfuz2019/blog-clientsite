import React from 'react';
import "../../App.css"
import { Link, NavLink } from 'react-router-dom';
import { FaAlignLeft } from "react-icons/fa";
const NavbarForMobail = () => {
  let navitems=<>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/authors">Authors</NavLink></li>
  <li><NavLink to="/faq">FAQ</NavLink></li>
  <li><NavLink to="/deshboard">Dashboard</NavLink></li>
  <li><NavLink to="/contact">Contact</NavLink></li>
  </>
     return (
          <div className=' lg:hidden'>
     <div className="flex justify-between items-center bg-white border-b-4 border-primary ">
     <div className="ml-2">
     <Link to="/" className=" text-primary rounded   cursor-pointer text-3xl logo">MindScape</Link>
     </div>
       <div className="flex justify-end">
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn btn-ghost lg:hidden ">
          <i className='font-bold'><FaAlignLeft className='text-2xl font-extrabold rotate-180'/></i>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48 border border-primary border-opacity-30 mr-3">
{navitems}
<li className='relative font-medium  before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition hover:before:scale-100'> <NavLink to="/login">Login</NavLink></li>
      </ul>
    </div>
</div>
     </div>
          </div>
     );
};
export default NavbarForMobail;