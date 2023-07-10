import React from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <>
      <UserNavbar />
      <div className="hero">
        <div className="card">
          <div
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: "#F8FAF5",
              margin: "0 auto",
            }}
          >
            <i className="checkmark .i-tag ">✓</i>
          </div>
          <h1 className="success">Success</h1>
          <p className="textt">
            We received your booking request;
            <br /> you can visit booking page for more details!
          </p>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 ">
            <Link  to='/'>Home</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
