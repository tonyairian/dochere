import AdminNavbar from "../components/AdminNavbar";
import { useState, useEffect } from "react";
import { adminInstance } from "../utils/axios/axios";
import { PENDING_DOCTORLIST, DOCTOR_VERIFY } from "../utils/axios/consturls";
import { useNavigate } from "react-router-dom";
const DoctorList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    try {
      const getDoctors = async () => {
        const { data } = await adminInstance.get(PENDING_DOCTORLIST);
        setDoctors(data.doctors);
      };
      getDoctors();
    } catch (error) {
      // console.log(error);
      navigate("*");
    }
  }, [doctors]);

  const doctorDetails = async (id) => {
    try {
      const { data } = await adminInstance.post(DOCTOR_VERIFY, { id });

      if (data.doctorFound) {
        const doctorData = data.doctor;
        navigate("/admin/doctor-approval", { state: { doctorData } });
      } else {
        alert("no doctor found");
      }
    } catch (error) {
      // console.log(error);
      navigate("*");
    }
  };
  return (
    <>
      <AdminNavbar />

      {doctors?.length === 0 ? (
        <div className="hero">
          <div className="card1">
            <h1 className="no-applications">No Applications Found</h1>
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Specialization
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, i) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          <button className="text-black">{doctor.name}</button>
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-black ">{doctor.email}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-black ">
                        {doctor.specialization}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-950">
                      {doctor?.rejected ? (
                        <span className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                          Rejected
                        </span>
                      ) : (
                        <span className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                          pending
                        </span>
                      )}
                    </td>
                    <span
                      onClick={(e) => doctorDetails(doctor._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    >
                      View
                    </span>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DoctorList;
