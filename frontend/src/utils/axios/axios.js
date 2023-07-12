import axios from "axios";
import { baseUserUrl, baseDoctorUrl,baseAdminUrl } from "./consturls";

const instance = axios.create({
  baseURL: baseUserUrl,
  withCredentials: true,
});

const adminInstance = axios.create({
  baseURL: baseAdminUrl,
  withCredentials: true,
});

const doctorInstance = axios.create({
  baseURL: baseDoctorUrl,
  withCredentials: true,
});

export default instance;
export { doctorInstance };
export { adminInstance };