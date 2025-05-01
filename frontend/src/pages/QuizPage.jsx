/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const getUserToken = localStorage.getItem("token");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quiz-progress"));
    if (saved) {
      setScore(saved.score);
      setAnswered(saved.answered);
      setCurrentIndex(saved.answered.length);
    }

    API.get("/quiz/random").then((res) => {
      setQuizzes(res.data);
    });

    API.get("/admin/categories").then((res) => {
      setCategories(res.data);
    });

    if (!getUserToken) {
      navigate("/login");
    }
  }, [getUserToken]);

  const handleAnswer = () => {
    if (selected === null) return;

    const currentQuiz = quizzes[currentIndex];
    const isCorrect = selected === currentQuiz.correctIndex;
    const points = isCorrect ? 10 : 0;

    const newScore = score + points;
    const newAnswered = [
      ...answered,
      {
        id: currentQuiz._id,
        selected,
        correct: currentQuiz.correctIndex,
        isCorrect,
      },
    ];

    if (isCorrect) {
      toast.success("Correct Answer! +10 points");
    } else {
      toast.error("Wrong Answer! 0 points");
    }

    localStorage.setItem(
      "quiz-progress",
      JSON.stringify({ score: newScore, answered: newAnswered })
    );

    setScore(newScore);
    setAnswered(newAnswered);
    setSelected(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    localStorage.removeItem("quiz-progress");
    setScore(0);
    setAnswered([]);
    setCurrentIndex(0);
    setSelected(null);
  };

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        Loading quizzes...
      </div>
    );
  }

  if (currentIndex >= quizzes.length) {
    const correctCount = answered.filter((a) => a.isCorrect).length;
    const wrongCount = answered.length - correctCount;

    // Fetch user info (assuming token is valid and contains payload)
    const token = localStorage.getItem("token");
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
    const userEmail = payload?.email || "Unknown";
    const userName = payload?.name || "User";

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
        <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-700 p-8 max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: User Info & Score */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <div className="space-y-2 text-lg">
              <p>
                <span className="text-gray-400">Name:</span> {userName}
              </p>
              <p>
                <span className="text-gray-400">Email:</span> {userEmail}
              </p>
              <p className="text-green-400">Correct: {correctCount}</p>
              <p className="text-red-400">Wrong: {wrongCount}</p>
              <p className="text-yellow-300 font-semibold text-xl">
                Score: {score} points
              </p>
              <p className="text-gray-400">
                Total Questions: {answered.length}
              </p>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="flex justify-end items-end">
            <button
              onClick={handleReset}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white transition shadow"
            >
              Do it Again!
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCategorySelect = (value) => {
    setLoading(true);
    setSelectedCategory(value);

    API.get(`/quiz/category/${value}`).then((res) => {
      setQuizzes(res.data);
    });
    setLoading(false);
  };

  const currentQuiz = quizzes[currentIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        Loading quizzes...
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        No quizzes available for this category.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <Helmet>
        <title> Quiz | QuizMaster </title>
      </Helmet>
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-6 text-center">
            Question {currentIndex + 1} of {quizzes.length}
          </h2>
          <select
            className="w-full max-w-xs p-3 mb-4 rounded bg-gray-800 text-white border border-gray-600"
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
          >
            <option value="" selected disabled>
              -- Choose Category --
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-lg font-semibold mb-6 text-center">
          {currentQuiz.question}
        </p>

        <div className="space-y-4 mb-6">
          {currentQuiz.options.map((option, index) => (
            <div
              key={index}
              className={`cursor-pointer px-5 py-3 rounded-lg border transition duration-300
                ${
                  selected === index
                    ? "bg-blue-600 border-blue-400 text-white"
                    : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                }`}
              onClick={() => setSelected(index)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleAnswer}
            className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Next
          </button>
          <span className="text-lg font-bold">Score: {score}</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
