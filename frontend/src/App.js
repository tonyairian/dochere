import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/Redux/store";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import UserList from "./pages/UserList";
import DoctorHome from "./pages/DoctorHome";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorList from "./pages/DoctorList";
import UserProfile from "./pages/UserProfile";
import DoctorDocumentsUpload from "./components/DoctorDocumentsUpload";
import EditUserProfile from "./pages/EditUserProfile";
import DoctorApproval from "./pages/Admin/DoctorApproval";
import Specializations from "./pages/Admin/Specializations";
import ViewDoctors from "./pages/User/ViewDoctors";
import ForgotPassword from "./pages/User/ForgotPassword";
import ForgotPasswordDoctor from "./pages/Doctor/ForgotPasswordDoctor";
import ApprovedDoctors from "./pages/Doctor/ApprovedDoctors";
import TimeSlot from "./pages/Doctor/TimeSlot";
import { Booking } from "./pages/User/Booking";
import ConfirmBooking from "./pages/User/ConfirmBooking";
import OrderSuccess from "./pages/User/OrderSuccess";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import EditProfile from "./pages/Doctor/EditProfile";
import Messanger from "./pages/Messanger/Messanger";
import Appointment from "./pages/User/Appointment";
import ReApply from "./pages/Doctor/ReApply";
import PaymentFailed from "./pages/User/PaymentFailed";
import AppointmentDoctor from "./pages/Doctor/AppointmentDoctor";
import RoomPage from "../src/pages/room/index";
import Error from "./pages/error/Error";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<UserLogin />}></Route>
            <Route path="/signup" element={<UserRegister />}></Route>
            <Route path="/admin" element={<AdminHome />}></Route>
            <Route path="/admin/login" element={<AdminLogin />}></Route>
            <Route path="/admin/users" element={<UserList />}></Route>
            <Route path="/admin/doctors" element={<DoctorList />}></Route>
            <Route path="/doctor" element={<DoctorHome />}></Route>
            <Route path="/doctor/login" element={<DoctorLogin />}></Route>
            <Route path="/doctor/signup" element={<DoctorRegister />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
            <Route path="/profile/edit" element={<EditUserProfile />}></Route>
            <Route
              path="/doctor/upload-documents"
              element={<DoctorDocumentsUpload />}
            ></Route>
            <Route
              path="/admin/doctor-approval"
              element={<DoctorApproval />}
            ></Route>
            <Route
              path="/admin/specializations"
              element={<Specializations />}
            ></Route>
            <Route path="/view-doctors" element={<ViewDoctors />}></Route>
            <Route
              path="/forgot-password/:id"
              element={<ForgotPassword />}
            ></Route>
            <Route
              path="/doctor/forgot-password/:id"
              element={<ForgotPasswordDoctor />}
            ></Route>
            <Route
              path="/admin/verified-doctors"
              element={<ApprovedDoctors />}
            ></Route>
            <Route path="/doctor/time-slot" element={<TimeSlot />}></Route>
            <Route path="/book-appointment" element={<Booking />}></Route>
            <Route path="/confirm-booking" element={<ConfirmBooking />}></Route>
            <Route path="/order-success" element={<OrderSuccess />}></Route>
            <Route path="doctor/profile" element={<DoctorProfile />}></Route>
            <Route path="doctor/edit-profile" element={<EditProfile />}></Route>
            <Route path="/chat" element={<Messanger />}></Route>
            <Route path="/appointment" element={<Appointment />}></Route>
            <Route path="/doctor/re-apply" element={<ReApply />}></Route>
            <Route path="/payment-failed" element={<PaymentFailed />}></Route>
            <Route
              path="/doctor/appointments"
              element={<AppointmentDoctor />}
            ></Route>
            <Route path="/room/:roomId" element={<RoomPage />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
