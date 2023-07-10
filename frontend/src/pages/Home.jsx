import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios/axios";
import { HOME, DOCTOR_SPECIALIZATION } from "../utils/axios/consturls";
import Cookies from "universal-cookie";
import UserBanner from "../components/UserBanner";
import UserCard from "../components/UserCard";
import UserContent from "../components/UserContent";
import UserFooter from "../components/UserFooter";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../utils/Redux/userSlice";
import HorizontalLine from "../components/HorizontalLine";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const User = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const user = cookie.get("userToken");
  const [UserDetails, setUserDetails] = useState({});
  const [specialization, setSpecialization] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        navigate("/login");
      } else {
        // const { data } = await axios.get("http://localhost:4000", {
        //   withCredentials: true,
        // });
        const { data } = await axios.get(HOME, {
          withCredentials: true,
        });
        setUserDetails(data);
        if (data.blocked) {
          cookie.remove("userToken");
          navigate("/login");
        } else if (!data.status) {
          cookie.remove("userToken");
          navigate("/login");
        } else {
          dispatch(userLogin(data));
          toast.info(`Welcome ${data.name}`, {
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
    };

    const getDoctorSpecialization = async () => {
      try {
        // const { data } = await axios.get(
        //   "http://localhost:4000/doctor-specialization"
        // );
        const { data } = await axios.get(DOCTOR_SPECIALIZATION);
        setSpecialization(data.specializations);
      } catch (error) {
        // navigate("*");
      }
    };
    verifyUser();
    getDoctorSpecialization();
  }, []);

  return (
    <>
      <UserNavbar />
      <UserBanner />
      <UserCard specialization={{ specialization }} />
      {/* <UserContent/> */}
      <HorizontalLine />
      <UserFooter />
      <ToastContainer />
    </>
  );
};

export default Home;
