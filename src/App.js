import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './Components/Client-site/Blogs';
import NavbarForLargeScreen from './Components/Shired/NavbarForLargeScreen';
import BlogDetails from './Components/Client-site/BlogDetails';
import NavbarForMobail from './Components/Shired/NavbarForMobail';
import FAQ from './Components/Client-site/FAQ';
import Login from './Components/Authentication/Login';
import Authors from './Components/Client-site/Authors';
import Contact from './Components/Client-site/Contact';
import Deshboard from './Components/Deshboard/Deshboard';
import BlogLoadByCategory from './Components/Client-site/BlogLoadByCategory';
import BasicInfo from './Components/Deshboard/BasicInfo';
import AddVlog from './Components/Deshboard/Blog/AddVlog';
import Footer from './Components/Shired/Footer';
import AllCategorys from './Components/Deshboard/AllCategorys';
import UpdateCategory from './Components/Deshboard/UpdateCategory';
import ManageBlogs from './Components/Deshboard/Blog/ManageBlogs';
import UpdateBlog from './Components/Deshboard/Blog/UpdateBlog';
import Registration from './Components/Authentication/Registration';
import RequireAuth from './Components/Authentication/RequireAuth';
import ForgetPassword from './Components/Authentication/ForgetPassword';
import ManageData from './Components/Deshboard/userSpacificData/ManageData';

function App() {
  return (
   <div>
    <NavbarForLargeScreen/>
    <NavbarForMobail/>
    <Routes>
      <Route path='/' element={<Blogs/>}/>
      <Route path='/faq' element={<FAQ/>}/>
      <Route path='/authors' element={<Authors/>}/>
      <Route path='/contact' element={<RequireAuth><Contact/></RequireAuth>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/blogs/:category' element={<BlogLoadByCategory/>}/>
      <Route path='/blog/:id' element={<BlogDetails/>}/>
      {/* deshboard nested router  */}
    <Route path='/updatecatagory/:id'  element={<UpdateCategory/>}/>
    <Route path='/updateblog/:id'  element={<UpdateBlog/>}/>
      <Route path='/deshboard' element={<RequireAuth><Deshboard/></RequireAuth>}>
    <Route path='manageData'  element={<RequireAuth><ManageData/></RequireAuth>}/>
    <Route index  element={<BasicInfo/>}/>
    <Route path='addvlog'  element={<AddVlog/>}/>
    
    <Route path='categorys'  element={<AllCategorys/>}/>
    <Route path='blogs'  element={<ManageBlogs/>}/>
    </Route>
    </Routes>
    <Footer/>
   </div>
  );
}

export default App;
