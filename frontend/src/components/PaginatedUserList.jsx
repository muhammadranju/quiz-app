import { useState } from "react";

const PaginatedUserList = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 ">
      {currentUsers.length === 0 ? (
        <p className="text-gray-800">No users registered yet.</p>
      ) : (
        <>
          <ul className="text-white">
            {currentUsers.map((user) => (
              <li
                key={user._id}
                className="border-b py-2 text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                {user.email}
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          {users.length > usersPerPage && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded disabled:opacity-50 hover:bg-gray-700 transition"
              >
                Prev
              </button>
              <span className="text-lg font-medium text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded disabled:opacity-50 hover:bg-gray-700 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaginatedUserList;
