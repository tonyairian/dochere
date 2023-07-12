// import DoctorNavbar from "../components/DoctorNavbar";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { doctorInstance } from "../utils/axios/axios";
// import { DOCTOR_HOME } from "../utils/axios/consturls";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { useDispatch, useSelector } from "react-redux";
// import { doctorLogin } from "../utils/Redux/doctorSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const DoctorHome = () => {
//   const doctorRedux = useSelector((store) => store.doctor);
//   const dispatch = useDispatch();
//   const cookie = new Cookies();
//   const doctor = cookie.get("doctorToken");
//   const [doctorDetails, setdoctorDetails] = useState({});
//   const navigate = useNavigate();
//   const doctorId = doctorDetails?.doctor?._id;

//   const verifyDoctor = async () => {
//     try {
//       if (!doctor) {
//         navigate("/doctor/login");
//       } else {
//         // const { data } = await doctorInstance.get(DOCTOR_HOME, {
//         //   withCredentials: true,
//         // });

//         // const { data } = await doctorInstance.get("http://localhost:4000/doctor", {
//         //   withCredentials: true,
//         // });

//         const { data } = await doctorInstance.get("https://server.dochere.online/doctor", {
//           withCredentials: true,
//         });

//         setdoctorDetails(data);
//         if (data.doctor.blocked === true) {
//           cookie.remove("doctorToken");
//           alert("you are blocked doc");
//           navigate("/doctor/login");
//         } else if (!data.status) {
//           cookie.remove("doctorToken");
//           navigate("/doctor/login");
//         } else {
//           // alert(`Welcome Dr.${data.name}`);
//           toast(`Welcome ${data?.doctor.name}`, {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });

//           dispatch(doctorLogin(data.doctor));
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     verifyDoctor();
//   }, []);
//   const reApply = (e) => {
//     e.preventDefault();
//     navigate("/doctor/re-apply", { state: { doctorId } });
//   };
//   return (
//     <>
//       <DoctorNavbar />
//       {doctorDetails?.doctor?.rejected ? (
//         <>
//           <div className="hero">
//             <div className="card1">
//               <h1 className="reject">Your Application is Rejected</h1>
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
//                 onClick={reApply}
//               >
//                 Re-Apply
//               </button>
//             </div>
//           </div>
//         </>
//       ) : !doctorDetails?.doctor?.verified ? (
//         <>
//           <div className="hero">
//             <div className="card1">
//               <h1 className="pending">Your Application is Pending</h1>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>{/* add sales report here */}</>
//       )}
//       <ToastContainer />
//     </>
//   );
// };

// export default DoctorHome;

import DoctorNavbar from "../components/DoctorNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorInstance } from "../utils/axios/axios";
import { DOCTOR_HOME } from "../utils/axios/consturls";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { doctorLogin } from "../utils/Redux/doctorSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DoctorHome = () => {
  const doctorRedux = useSelector((store) => store.doctor);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const doctor = cookie.get("doctorToken");
  // console.log(doctor);
  // const doctor1 = cookie.get("doctorToken1");
  // const decode1 = jwtDecode(doctor1);
  // console.log(doctor1);
  const [doctorDetails, setdoctorDetails] = useState({});
  const navigate = useNavigate();
  const doctorId = doctorDetails?.doctor?._id;

  const verifyDoctor = async () => {
    try {
      if (!doctor) {
        navigate("/doctor/login");
      } else {
        // const { data } = await doctorInstance.get(DOCTOR_HOME, {
        //   withCredentials: true,
        // });

        // const { data } = await doctorInstance.get("http://localhost:4000/doctor", {
        //   withCredentials: true,
        // });

        const { data } = await doctorInstance.post("http://localhost:4000/doctor",{doctorToken:doctor});

        setdoctorDetails(data);
        if (data.doctor.blocked === true) {
          cookie.remove("doctorToken");
          alert("you are blocked doc");
          navigate("/doctor/login");
        } else if (!data.status) {
          cookie.remove("doctorToken");
          navigate("/doctor/login");
        } else {
          // alert(`Welcome Dr.${data.name}`);
          toast(`Welcome ${data?.doctor.name}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          dispatch(doctorLogin(data.doctor));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    verifyDoctor();
  }, []);
  const reApply = (e) => {
    e.preventDefault();
    navigate("/doctor/re-apply", { state: { doctorId } });
  };
  return (
    <>
      <DoctorNavbar />
      {doctorDetails?.doctor?.rejected ? (
        <>
          <div className="hero">
            <div className="card1">
              <h1 className="reject">Your Application is Rejected</h1>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
                onClick={reApply}
              >
                Re-Apply
              </button>
            </div>
          </div>
        </>
      ) : !doctorDetails?.doctor?.verified ? (
        <>
          <div className="hero">
            <div className="card1">
              <h1 className="pending">Your Application is Pending</h1>
            </div>
          </div>
        </>
      ) : (
        <>{/* add sales report here */}</>
      )}
      <ToastContainer />
    </>
  );
};

export default DoctorHome;
