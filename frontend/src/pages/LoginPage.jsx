import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const credentials = {
    Admin: {
      email: "admin@gmail.com",
      password: "admin123",
    },
    User: {
      email: "user@gmail.com",
      password: "user123",
    },
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setEmail(credentials[selectedRole].email);
    setPassword(credentials[selectedRole].password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful!");

      navigate(res.data.role === "admin" ? "/dashboard" : "/quizzes");
    } catch (err) {
      toast.error("Login failed: " + (err.response?.data?.msg || "Try again"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome to QuizMaster
        </h2>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-white font-semibold flex-1">
              Email Address
            </label>
            <select
              onChange={handleRoleChange}
              className="bg-gray-900 text-white border border-gray-700 rounded p-1"
              defaultValue=""
            >
              <option value="" disabled>
                Select Credential
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
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
          Login
        </button>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
