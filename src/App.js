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
import EditCourse from "./components/core/Dashboard/InstructorDashboard/EditCourse";
import AdminDashboard from "./components/core/Dashboard/AdminDashboard/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { useEffect } from "react";
import logoLight from "./assets/Logo/Logo-Small-Light.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./services/operations/authAPI";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (token) {
        inactivityTimer = setTimeout(() => {
          dispatch(logout(navigate));
        }, 5 * 60 * 1000); // 5 minutes
      }
    };

    if (token) {
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("scroll", resetTimer);
      window.addEventListener("click", resetTimer);
      resetTimer(); // initialize the timer
    }

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [token, dispatch, navigate]);
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = logoLight;
  }, []);

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
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          <Route path="dashboard/my-courses" element={<InstructorCourses />} />
          <Route path="dashboard/admin" element={<AdminDashboard />} />

        </Route>

        {/* View Course Routes */}
        <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
          {
            user?.accountType === "Student" && (
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
                element={<VideoDetails />} 
              />
            )
          }
        </Route>

      </Routes>
    </div>
  );
}

export default App;
