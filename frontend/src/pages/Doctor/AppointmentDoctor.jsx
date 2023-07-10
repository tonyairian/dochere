import { doctorInstance } from "../../utils/axios/axios";
import { DOCTOR_APPOINTMENT,DOCTOR_GENERATE_SESSION_LINK } from "../../utils/axios/consturls";
import jwtDecode from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import Cookies from "universal-cookie";
import DoctorNavbar from "../../components/DoctorNavbar";
import { useNavigate } from "react-router-dom";
const moment = require("moment");
const AppointmentDoctor = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const doctor = cookie.get("doctorToken");
  const decode = jwtDecode(doctor);
  let id = decode.id;
  const [appointments, setAppointments] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    try {
      const getSessions = async () => {
        const { data } = await doctorInstance.get(
          DOCTOR_APPOINTMENT+ id
        );
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

  const handleJoinRoom = useCallback((data) => {
    let result = "";
    // if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    for (i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    let link = {};
    link.data = result;
    const body = {
      link: link.data,
      doctorId: data.doctorId,
      userId: data.userId,
      sessionId: data._id,
    };

    try {
      doctorInstance
        .post(DOCTOR_GENERATE_SESSION_LINK, body)
        .then(({ data }) => {
          console.log(data.session.link);
          setLink(data.session.link);
          window.open(`/room/${link.data}`);
        });
    } catch (error) {
      navigate("*");
    }
  },[] );
  return (
    <>
      <DoctorNavbar />

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
                      Patient
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
                          {data.userName}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {data.bookedDate}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {data.sessionDate}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {/* {data.timeSlot} */}
                          {moment(data.timeSlot, "HH:mm").format("h:mm A")}
                        </td>
                        <td>
                          {data?.sessionComplete ? (
                            <h1>complete✅</h1>
                          ) : (
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={(e) => handleJoinRoom(data)}
                            >
                              Start Meeting
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

export default AppointmentDoctor;
