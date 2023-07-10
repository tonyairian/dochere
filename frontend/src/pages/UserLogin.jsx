import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axios/axios";
import {
  USER_LOGIN,
  FORGOT_PASSWORD,
  GOOGLE_LOGIN,
} from "../utils/axios/consturls";
import Cookies from "universal-cookie";
import React from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserLogin = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
    const user = cookie.get("userToken");
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const UserLoginHandler = async (e) => {
    e.preventDefault();
    const userDetails = {
      email: userEmail,
      password: userPassword,
    };
    try {
      const { data } = await axios.post(USER_LOGIN, userDetails);
      console.log();
      if (data.blocked) {
        alert("you are blocked");
      }
      if (data.invalidEmail) {
        toast.error("Invalid email", {
          autoClose: 2000,
          theme: "dark",
        });
      } else if (data.validPassword === false) {
        toast.error("Wrong password", {
          autoClose: 2000,
          theme: "dark",
        });
      } else if (data.validPassword === true) {
        if (data.emailVerified === true) {
          // cookie.set("userToken", `${data.token}`, { path: "/" });
          navigate("/");
        } else {
          toast.warn("Verify Your Email!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      navigate("*");
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(FORGOT_PASSWORD, { userEmail });

      if (data.invalisEmail === true) {
        toast.error("Email not registered", {
          autoClose: 2000,
          theme: "dark",
        });
      } else if (data.invalisEmail === false) {
        toast.success("Check your Email", {
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      // console.log(error);
      navigate("*");
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              src="./logo.svg"
              alt="logo"
            />
            .DOCHERE
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Login to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => UserLoginHandler(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
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
                {/* <div className="text-right">

                <Link  className="text-sm font-medium  text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                </div> */}
                <div className="text-sm font-light text-gray-500 dark:text-gray-400 text-right">
                  {/* Click here if you */}
                  <Link
                    onClick={forgotPassword}
                    className="text-sm font-medium  text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>

                <LoginSocialGoogle
                  client_id="882986168762-c6h82v5er2l58rlr6uqjljoimqj0e5ir.apps.googleusercontent.com"
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ provider, data }) => {
                    axios.post(GOOGLE_LOGIN, data).then((response) => {
                      const { data } = response;
                      if (response) {
                        cookie.set("userToken", `${data.token}`, {
                          path: "/",
                        });
                        navigate("/");
                      } else {
                        console.log("error");
                      }
                    });
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <button type="button" className="login-with-google-btn">
                    Login with Google
                  </button>
                </LoginSocialGoogle>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                  Dont have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default UserLogin;
