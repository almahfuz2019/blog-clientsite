import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import UseCategory from "../../Hooks/UseCategory";
import axios from "axios";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../Shired/Loading";
import UseToken from "../../Hooks/UseToken";
const AddVlog = () => {
  const { categorys, loadCategorys } = UseCategory();
  const [user, loading, error] = useAuthState(auth);
  const [image, setimage] = useState("");
  const [description, setDescription] = useState("");
  const [token, authUser] = UseToken(user);
  useEffect(() => {
    loadCategorys();
  }, []);

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
      .catch((error) => {});
  };
  let today = new Date();
  let year = today.getFullYear();
  let mes = today.getMonth() + 1;
  let dia = today.getDate();
  var timewithmenits =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let data = dia + "/" + mes + "/" + year;
  let date = data + "," + timewithmenits;
  console.log(date);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddProduct = (data) => {
    const submitData = { ...data, description, image, date };

    axios
      .post("http://localhost:5000/createblog", { ...submitData })
      .then((response) => {
        console.log(response);
        toast.success("Submitted Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });

        console.log(submitData);

        data.target.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          { error },
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
    if (loading) {
      return <Loading />;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddProduct)}>
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
                  type="text"
                  {...register("title", {
                    required: "Title is Required",
                  })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Author Name
                </label>
                <input
                  value={user?.displayName || ""}
                  type="text"
                  {...register("authorName")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Author Email
                </label>
                <input
                  value={user?.email || ""}
                  type="text"
                  {...register("authorEmail")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  {" "}
                  Keywords
                </label>
                <input
                  type="text"
                  {...register("keywords")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
                {errors.keywords && (
                  <p className="text-red-500">{errors.keywords.message}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  {" "}
                  Description
                </label>
                <ReactQuill
                  className="h-32 mb-5"
                  theme="snow"
                  onChange={setDescription}
                />
              </div>
              <div className="relative mb-4 mt-5">
                <label className="leading-7 text-sm text-gray-600">
                  Select a category
                </label>
                <select
                  {...register("category")}
                  className="select w-full  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 rounded"
                >
                  {categorys.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  {" "}
                  Select status
                </label>
                <select
                  {...register("status")}
                  className="select w-full  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 rounded"
                >
                  <option value="waiting">Waiting </option>
                  {authUser?.role ==="Admin"&&
                  <option value="Available">Available</option>}
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
                  required
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>
              <input
                className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
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
export default AddVlog;
