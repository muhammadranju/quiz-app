import { FiDelete, FiEdit } from "react-icons/fi";

function QuizCard({ quiz, onEdit, onDelete }) {
  return (
    <div className="text-gray-100 bg-gray-900 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">{quiz.question}</h3>
        <ul className="list-disc ml-5 space-y-2">
          {quiz.options.map((opt, i) => (
            <li
              key={i}
              className={`${
                quiz.correctIndex === i
                  ? "text-green-400 font-medium"
                  : "text-gray-100"
              }`}
            >
              {opt}
              {quiz.correctIndex === i && " (Correct)"}
            </li>
          ))}
        </ul>

        <div className="flex justify-between">
          {onEdit && (
            <button
              onClick={() => onEdit(quiz)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Edit <FiEdit className="text-lg" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(quiz)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            >
              Delete <FiDelete className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
