import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Interactive Quizzes",
    description:
      "Engage with our diverse range of interactive quizzes across multiple subjects.",
    icon: "🧠",
  },
  {
    title: "Real-time Competition",
    description:
      "Challenge friends and compete in real-time with players worldwide.",
    icon: "⚔️",
  },
  {
    title: "Progress Tracking",
    description:
      "Track your learning progress and earn achievements as you improve.",
    icon: "📈",
  },
];

const MainPage = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-6 md:px-12 lg:px-32 xl:px-64 py-4 bg-gray-900 shadow border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">QuizMaster</h1>
        <nav className="space-x-2 text-sm mt-4 md:mt-0">
          <a href="#" className="text-gray-300 hover:text-blue-400">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400">
            Contact Us
          </a>
          <Link to="/login" className="text-gray-300 hover:text-blue-400">
            Login
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 mt-2 md:mt-0">
              Sign Up
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-gray-900 to-black px-4">
        <h2 className="text-5xl font-black text-white lg:max-w-4xl mx-auto text-balance">
          Master Your Knowledge with{" "}
          <span className="text-blue-500">QuizMaster</span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Test your knowledge, challenge your friends, and learn something new
          every day. Join thousands of learners worldwide!
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/quizzes">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">
              Get Started
            </button>
          </Link>
          <button className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-800 w-full sm:w-auto text-gray-300">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900 text-center px-4">
        <h3 className="text-3xl font-black text-white">
          Everything you need to excel
        </h3>
        <p className="mt-2 text-gray-400 mb-10">
          QuizMaster provides all the tools you need to learn, compete, and
          succeed.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded shadow hover:shadow-lg border border-gray-700"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h4 className="font-semibold text-white mb-2">{f.title}</h4>
              <p className="text-gray-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16 text-center px-4">
        <h3 className="text-3xl font-semibold mb-6">
          Trusted by learners worldwide
        </h3>
        <p className="mb-8 text-blue-100">
          Join our growing community of knowledge seekers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h4 className="text-4xl font-black">100K+</h4>
            <p>Active Users</p>
          </div>
          <div>
            <h4 className="text-4xl font-black">5K+</h4>
            <p>Quizzes Available</p>
          </div>
          <div>
            <h4 className="text-4xl font-black">50+</h4>
            <p>Topics Covered</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-12 text-center bg-gradient-to-br from-gray-900 to-black px-4 border-t border-gray-800">
        <h4 className="text-2xl font-bold text-white">Ready to dive in?</h4>
        <p className="text-blue-400 font-medium mt-1 mb-6">
          Start your learning journey today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/quizzes">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">
              Get Started
            </button>
          </Link>
          <button className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-800 w-full sm:w-auto text-gray-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
