import { createBrowserRouter } from "react-router-dom";
import DashboardRoot from "../layout/DashboardRoot";
import Root from "../layout/Root";
import HomePage from "../pages/QuizPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import ManageUsers from "../pages/ManageUsers";
import AddQuiz from "../pages/AddQuiz";
import ViewQuizzes from "../pages/ViewQuizzes";
import Nonfiction from "../pages/Nonfiction";
import SubjectsPage from "../pages/SubjectsPage";
import AdminDashboard from "../pages/AdminDashboard";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <MainPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "quizzes",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardRoot />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // User Dashboard
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "dashboard2",
        element: <AdminDashboard />,
      },
      {
        path: "add-quiz",
        element: <AddQuiz />,
      },
      {
        path: "view-quizzes",
        element: <ViewQuizzes />,
      },
      {
        path: "nonfiction",
        element: <Nonfiction />,
      },
      {
        path: "subjects",
        element: <SubjectsPage />,
      },
    ],
  },
]);

export default router;
