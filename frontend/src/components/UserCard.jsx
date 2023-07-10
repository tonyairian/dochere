import React from "react";
import { Link } from "react-router-dom";
const UserCard = (specialization) => {
  const data = specialization.specialization.specialization;
  return (
    <>
      <div className="flex justify-center h-52 sm:h-64 md:h-64 lg:h-80  mt-4 ">
        {data.map((item, i) => {
          return (
            <Link
              to="/view-doctors"
              key={i}
              state={{ specializationId: item._id }}
            >
              <div className="rounded-xl mx-3 hidden lg:block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <img
                  className="rounded-t-lg h-32 w-40 sm:h-40 sm:w-48 md:h-48  md:w-52 lg:h-48  lg:w-56 lg:px-8"
                  src="https://cdn.pixabay.com/photo/2019/06/20/01/00/cathedral-4285885_960_720.jpg"
                  alt=""
                />

                <div className="p-6">
                  <h4 className="mb-2 text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
                    {item.specialization}
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default UserCard;
