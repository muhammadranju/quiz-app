/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import API from "../utils/api";
import QuizCard from "../components/QuizCard";
import QuizForm from "../components/QuizForm"; // Reuse existing form
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

function ViewQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [deletingQuiz, setDeletingQuiz] = useState(null);
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 9;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizList = await API.get("/quiz/random");
        setQuizzes(quizList.data);
      } catch (err) {
        toast.error("Error loading quizzes");
      }
    };
    fetchData();
  }, [reload]);

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
  };

  const handleDeleteClick = (quiz) => {
    setDeletingQuiz(quiz);
  };

  const handleConfirmDelete = async () => {
    if (!deletingQuiz) return;

    try {
      await API.delete(`/admin/delete-quiz/${deletingQuiz._id}`, {
        headers: { role: "admin", Authorization: `Bearer ${token}` },
      });
      setDeletingQuiz(null);
      setReload(!reload);
    } catch (err) {
      toast.error("Failed to delete quiz");
    }
  };

  const handleCloseModals = () => {
    setEditingQuiz(null);
    setDeletingQuiz(null);
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
    <div className="w-full relative text-white mt-24 max-w-6xl mx-auto">
      <Helmet>
        <title> View Quizzes | QuizMaster </title>
      </Helmet>
      <div className="mx-auto p-6 w-auto">
        <h2 className="text-3xl font-semibold mb-4">
          All Quizzes ({quizzes?.length || 0})
        </h2>
        <hr className="mb-6 border-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentQuizzes.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">
              No quizzes available.
            </div>
          ) : (
            currentQuizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {quizzes.length > quizzesPerPage && (
          <div className="flex justify-center items-center space-x-4 mb-10">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-xl border border-gray-700 relative">
            <button
              onClick={handleCloseModals}
              className="absolute top-2 right-3 text-white text-2xl"
            >
              &times;
            </button>

            <QuizForm
              existingQuiz={editingQuiz}
              onSuccess={() => {
                setEditingQuiz(null);
                setReload(!reload);
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md border border-gray-700 text-white text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the quiz:{" "}
              <strong>{deletingQuiz.title}</strong>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCloseModals}
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewQuizzes;
