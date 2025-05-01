/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import API from "../utils/api";
import toast from "react-hot-toast";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            role: "admin",
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);

  const handleDeleteUser = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          role: "admin",
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully.");
    } catch (err) {
      toast.error("Error deleting user.");
    }
  };

  return (
    <div className="mx-auto  text-white px-4 mt-52">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-400" />
            Manage Users
            <span className="text-base text-gray-400 ml-2">
              ({filteredUsers.length})
            </span>
          </h2>

          {/* <h1 className="text-3xl font-bold mb-4"> Notifications</h1> */}

          <input
            type="text"
            placeholder="Search by email..."
            className="px-4 py-2 rounded-lg ml-5 bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <hr className="mb-6 border-gray-700" />

        <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-lg">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="py-3 px-4 border-b border-gray-700">#</th>
                <th className="py-3 px-4 border-b border-gray-700">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-800 transition duration-200"
                  >
                    <td className="py-3 px-4 border-b border-gray-800">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-800">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-6">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
