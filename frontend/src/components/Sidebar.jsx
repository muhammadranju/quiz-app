import { NavLink } from "react-router-dom";

function Sidebar() {
  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const linkClasses = ({ isActive }) =>
    `block py-2 px-4 rounded transition ${
      isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
    }`;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Admin Panel</h1>
      <hr className="mb-2" />
      <ul className="space-y-4">
        <li>
          <NavLink to="/dashboard" end className={linkClasses}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/add-quiz" className={linkClasses}>
            Add Quiz
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/view-quizzes" className={linkClasses}>
            View Quizzes
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/nonfiction" className={linkClasses}>
            Nonfiction
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manage-users" className={linkClasses}>
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/subjects" className={linkClasses}>
            Subjects
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
        </li>
        <li
          onClick={handelLogout}
          className="block py-2 px-4 text-red-500 hover:bg-red-700 hover:text-white rounded cursor-pointer"
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
