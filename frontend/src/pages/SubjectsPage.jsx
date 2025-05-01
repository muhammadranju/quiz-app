/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

function SubjectPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories", {
        headers: {
          role: "admin",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return toast.error("Please enter a category name");

    try {
      await API.post(
        "/admin/add-category",
        { name: newCategory },
        {
          headers: {
            role: "admin",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to add category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" mx-auto text-white  px-4 mt-52">
      <Helmet>
        <title> Subjects | QuizMaster </title>
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Quiz Categories
        </h2>
        <hr className="mb-6 border-gray-700" />

        <form
          onSubmit={handleAddCategory}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-grow rounded px-4 py-2 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Add Category
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.length === 0 ? (
            <p className="text-gray-400 col-span-full">No categories yet.</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="p-4 border border-gray-700 bg-gray-900 rounded shadow"
              >
                <h3 className="text-lg font-medium text-gray-200">
                  {cat.name}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectPage;
