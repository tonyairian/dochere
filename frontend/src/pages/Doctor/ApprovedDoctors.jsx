import AdminNavbar from "../../components/AdminNavbar";
import { adminInstance } from "../../utils/axios/axios";
import {
  DOCTOR_VERIFY,
  BLOCK_DOCTOR,
  UNBLOCK_DOCTOR,
  VERIFIED_DOCTORS,
} from "../../utils/axios/consturls";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ApprovedDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getDoctors = async () => {
      const { data } = await adminInstance.get(VERIFIED_DOCTORS);

      setDoctors(data.doctors);
    };
    getDoctors();
  }, [doctors]);

  const blockDoctor = async (doctor, e) => {
    e.preventDefault();
    const { data } = await adminInstance.post(BLOCK_DOCTOR, doctor);
  };
  const unBlockDoctor = async (doctor, e) => {
    e.preventDefault();
    const { data } = await adminInstance.post(UNBLOCK_DOCTOR, doctor);
  };

  const doctorDetails = async (id) => {
    try {
      const { data } = await adminInstance.post(DOCTOR_VERIFY, { id });
      // console.log(data);

      if (data.doctorFound) {
        const doctorData = data.doctor;
        navigate("/admin/doctor-approval", { state: { doctorData } });
      } else {
        console.log("no doctor found");
      }
    } catch (error) {
      navigate("*");
    }
  };
  return (
    <>
      <AdminNavbar />

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
                Action
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
                      <div className="text-base font-semibold text-black">
                        <butto>{doctor.name}</butto>
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
                    {doctor?.blocked ? (
                      <button
                        onClick={(e) => unBlockDoctor(doctor, e)}
                        // value={user._id}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={(e) => blockDoctor(doctor, e)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Block
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center text-black ">
                      <button
                        onClick={(e) => doctorDetails(doctor._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApprovedDoctors;
