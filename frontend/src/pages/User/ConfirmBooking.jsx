import React from "react";
import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import axios from "../../utils/axios/axios";
import {
  CONFIRM_BOOKING,
  VERIFY_PAYMENT,
  BOOK_SESSION,
  CREATE_CONVERSATION,
} from "../../utils/axios/consturls";
import { useNavigate } from "react-router-dom";
const ConfirmBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, fee, slot } = location.state.bookingDetails;
  const { experience, specialization } = location.state.data.doctor;
  const doctorName = location.state.data.doctor.name;
  const { email, number, name } = location.state.data.user;
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(CONFIRM_BOOKING, { fee });

      if (data.data) {
        initPayment(data.data);
      } else {
        // alert("razorpay id and entity not found");
        navigate("*");
      }
    } catch (err) {
      navigate("*");
    }
  };

  const initPayment = async (data) => {
    var options = {
      key: "rzp_test_ECaMBpTyhH6emB",
      amount: data.amount * 100,
      currency: data.currency,
      name: ".Dochere.com",
      description: "Booking session",
      order_id: data.id,
      image: "https://evara.ml/user-assets/imgs/theme/logo.svg",

      modal: {
        ondismiss: function () {
          navigate("/payment-failed");
          console.log("Checkout form closed");
        },
      },
      handler: async (response) => {
        try {
          await axios.post(VERIFY_PAYMENT, response).then(({ data }) => {
            bookSession();
            setConversation();
          });
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "Tony",
        email: "mvel1620r@gmail.com",
        contact: "7904425033",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const bookSession = async () => {
    await axios
      .post(BOOK_SESSION, {
        doctorDetails: location.state.data.doctor,
        slot,
        date,
        fee,
        userDetails: location.state.data.user,
      })
      .then((res) => {
        if (res.data.session) {
          navigate("/order-success");
        } else {
          alert("booking failed");
        }
      });
  };

  const setConversation = async () => {
    const body = {
      userDetails: location.state.data.user,
      doctorDetails: location.state.data.doctor,
    };
    const { data } = await axios.post(CREATE_CONVERSATION, body);
  };

  return (
    <>
      <UserNavbar />
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto mt-24">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order Summary
          </h1>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Doctor Details
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold text-blue-900">
                      {doctorName}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      {specialization}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      {experience} experience
                    </p>
                  </div>
                </div>
                <p>
                  Date - {date} <br /> Time - {slot}
                </p>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  plan
                </h3>
                <h1 className="text-2xl font-bold text-blue-900">INR ₹{fee}</h1>
                <p>
                  {" "}
                  Plan that fits your budget and offers the features you need.
                </p>
                <div className="flex justify-between items-start w-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              User Details
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <form action="" onSubmit={handlePayment}>
                  <div className="flex justify-between items-center w-full mt-5">
                    <p className="text-lg dark:text-white leading-4 text-blue-800">
                      {name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full mt-5">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      {email}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full mt-5">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      {number}
                    </p>
                  </div>
                  <div className="flex w-full mt-5 justify-center items-center md:justify-start md:items-start">
                    <button
                      type="submit"
                      className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                    >
                      Make Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmBooking;
