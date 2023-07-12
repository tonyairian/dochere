import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import UserFooter from "../components/UserFooter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
// const image_path = "http://localhost:4000/images/";
const image_path = "https://server.dochere.online/images/";
const UserProfile = () => {
  // const User = useSelector((store) => store.user);
  // const image = User.profileImg;
  const navigate = useNavigate();
  const cookie = new Cookies();
  const user = cookie.get("userToken");
  const decode = jwtDecode(user);
  const userId = decode.id;
  const [userDetails, setUserDetails] = useState([]);
  const editProfileHandler = (e) => {
    navigate("/profile/edit", {
      state: { userDetails: userDetails },
    });
  };
  useEffect(() => {
    const getUserProfile = async () => {
      const { data } = await axios.post(
        "https://server.dochere.online/getUserProfile",
        { userId }
      );
      setUserDetails(data.userData);
    };
    getUserProfile();
  }, []);
  return (
    <>
      <UserNavbar />
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            // src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            src={image_path + userDetails.profilePicture}
            alt="."
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{userDetails.name}</h2>

          <p className="text-gray-500">{userDetails.email}</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 fill-current text-black-900"
              xmlns="https://icons8.com/icon/533/phone"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
            <div>{userDetails.number}</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM6 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z" />
            </svg>

            <div>
              <Link to={"/appointment"}>Appointment History</Link>
            </div>
          </li>
        </ul>
        <div className="p-4 border-t mx-8 mt-2">
          <button
            className="w-1/2 block mx-auto rounded-full bg-blue-800 hover:shadow-lg font-semibold text-white px-6 py-2"
            onClick={editProfileHandler}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
