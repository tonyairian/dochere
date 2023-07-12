// import { Link, useNavigate } from "react-router-dom";
// import UserNavbar from "../components/UserNavbar";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { updateUserImage } from "../utils/Redux/userSlice";
// // import axios from "../utils/axios/axios";
// import axios from 'axios';
// import { UPDATE_PROFILE } from "../utils/axios/consturls";
// const image_path = "http://localhost:4000/images/";
// const EditUserProfile = () => {
//   const User = useSelector((store) => store.user);
//   const image = User.profileImg;
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState(User.name);
//   const [userEmail, setUserEmail] = useState(User.email);
//   const [userNumber, setUserNumber] = useState(User.number);
//   const [userPassword, setUserPassword] = useState("");
//   const [img, setImg] = useState("");
//   const dipatch = useDispatch();
//   const fileUpl = (e) => {
//     setImg(e.target.files[0]);
//   };
//   const UserUpdateProfileHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", userName);
//     formData.append("email", userEmail);
//     formData.append("image", img);
//     formData.append("number", userNumber);
//     formData.append("password", userPassword);
//     try {
//       // const { data } = await axios.post(
//       //   "http://localhost:4000/update-profile",
//       //   formData
//       // );
//       const { data } = await axios.post(UPDATE_PROFILE, formData);
//       dipatch(updateUserImage(data.userDetails[0].profilePicture));
//       if (data.userProfileUpdated) {
//         navigate("/profile");
//       }
//     } catch (error) {
//       navigate("*");
//       // console.log(error);
//     }
//   };

//   return (
//     <>
//       <UserNavbar />
//       <section className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
//                 Edit Profile
//               </h1>

//               <div className="text-center">
//                 <img src={image_path + image} alt="Avatar" />

//                 <label className="relative inline-flex items-center justify-center  mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-900 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 p-3 text-white mt-5">
//                   Choose Image
//                   <input
//                     type="file"
//                     size="60"
//                     style={{ display: "none" }}
//                     id="image"
//                     name="image"
//                     onChange={fileUpl}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>

//               <form
//                 className="space-y-4 md:space-y-6"
//                 onSubmit={(e) => UserUpdateProfileHandler(e)}
//               >
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Full Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Full Name"
//                     // value={userName}
//                     // onChange={(e) => setUserName(e.target.value)}
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     required=""
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     value={userEmail}
//                     onChange={(e) => setUserEmail(e.target.value)}
//                     required=""
//                     disabled
//                   />
//                 </div>

//                 {User.password ? (
//                   <div>
//                     <label
//                       htmlFor="mobile"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Mobile
//                     </label>
//                     <input
//                       id="mobile"
//                       name="mobile"
//                       type="tel"
//                       placeholder="mobile no"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={userNumber}
//                       onChange={(e) => setUserNumber(e.target.value)}
//                       required=""
//                     />
//                   </div>
//                 ) : (
//                   <></>
//                 )}

//                 {User.number ? (
//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       change Password
//                     </label>
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="••••••••"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={userPassword}
//                       onChange={(e) => setUserPassword(e.target.value)}
//                       required=""
//                     />
//                   </div>
//                 ) : (
//                   <></>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Save Changes
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EditUserProfile;

import { Link, useNavigate, useLocation } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserImage } from "../utils/Redux/userSlice";
import axios from "../utils/axios/axios";
import { UPDATE_PROFILE } from "../utils/axios/consturls";
// const image_path = "http://localhost:4000/images/";
const image_path = "https://server.dochere.online/images/";
const EditUserProfile = () => {
  const location = useLocation();
  const { name, profilePicture, email, number } = location.state.userDetails;
  console.log(location.state.userDetails);
  const User = useSelector((store) => store.user);
  const image = User.profileImg;
  const navigate = useNavigate();
  const [userName, setUserName] = useState(User.name);
  const [userEmail, setUserEmail] = useState(User.email);
  const [userNumber, setUserNumber] = useState(User.number);
  const [userPassword, setUserPassword] = useState("");
  const [img, setImg] = useState("");
  const dipatch = useDispatch();
  const fileUpl = (e) => {
    setImg(e.target.files[0]);
  };
  const UserUpdateProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("image", img);
    formData.append("number", userNumber);
    formData.append("password", userPassword);
    try {
      // const { data } = await axios.post(
      //   "http://localhost:4000/update-profile",
      //   formData
      // );
      const { data } = await axios.post(UPDATE_PROFILE, formData);
      dipatch(updateUserImage(data.userDetails[0].profilePicture));
      if (data.userProfileUpdated) {
        navigate("/profile");
      }
    } catch (error) {
      navigate("*");
      // console.log(error);
    }
  };

  return (
    <>
      <UserNavbar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Edit Profile
              </h1>

              <div className="text-center">
                <img src={image_path + profilePicture} alt="Avatar" />

                <label className="relative inline-flex items-center justify-center  mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-900 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 p-3 text-white mt-5">
                  Choose Image
                  <input
                    type="file"
                    size="60"
                    style={{ display: "none" }}
                    id="image"
                    name="image"
                    onChange={fileUpl}
                    accept="image/*"
                  />
                </label>
              </div>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => UserUpdateProfileHandler(e)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    // value={userName}
                    // onChange={(e) => setUserName(e.target.value)}
                    value={name}
                    onChange={(e) => setUserName(e.target.value)}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required=""
                    disabled
                  />
                </div>

                {User.password ? (
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="mobile no"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={number}
                      onChange={(e) => setUserNumber(e.target.value)}
                      required=""
                    />
                  </div>
                ) : (
                  <></>
                )}

                {User.number ? (
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      change Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required=""
                    />
                  </div>
                ) : (
                  <></>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUserProfile;
