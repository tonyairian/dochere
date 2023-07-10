import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminInstance } from "../utils/axios/axios";
import {
  ADMIN_USERLIST,
  BLOCK_USER,
  UNBLOCK_USER,
} from "../utils/axios/consturls";
import AdminNavbar from "../components/AdminNavbar";
const UserList = () => {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getUsers = async () => {
        const { data } = await adminInstance.get(ADMIN_USERLIST);
        setusers(data.users);
      };
      getUsers();
    } catch (error) {
      navigate("*");
    }
  }, [users]);

  const blockUser = async (user, e) => {
    e.preventDefault();
    try {
      const { data } = await adminInstance.post(BLOCK_USER, user);
    } catch (error) {
      navigate("*");
    }
  };
  const unBlockUser = async (user, e) => {
    e.preventDefault();
    try {
      const { data } = await adminInstance.post(UNBLOCK_USER, user);
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
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
                      <div className="text-base font-semibold">{user.name}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user?.blocked ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                        Blocked
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                        Active
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user?.blocked ? (
                      <button
                        onClick={(e) => unBlockUser(user, e)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={(e) => blockUser(user, e)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Block
                      </button>
                    )}
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

export default UserList;
