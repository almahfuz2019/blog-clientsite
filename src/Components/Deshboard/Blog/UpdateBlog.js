import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseCategory from "../../Hooks/UseCategory";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Shired/Loading";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import UseToken from "../../Hooks/UseToken";
const UpdateBlog = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [image, setimage] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [user] = useAuthState(auth);
  const [token, authUser] = UseToken(user);
  const { categorys, loadCategorys } = UseCategory();
  const [blog, setBlog] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => {
    console.log({ ...formData, image });
    // Send the updated data to the server
    axios
      .put(`http://localhost:5000/updateblog/${id}`, { ...formData, image })
      .then(response => {
        toast.success('Submitted Successfully', {
                       position: "top-right",
                       autoClose: 1000,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: false,
                       progress: undefined,
                       theme: "colored",
                       });
                       navigate("/deshboard/blogs")
               })
      .catch((error) => console.log(error));
  };
  // first image
  const imageHostKey = "887fe618a11124584e3e5d5893d310bc";
  const firstImageUpload = (event) => {
    const imageurl = event.target.files[0];
    if (event.target.files[0].size > 262144) {
      alert("Your file size is greater than 250KB");
      event.target.value = "";
    }
    const formData = new FormData();
    formData.set("image", imageurl);
    axios
      .post(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, formData)
      .then((res) => {
        setimage(res.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setIsloading(true);
    const url = `http://localhost:5000/readblog/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .finally(() => setIsloading(false));
  }, [id]);
  useEffect(() => {
    loadCategorys();
  }, []);

  if (isloading) {
    return <Loading />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="text-gray-600 body-font relative ">
          <div className="container px-5 sm:py-24 mx-auto flex sm:flex-nowrap flex-wrap ">
            <div className="border-primary border-2 md:w-1/2 bg-white flex flex-col md:mx-auto w-full md:py-8 mt-8 md:mt-0  rounded-md p-5">
              <h2
                className="text-gray-900 text-lg mb-1 
  title-font font-semibold"
              >
                Add a Blog
              </h2>
              <div className="relative mb-4">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Blog title
                </label>
                <input
                  defaultValue={blog?.title}
                  type="text"
                  {...register("title", {})}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Author Name
                </label>
                <input
                  defaultValue={blog.authorName}
                  type="text"
                  {...register("authorName")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Keywords
                </label>
                <input
                  name="keywords"
                  defaultValue={blog.keywords}
                  type="text"
                  {...register("keywords")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  {" "}
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  defaultValue={blog.description}
                ></textarea>
              </div>
              <div className="relative mb-4 mt-5">
                <label className="leading-7 text-sm text-gray-600">
                  Select a category
                </label>
                <select
                  {...register("category")}
                  className="select w-full  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 rounded"
                >
                  {categorys.map((category) => {
                    return (
                      <option
                        key={category._id}
                        selected={blog.category === category.name}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  {" "}
                  Select status
                </label>
                <select
                  defaultValue={blog.status}
                  {...register("status")}
                  className="select w-full  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 rounded"
                >
                  <option value="waiting">Waiting </option>
                  {
                    authUser?.role==="Admin" &&
                  <option value="Available">Available</option>
                  }
                </select>
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  select blog image
                </label>
                <input
                  type="file"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={firstImageUpload}
                />
               <div className="flex justify-center mt-5">
               <img src={blog?.image} alt="" className="w-24 h-24" />
               </div>
              </div>
              <input
                className="text-white bg-primary border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded text-lg"
                value="Submit"
                type="submit"
              />
              <p className="text-xs text-gray-500 mt-3">
                This is very important for your blog.So,be careful.
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};
export default UpdateBlog;
