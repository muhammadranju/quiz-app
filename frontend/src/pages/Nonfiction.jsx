import { useEffect, useState } from "react";
import API from "../utils/api";
import { FaUserPlus } from "react-icons/fa";

function Nonfiction() {
  const [users, setUsers] = useState([]);
  const [recentThreshold, setRecentThreshold] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users", {
          headers: {
            role: "admin",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);

        // Consider users registered within the last 24 hours as recent
        const now = new Date();
        const threshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        setRecentThreshold(threshold);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 w-full max-w-5xl mx-auto mt-44 text-white">
      <h1 className="text-3xl font-bold mb-4"> Notifications</h1>
      <hr className="mb-6 border-gray-700" />
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-gray-600">No notifications available.</p>
        ) : (
          users.map((user) => {
            const registeredDate = new Date(user.createdAt);
            const isRecent =
              recentThreshold && registeredDate > recentThreshold;

            return (
              <div
                key={user._id}
                className="bg-gray-900 border text-white border-gray-600 rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaUserPlus size={20} />
                  </div>
                  <div>
                    <p className="text-gray-100 font-medium">{user.email}</p>
                    <p className="text-gray-400 text-sm">
                      Registered: {registeredDate.toLocaleString()}
                    </p>
                  </div>
                </div>
                {isRecent && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-full">
                    New
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Nonfiction;
