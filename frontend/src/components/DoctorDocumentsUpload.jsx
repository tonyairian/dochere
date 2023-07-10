import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doctorInstance } from "../utils/axios/axios";
import { GET_SPECIALIZATION_DOCTOR,VERIFY_DOCUMENTS } from "../utils/axios/consturls";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { doctorApplicationSubmition } from "../utils/Redux/doctorSlice";
import { useLocation } from "react-router-dom";
const DoctorDocumentsUpload = () => {
  const cookie = new Cookies();
  const location = useLocation();
  const doctorId = location.state.doctorId;
  const doctorRedux = useSelector((store) => store.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [specializations, setSpecializations] = useState([]);
  const [regNumber, setRegNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    const getSpecializations = async () => {
      const { data } = await doctorInstance.get(
        GET_SPECIALIZATION_DOCTOR
      );
      setSpecializations(data.specializations);
    };
    getSpecializations();
  }, []);

  const fileUpl = (e) => {
    setImg(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("image", img);
    formData.append("regNumber", regNumber);
    formData.append("specialization", specialization);
    formData.append("experience", experience);
    try {
      // const { data } = await axios.post(
      //   "http://localhost:4000/doctor/verify-documents",
      //   formData
      // );
      const { data } = await doctorInstance.post(
        VERIFY_DOCUMENTS,
        formData
      );
      dispatch(doctorApplicationSubmition(data.result));
      if (data.documentsSubmitted) {
        cookie.set("doctorToken", `${data.token}`, { path: "/" });
        navigate("/doctor");
      } else {
        alert("form not submitted");
      }
    } catch (error) {
      navigate("*");
      // console.log(error)
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Upload Your Documents
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => submitHandler(e)}>
                <div>
                  <label
                    htmlFor="reg-no"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Medical Register Number
                  </label>
                  <input
                    id="reg-no"
                    name="reg-no"
                    type="text"
                    placeholder="Registraton Number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Specialization
                  </label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    id="Specialization"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue>Choose from here</option>
                    {specializations ? (
                      specializations.map((specialization, i) => {
                        return (
                          <option key={i}>
                            {specialization.specialization}
                          </option>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Years of Experience
                  </label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue>Choose from here</option>
                    <option>0-1 years</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="multiple_files"
                  >
                    Upload Images
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={fileUpl}
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    multiple
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorDocumentsUpload;
