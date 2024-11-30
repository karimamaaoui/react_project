import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid"; 

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
};

const TableTwo = () => {
  const [userData, setUserData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // State for add user modal
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/getAll",
        {
          withCredentials: true,
        }
      );
      console.log("response", response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth.token, cookies.jwt]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = {
      email: event.target.email.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      role: event.target.role.value,
    };

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/auth/update/${selectedUser._id}`,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      console.log('User updated successfully:', response.data);
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/delete/${userId}`, {
        withCredentials: true,
      });
      console.log(`User with ID ${userId} deleted successfully.`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUserSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      email: event.target.email.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      role: event.target.role.value,
    };

    try {
      await axios.post("http://localhost:8000/api/auth/create", newUser, {
        withCredentials: true,
      });
      console.log('User added successfully');
      fetchUsers();
      setIsAddUserModalOpen(false); 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">Users List</h4>
        <button
          onClick={() => setIsAddUserModalOpen(true)} // Open add user modal
          className="flex items-center text-white bg-blue-500 rounded px-4 py-2 hover:bg-blue-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Firstname</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Lastname</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Role</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Social Links</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {userData.map((user, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{user.email}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.firstname || 'nothing'}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.lastname || 'nothing'}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.role}</p>
          </div>
          <div className="col-span-2 flex items-center">
            {user.socialLinks && user.socialLinks.length > 0 ? (
              user.socialLinks.map((social, i) => (
                <p key={i} className="text-sm text-black dark:text-white">
                  {social.github}
                </p>
              ))
            ) : (
              <p>nothing</p>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-end space-x-2">
            <button onClick={() => handleEdit(user)} className="text-blue-500">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="text-red-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Modal for Adding User */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add User</h2>

            {/* Form for adding user */}
            <form onSubmit={handleAddUserSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.values(UserRole).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit" 
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

            {/* Form for editing user */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser?.email}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={selectedUser?.role}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.values(UserRole).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  defaultValue={selectedUser?.firstname}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  defaultValue={selectedUser?.lastname}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit" 
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTwo;