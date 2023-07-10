import AdminNavbar from "../../components/AdminNavbar";
import Swal from "sweetalert2";
import { adminInstance } from "../../utils/axios/axios";
import {
  GET_SPECIALIZATION,
  ADD_SPECIALIZATION,
  EDIT_SPECIALIZATION,
  DELETE_SPECIALIZATION,
} from "../../utils/axios/consturls";
import { useEffect, useState } from "react";
const Specializations = () => {
  const [specializations, setSpecializations] = useState([]);
  useEffect(() => {
    const getSpecializations = async () => {
      const { data } = await adminInstance.get(GET_SPECIALIZATION);

      setSpecializations(data.specializations);
    };
    getSpecializations();
  }, [specializations]);

  const addSpec = () => {
    Swal.fire({
      title: "Edit Specialization Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,

      preConfirm: async (inputValue) => {
        await adminInstance
          .post(ADD_SPECIALIZATION, {
            inputValue,
          })
          .then(({ data }) => {
            if (data.specializationExist === true) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "specialization Exists!",
              });
            } else if (data.specializationExist === false) {
              Swal.fire({
                icon: "success",
                title: "Success!",
              });
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const editSpecialization = (id, spec) => {
    Swal.fire({
      title: "Submit Specialization Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      inputValue: `${spec}`,
      preConfirm: async (inputValue) => {
        const { data } = await adminInstance.post(EDIT_SPECIALIZATION, {
          inputValue,
          id,
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Updated",
          icon: "success",
        });
      }
    });
  };

  const deleteSpec = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance.post(DELETE_SPECIALIZATION, { id }).then((data) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  };
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Specializations
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={addSpec}
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                </thead>
                {specializations ? (
                  specializations.map((specialization, i) => {
                    return (
                      <tbody className="divide-y divide-gray-200" key={i}>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {i + 1}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <div className="text-base font-semibold pl-3">
                              {specialization.specialization}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() =>
                                editSpecialization(
                                  specialization._id,
                                  specialization.specialization
                                )
                              }
                            >
                              Edit
                            </button>
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteSpec(specialization._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <></>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Specializations;
