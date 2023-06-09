import { NavLink, Outlet } from 'react-router-dom';
import { AiOutlineAppstoreAdd, AiOutlineMail, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";
import { CiShoppingBasket } from "react-icons/ci";
import {  TbShoppingCartDiscount } from "react-icons/tb";
import { FaAlignLeft } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import UseToken from '../Hooks/UseToken';
import UseDataCount from '../Hooks/UseDataCount';
const Deshboard = () => {
  const [user] = useAuthState(auth);
  const [token, authUser] = UseToken(user);
 const {blogsCount,categoryCount,userCount,contactCount, waitingBlogsCount}=UseDataCount();
     return (
     <>
     <div className="drawer drawer-start drawer-mobile ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
   <div className=' text-end'>
      <label htmlFor="my-drawer-2" tabIndex={0} className="btn btn-ghost lg:hidden ">
     <i className='font-bold'><FaAlignLeft className='text-2xl font-extrabold rotate-180'/></i>
      </label>
   </div>
   <Outlet/>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-60  bg-gray-800  text-white">
    <div className="relative ">
     <div className="text-gray-100 absolute ml-4 inset-0 m-auto w-4 h-4">
     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" />
     <circle cx={10} cy={10} r={7} />
     <line x1={21} y1={21} x2={15} y2={15} />
     </svg>
     </div>
     <input className=" bg-gray-500 focus:outline-none rounded w-full text-sm text-white  pl-10 py-2" type="text" placeholder="Search" />
         </div>
     <li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
     <NavLink to="profile" className="flex items-center  active:bg-primary ">
      <AiOutlineUsergroupAdd/>
      <span className="text-sm  ml-2">Profile </span>
        </NavLink></li>
         <li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
     <NavLink to="/deshboard" className="flex items-center  active:bg-primary ">
     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" />
     <rect x={4} y={4} width={6} height={6} rx={1} />
     <rect x={14} y={4} width={6} height={6} rx={1} />
     <rect x={4} y={14} width={6} height={6} rx={1} />
     <rect x={14} y={14} width={6} height={6} rx={1} />
     </svg>
     <span className="text-sm  ml-2">Basic Info</span>
     </NavLink></li>
     {authUser?.role ==="Admin" && user?.emailVerified===true ? <li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
     <NavLink to="addvlog" className="flex items-center  active:bg-primary ">
     <AiOutlineAppstoreAdd/>
     <span className="text-sm  ml-2">Add Blog</span>
     </NavLink></li>:""}
     {authUser?.role==="Author" && user?.emailVerified===true ?<li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
     <NavLink to="addvlog" className="flex items-center  active:bg-primary ">
     <AiOutlineAppstoreAdd/>
     <span className="text-sm  ml-2">Add Blog</span>
     </NavLink></li>:""}
     {authUser?.role ==="Admin" && user?.emailVerified===true ? <li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
       <NavLink to="blogs" className="flex items-center  active:bg-primary ">
     <BsInfoSquare/>
     <span className="text-sm  ml-2">Blogs <span className='bg-primary rounded p-2 text-white font-bold text-end'>{blogsCount.count}</span></span>
     
     </NavLink></li>:""}
   
     {authUser?.role ==="Admin" && user?.emailVerified===true ?<li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
        <NavLink to="waiting-blogs" className="flex items-center  active:bg-primary ">
     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" />
     <rect x={4} y={4} width={6} height={6} rx={1} />
     <rect x={14} y={4} width={6} height={6} rx={1} />
     <rect x={4} y={14} width={6} height={6} rx={1} />
     <rect x={14} y={14} width={6} height={6} rx={1} />
      </svg>
      <span className="text-sm  ml-2">Waiting Blog <span className='bg-primary rounded p-2 text-white font-bold text-end'>{waitingBlogsCount.count}</span></span>
        </NavLink></li>:""}
        {authUser?.role ==="Admin" && user?.emailVerified===true ? <li className=' text-gray-900 font-bold bg-gray-100 mt-2'>
        <NavLink to="categorys" className="flex items-center  active:bg-primary">
     <TbShoppingCartDiscount/>
      <span className="text-sm  ml-2">Categorys <span className='bg-primary rounded p-2 text-white font-bold text-end'>{categoryCount.count}</span></span>
        </NavLink></li>:""}
        {authUser?.role ==="Admin" && user?.emailVerified===true ?  <li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
        <NavLink to="users" className="flex items-center  active:bg-primary ">
      <CiShoppingBasket/>
      <span className="text-sm  ml-2">Users <span className='bg-primary rounded p-2 text-white font-bold text-end'>{userCount.count}</span></span>
        </NavLink></li>:""}
     
         {authUser?.role==="Author" && user?.emailVerified===true ? <li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
     <NavLink to="manageData" className="flex items-center  active:bg-primary ">
      <AiOutlineUsergroupAdd/>
      <span className="text-sm  ml-2">Your Data </span>
        </NavLink></li>:""}
        
        {authUser?.role ==="Admin" && user?.emailVerified===true ?<li className=' text-gray-900 font-bold bg-gray-100 mt-2 '>
     <NavLink to="contact" className="flex items-center  active:bg-primary text-white">
      <AiOutlineMail className='text-gray-900'/>
      <span className="text-sm text-gray-900 font-bold bg-gray-100 ml-2">Messages <span className='bg-primary rounded p-2 text-white font-bold text-end'>{contactCount.count}</span></span>
      </NavLink></li>:""}
    </ul>
  </div>
</div>
     </>
     );
};
export default Deshboard;