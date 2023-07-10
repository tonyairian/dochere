// import UserNavbar from "../../components/UserNavbar";
// import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import axios from "../../utils/axios/axios";
// import {

// } from "../../utils/axios/consturls";
// import jwtDecode from "jwt-decode";
// import { useEffect, useState } from "react";
// import Cookies from "universal-cookie";
// const moment = require("moment");
// const Appointment = () => {
//   const navigate = useNavigate();
//   const cookie = new Cookies();
//   const user = cookie.get("userToken");
//   const decode = jwtDecode(user);
//   let id = decode.id;
//   const [appointments, setAppointments] = useState([]);
//   useEffect(() => {
//     try {
//       const getSessions = async () => {
//         const { data } = await axios.get(
//           "http://localhost:4000/appointment/" + id
//         );
//         if (data.appointments) {
//           setAppointments(data.appointments);
//         } else {
//           setAppointments([]);
//         }
//       };
//       getSessions();
//     } catch (error) {
//       navigate("*");
//     }
//   }, []);

//   const openVideo = async (e, data, sessionDetails) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "http://localhost:4000/session-complete",
//       sessionDetails
//     );
//     window.open(`/room/${data}`);
//   };

//   const cancelAppointment = async (e, sessionDetails) => {
//     e.preventDefault();
//     const { data } = await axios.post(
//       "http://localhost:4000/cancel-appointment",
//       sessionDetails
//     );
//     if (data.sessionDeleted) {
//       window.location.reload();
//     }
//   };
//   return (
//     <>
//       <UserNavbar />
//       <div className="flex flex-col">
//         <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//             <div className="overflow-hidden">
//               <table className="min-w-full text-center text-sm font-light">
//                 <thead className="border-b bg-blue-500 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
//                   <tr>
//                     <th scope="col" className=" px-6 py-4">
//                       #
//                     </th>
//                     <th scope="col" className=" px-6 py-4">
//                       Doctor
//                     </th>
//                     <th scope="col" className=" px-6 py-4">
//                       Booked Date
//                     </th>
//                     <th scope="col" className=" px-6 py-4">
//                       Session Date
//                     </th>
//                     <th scope="col" className=" px-6 py-4">
//                       Time Slot
//                     </th>
//                     <th scope="col" className=" px-6 py-4">
//                       Action
//                     </th>
//                     <th scope="col" className=" px-6 py-4">
//                       Meet
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointments.map((data, i) => {
//                     return (
//                       <tr className="border-b dark:border-neutral-500" key={i}>
//                         <td className="whitespace-nowrap  px-6 py-4 font-medium">
//                           {i + 1}
//                         </td>
//                         <td className="whitespace-nowrap  px-6 py-4  text-md font-semibold">
//                           {data.doctorName.slice(2)}
//                         </td>
//                         <td className="whitespace-nowrap  px-6 py-4">
//                           {data.bookedDate}
//                         </td>
//                         <td className="whitespace-nowrap  px-6 py-4">
//                           {data.sessionDate}
//                         </td>
//                         <td className="whitespace-nowrap  px-6 py-4">
//                           {moment(data.timeSlot, "HH:mm").format("h:mm A")}
//                         </td>

//                         <td>
//                           {data?.link ? (
//                             <button disabled></button>
//                           ) : (
//                             <button
//                               className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                               onClick={(e) => cancelAppointment(e, data)}
//                             >
//                               Cancel
//                             </button>
//                           )}
//                         </td>
//                         <td>

//                           {data?.sessionComplete ? (
//                             <h1>Complete✅</h1>
//                           ) : data?.link ? (
//                             <button
//                               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                               onClick={(e) => openVideo(e, data.link, data)}
//                             >
//                               Join Meeting
//                             </button>
//                           ) : (
//                             <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
//                               Not ready
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Appointment;

import UserNavbar from "../../components/UserNavbar";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../../utils/axios/axios";
import {
  APPOINTMENT,
  SESSION_COMPLETE,
  CANCEL_APPOINTMENT,
} from "../../utils/axios/consturls";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const moment = require("moment");
const Appointment = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const user = cookie.get("userToken");
  const decode = jwtDecode(user);
  let id = decode.id;
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    try {
      const getSessions = async () => {
        const { data } = await axios.get(APPOINTMENT + id);
        if (data.appointments) {
          setAppointments(data.appointments);
        } else {
          setAppointments([]);
        }
      };
      getSessions();
    } catch (error) {
      navigate("*");
    }
  }, []);

  const openVideo = async (e, data, sessionDetails) => {
    e.preventDefault();
    const response = await axios.post(
      SESSION_COMPLETE,
      sessionDetails
    );
    window.open(`/room/${data}`);
  };

  const cancelAppointment = async (e, sessionDetails) => {
    e.preventDefault();
    const { data } = await axios.post(
      CANCEL_APPOINTMENT,
      sessionDetails
    );
    if (data.sessionDeleted) {
      window.location.reload();
    }
  };
  return (
    <>
      <UserNavbar />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-blue-500 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      #
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Doctor
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Booked Date
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Session Date
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Time Slot
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Action
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Meet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((data, i) => {
                    return (
                      <tr className="border-b dark:border-neutral-500" key={i}>
                        <td className="whitespace-nowrap  px-6 py-4 font-medium">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4  text-md font-semibold">
                          {data.doctorName.slice(2)}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {data.bookedDate}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {data.sessionDate}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {moment(data.timeSlot, "HH:mm").format("h:mm A")}
                        </td>

                        <td>
                          {data?.link ? (
                            <button disabled></button>
                          ) : (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                              onClick={(e) => cancelAppointment(e, data)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                        <td>
                          {data?.sessionComplete ? (
                            <h1>Complete✅</h1>
                          ) : data?.link ? (
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                              onClick={(e) => openVideo(e, data.link, data)}
                            >
                              Join Meeting
                            </button>
                          ) : (
                            <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                              Not ready
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
