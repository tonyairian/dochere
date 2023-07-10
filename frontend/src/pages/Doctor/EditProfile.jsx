import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DoctorNavbar from "../../components/DoctorNavbar";
import { doctorInstance } from "../../utils/axios/axios";
import { DOCTOR_UPDATE_PROFILE } from "../../utils/axios/consturls";
import { Link, useNavigate } from "react-router-dom";
const image_path = "http://localhost:4000/images/";
const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, number, profilePicture } = location.state;
  const image = profilePicture;
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userNumber, setUserNumber] = useState(number);
  const [userPassword, setUserPassword] = useState("");
  const [img, setImg] = useState("");
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
      const { data } = await doctorInstance.post(
        DOCTOR_UPDATE_PROFILE,
        formData
      );

      if (data.doctorProfileUpdated) {
        navigate("/doctor/profile");
      }
    } catch (error) {
      navigate("*");
    }
  };
  return (
    <>
      <DoctorNavbar />
      <div className="">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Edit Profile
                </h1>

                <div className="text-center">
                  <img
                    // className="mx-auto mb-4 w-32 rounded-lg"
                    src={image_path + image}
                    alt="Avatar"
                  />

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
                      value={userName}
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
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required=""
                      disabled
                    />
                  </div>

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
                      value={userNumber}
                      onChange={(e) => setUserNumber(e.target.value)}
                      required=""
                    />
                  </div>

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
      </div>
    </>
  );
};

export default EditProfile;
