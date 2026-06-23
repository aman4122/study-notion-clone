import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Navbar from "./components/common/Navbar.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import CourseDetails from "./pages/CourseDetails.js";
import Catalog from "./pages/Catalog";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./pages/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Cart from "./components/core/Dashboard/Cart"
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import InstructorCourses from "./components/core/Dashboard/InstructorDashboard/InstructorCourses";
import AddCourse from "./components/core/Dashboard/InstructorDashboard/AddCourse";
import AdminDashboard from "./components/core/Dashboard/AdminDashboard/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";




function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalog/:catalogName" element={<Catalog />} />

        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={

          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />



        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />  
          <Route path="dashboard/cart" element={<Cart />} />                         

          {/* New Additions */}
          <Route path="dashboard/instructor" element={<InstructorDashboard />} />
          <Route path="dashboard/my-courses" element={<InstructorCourses />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/admin" element={<AdminDashboard />} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
