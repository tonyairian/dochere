import axios from "axios";
import { baseUserUrl, baseDoctorUrl,baseAdminUrl } from "./consturls";

const instance = axios.create({
  baseURL: baseUserUrl,
});

const adminInstance = axios.create({
  baseURL: baseAdminUrl,
});

const doctorInstance = axios.create({
  baseURL: baseDoctorUrl,
});

export default instance;
export { doctorInstance };
export { adminInstance };