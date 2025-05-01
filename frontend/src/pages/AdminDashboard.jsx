/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import API from "../utils/api";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 6;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizRes = await API.get("/admin/users", {
          headers: { role: "admin", Authorization: `Bearer ${token}` },
        });
        setUsers(quizRes.data);

        const quizList = await API.get("/quiz/random");
        setQuizzes(quizList.data);
      } catch (err) {
        toast.error("Error loading data");
      }
    };
    fetchData();
  }, [reload]);

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
  };

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
  const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white w-full mt-10">
      <div className="mx-auto p-6 ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Quiz Form */}
        {/* <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-10 border border-gray-700">
          <QuizForm
            existingQuiz={editingQuiz}
            onSuccess={() => {
              setReload(!reload);
              setEditingQuiz(null);
            }}
          />
        </div> */}

        {/* Quizzes */}
        <h2 className="text-2xl font-semibold mb-4">
          All Quizzes {quizzes?.length || 0}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentQuizzes.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">
              No quizzes available.
            </div>
          ) : (
            currentQuizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} onEdit={handleEdit} />
            ))
          )}
        </div>

        {/* Pagination */}
        {quizzes.length > quizzesPerPage && (
          <div className="flex justify-center items-center space-x-4 mb-10">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Users */}
        {/* <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Registered Users {users?.length || 0}
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <PaginatedUserList users={users} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
