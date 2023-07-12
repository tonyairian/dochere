import { useEffect, useState } from "react";
// import axios from "axios";
import { adminInstance } from "../utils/axios/axios";
import { ADMIN_HOME } from "../utils/axios/consturls";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminNavbar from "../components/AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminHome = () => {
  const cookie = new Cookies();
  const admin = cookie.get("adminToken");
  const [adminDetails, setAdminDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        if (!admin) {
          navigate("/admin/login");
        } else {
          // const { data } = await axios.get("http://localhost:4000/admin", {
          //   withCredentials: true,
          // });
          const { data } = await adminInstance.get(ADMIN_HOME, {
            withCredentials: true,
          });
          setAdminDetails(data);
          if (!data.status) {
            cookie.remove("adminToken");
            navigate("/admin/login");
          } else {
            // console.log("logged in user");
            toast("🦄 Welcome Admin!", {
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
        console.log(error);
      }
    };
    verifyAdmin();
  }, []);
  return (
    <div>
      <AdminNavbar />
      <ToastContainer />
    </div>
  );
};

export default AdminHome;
