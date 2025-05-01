/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quiz/random");
        setQuizzes(res.data);
        const catRes = await API.get("/admin/categories");
        setCategories(catRes.data);
      } catch (err) {
        toast.error("Failed to load quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce(
    (sum, quiz) => sum + (quiz.question ? 1 : 0),
    0
  );
  const recentQuizzes = quizzes.slice(0, 5);

  return (
    <div className=" w-full  text-white flex flex-col items-center justify-start mt-36">
      <div className="w-full max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <hr className="mb-6 border-gray-700" />

        <div className="flex gap-x-5 mb-10 flex-col sm:flex-row">
          <div className="bg-gray-900 shadow-md rounded-lg p-5 border border-gray-700 flex-1">
            <h2 className="text-xl font-semibold text-gray-300">
              Total Quizzes
            </h2>
            <p className="text-3xl mt-2 text-blue-500 font-bold">
              {totalQuizzes}
            </p>
          </div>

          <div className="bg-gray-900 shadow-md rounded-lg p-5 border border-gray-700 flex-1">
            <h2 className="text-xl font-semibold text-gray-300">
              Total Categories
            </h2>
            <p className="text-3xl mt-2 text-green-400 font-bold">
              {categories?.length}
            </p>
          </div>
        </div>

        <div className="bg-gray-900 shadow-md rounded-lg p-5 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-300">
            Recent Quizzes
          </h2>
          <ul className="mt-3 space-y-2">
            {recentQuizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="text-sm text-gray-400 truncate border-b border-gray-700 pb-1"
              >
                {quiz.question}
              </li>
            ))}
            {recentQuizzes.length === 0 && (
              <li className="text-gray-500 text-sm">No recent quizzes</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
