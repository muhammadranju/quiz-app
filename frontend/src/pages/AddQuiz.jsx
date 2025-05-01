/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

function AddQuiz() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/admin/categories", {
          headers: { role: "admin" },
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChangeOption = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      question,
      options,
      correctIndex,
      category,
    };

    try {
      await API.post("/admin/add-quiz", quizData, {
        headers: { role: "admin" },
      });
      toast.success("Quiz added successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
      setCategory("");
    } catch (err) {
      toast.error("Error adding quiz");
    }
  };

  return (
    <div className="min-h-screen mx-auto  text-white flex items-center justify-center px-4">
      <Helmet>
        <title> Add Quiz | QuizMaster </title>
      </Helmet>
      <div className="w-full max-w-6xl shadow-md rounded-lg bg-gray-900 border border-gray-700 p-6">
        <h2 className="text-2xl font-semibold mb-6">Add New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter question"
            className="w-full mb-4 p-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 gap-4">
            {options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Answer ${i + 1}`}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                value={opt}
                onChange={(e) => handleChangeOption(e.target.value, i)}
                required
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <select
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              value={correctIndex}
              onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
            >
              {options.map((_, i) => (
                <option key={i} value={i}>
                  Correct: Answer {i + 1}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white p-2 px-5 rounded-lg hover:bg-blue-700 transition">
            Add Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuiz;
