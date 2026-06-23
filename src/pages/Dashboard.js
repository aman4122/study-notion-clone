// import React from "react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { Outlet } from "react-router-dom"
// import Sidebar from "../components/core/Dashboard/Sidebar"

// const Dashboard = () => {
//   const { sidebarOpen } = useSelector((state) => state.profile)
//   const navigate = useNavigate()

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
//       <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "w-[222px] opacity-100" : "w-0 opacity-0 pointer-events-none overflow-hidden"}`}>
//         <button
//           onClick={() => {
//             navigate('/catalog');
//           }}
//           className="absolute top-2 left-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Explore All Courses
//         </button>
//         <Sidebar />
//       </div>
//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard









import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"

const Dashboard = () => {
  const { sidebarOpen } = useSelector((state) => state.profile)

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-in-out flex-shrink-0
        ${sidebarOpen ? "w-[222px]" : "w-0 overflow-hidden"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard





