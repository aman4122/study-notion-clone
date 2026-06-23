// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { logout } from "../../../services/operations/authAPI"
// import { VscSignOut, VscAccount, VscBook, VscSettingsGear, VscArchive } from "react-icons/vsc"

// const Sidebar = () => {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.profile)

//   const matchRoute = (route) => {
//     return location.pathname === route
//   }

//   const sidebarLinks = [
//     {
//       id: 1,
//       name: "My Profile",
//       path: "/dashboard/my-profile",
//       icon: VscAccount,
//     },
//     {
//       id: 2,
//       name: "Enrolled Courses",
//       path: "/dashboard/enrolled-courses",
//       icon: VscBook,
//     },
//     {
//       id: 3,
//       name: "Your Cart",
//       path: "/dashboard/cart",
//       icon: VscArchive,
//     },
//     {
//       id: 4,
//       name: "Settings",
//       path: "/dashboard/settings",
//       icon: VscSettingsGear,
//     },
//   ]

//   return (
//     <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 text-richblack-300">
//       <div className="flex flex-col gap-y-2">
//         {sidebarLinks.map((link) => {
//           const Icon = link.icon
//           const isActive = matchRoute(link.path)
//           return (
//             <Link
//               key={link.id}
//               to={link.path}
//               className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
//                 isActive ? "bg-yellow-800 text-yellow-50" : "bg-transparent text-richblack-300"
//               }`}
//             >
//               {isActive && (
//                 <span className="absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50" />
//               )}
//               <div className="flex items-center gap-x-2">
//                 <Icon className="text-lg" />
//                 <span>{link.name}</span>
//               </div>
//             </Link>
//           )
//         })}
//       </div>

//       <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600" />

//       <div className="flex flex-col">
//         <button
//           onClick={() => dispatch(logout(navigate))}
//           className="px-8 py-2 text-sm font-medium text-richblack-300 hover:text-richblack-5 transition-all duration-200"
//         >
//           <div className="flex items-center gap-x-2">
//             <VscSignOut className="text-lg" />
//             <span>Logout</span>
//           </div>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Sidebar






import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { VscAccount } from "react-icons/vsc"
import { MdOutlinePlayLesson } from "react-icons/md"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoSettingsOutline } from "react-icons/io5"
import { TbLogout } from "react-icons/tb"
import { logout } from "../../../services/operations/authAPI"

const sidebarLinks = [
  { id: 1, name: "My Profile",       path: "/dashboard/my-profile",       icon: <VscAccount size={20} /> },
  { id: 2, name: "Enrolled Courses", path: "/dashboard/enrolled-courses",  icon: <MdOutlinePlayLesson size={20} /> },
  { id: 3, name: "Your Cart",        path: "/dashboard/cart",              icon: <AiOutlineShoppingCart size={20} /> },
  { id: 4, name: "Settings",         path: "/dashboard/settings",          icon: <IoSettingsOutline size={20} /> },
]

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const matchRoute = (path) => location.pathname === path

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] w-[222px] border-r border-richblack-700 bg-richblack-800 py-10">

      {/* Nav Links */}
      <div className="flex flex-col gap-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200
              ${matchRoute(link.path)
                ? "bg-yellow-800 text-yellow-50 border-l-4 border-yellow-50"
                : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5"
              }`}
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-6 my-4 border-t border-richblack-600" />

      {/* Logout */}
      <button
        onClick={() => dispatch(logout(navigate))}
        className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5 transition-all duration-200"
      >
        <TbLogout size={20} />
        <span>Logout</span>
      </button>

    </div>
  )
}

export default Sidebar