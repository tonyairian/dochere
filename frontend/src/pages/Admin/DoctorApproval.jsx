import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useLocation } from "react-router-dom";
import { adminInstance } from "../../utils/axios/axios";
import { APPROVE_DOCTOR, REJECT_DOCTOR } from "../../utils/axios/consturls";
import { useNavigate } from "react-router-dom";
const DoctorApproval = () => {
  const location = useLocation();
  const {
    name,
    email,
    _id,
    experience,
    number,
    regNumber,
    specialization,
    rejected,
    verified,
    image,
    profilePicture,
  } = location.state.doctorData;
  const navigate = useNavigate();
  // const image_path = "http://localhost:4000/images/";
  const image_path = "https://server.dochere.online/images/";
  const approveDoctor = async () => {
    const { data } = await adminInstance.post(APPROVE_DOCTOR, { _id });
    if (data) {
      navigate("/admin/doctors");
    } else {
      navigate("*");
    }
  };

  const rejectDoctor = async () => {
    const { data } = await adminInstance.post(REJECT_DOCTOR, { _id });
    if (data) {
      navigate("/admin/doctors");
    } else {
      navigate("*");
    }
  };

  return (
    <>
      <AdminNavbar />
      <section className=" bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      className="shadow-xl rounded-full h-auto align-middle border-none w-40 "
                      alt="doctor_image"
                      src={
                        profilePicture
                          ? image_path + profilePicture
                          : "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=626&ext=jpg"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  Name: {name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Specialization: {specialization}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Medical Reg No: {regNumber}
                </div>

                <div className="mb-2 text-blueGray-600 mt-5">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Email: {email}
                </div>

                <div className="mb-2 text-blueGray-600 mt-2">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Mobile: {number}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  Years of Experience: {experience}
                </div>
                {rejected || verified ? (
                  <></>
                ) : (
                  <div className="flex justify-between mb-5">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={rejectDoctor}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                      onClick={approveDoctor}
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
              <div>
                <img src={image_path + image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorApproval;
