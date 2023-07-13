import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doctorInstance } from "../utils/axios/axios";
import { DOCTOR_LOGIN ,DOCTOR_FORGOT_PASSWORD} from "../utils/axios/consturls";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DoctorLogin = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const doctor = cookie.get("doctorToken");
  useEffect(() => {
    if (doctor) {
      navigate("/doctor");
    } else {
      navigate("/doctor/login");
    }
  }, []);

  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const doctorLoginHandler = async (e) => {
    e.preventDefault();
    const doctorDetails = {
      email: doctorEmail,
      password: doctorPassword,
    };
    try {
      const { data } = await doctorInstance.post(
        DOCTOR_LOGIN,
        doctorDetails
      );
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
          if (!data.documents) {
            const doctorId = data.doctorId;
            navigate("/doctor/upload-documents", { state: { doctorId } });
          } else if (data.documents) {
            cookie.set("doctorToken", `${data.token}`, { path: "/" });
            navigate("/doctor");
          }
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
      // console.log(error);
      navigate("*");
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await doctorInstance.post(
        DOCTOR_FORGOT_PASSWORD,
        { doctorEmail }
      );
      
      if (data.invalidEmail === true) {
        toast.error("Email not registered", {
          autoClose: 2000,
          theme: "dark",
        });
      } else if (data.invalidEmail === false) {
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
              src="https://dochere.online/logo.svg"
              alt="logo"
            />
            .DOCHERE
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Doctor Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => doctorLoginHandler(e)}
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
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
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
                    value={doctorPassword}
                    onChange={(e) => setDoctorPassword(e.target.value)}
                    required=""
                  />
                </div>
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
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account?{" "}
                  <Link
                    to="/doctor/signup"
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

export default DoctorLogin;
