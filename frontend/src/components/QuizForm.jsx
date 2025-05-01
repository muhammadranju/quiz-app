/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import API from "../utils/api";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "react-hot-toast"; // Importing the toast library

function QuizForm({ existingQuiz, onSuccess }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (existingQuiz) {
      setQuestion(existingQuiz.question);
      setOptions(existingQuiz.options);
      setCorrectIndex(existingQuiz.correctIndex);
    }
  }, [existingQuiz]);

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
    };

    try {
      if (existingQuiz) {
        await API.put(`/admin/update-quiz/${existingQuiz._id}`, quizData, {
          headers: { role: "admin", Authorization: `Bearer ${token}` },
        });
        toast.success("Quiz updated successfully!"); // Success toast on update
      } else {
        await API.post("/admin/add-quiz", quizData, {
          headers: { role: "admin", Authorization: `Bearer ${token}` },
        });
        toast.success("Quiz added successfully!"); // Success toast on add
      }

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
      onSuccess();
    } catch (err) {
      toast.error("Quiz save failed! Please try again."); // Error toast
    }
  };

  return (
    <form onSubmit={handleSubmit} className="b text-white p-6 rounded-lg  ">
      <h2 className="text-2xl font-bold mb-4">
        {existingQuiz ? "Update Quiz" : "Add New Quiz"}
      </h2>

      <input
        type="text"
        placeholder="Enter question"
        className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      {options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Answer ${i + 1}`}
          className="w-full mb-3 p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={opt}
          onChange={(e) => handleChangeOption(e.target.value, i)}
          required
        />
      ))}

      <select
        className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
      >
        {options.map((_, i) => (
          <option key={i} value={i}>
            Correct: Answer {i + 1}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 font-semibold transition duration-200"
      >
        {existingQuiz ? (
          <>
            <MdEdit className="text-lg" /> Update Quiz
          </>
        ) : (
          <>
            <FaPlus className="text-sm" /> Add Quiz
          </>
        )}
      </button>
    </form>
  );
}

export default QuizForm;
