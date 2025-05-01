import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        return navigate("/login");
      }

      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("role", res.data.role);

      toast.success("Registration successful!");

      // navigate(res.data.role === "admin" ? "/dashboard" : "/quizzes");
    } catch (err) {
      toast.error(
        "Registration failed: " + (err.response?.data?.msg || "Try again")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Register for QuizMaster
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="text-white font-semibold mb-2 block">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-white font-semibold mb-2 block"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="text-white font-semibold mb-2 block"
          >
            Password
          </label>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-12 text-gray-400"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Register
        </button>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
