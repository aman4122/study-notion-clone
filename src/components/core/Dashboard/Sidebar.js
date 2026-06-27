import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { VscAccount, VscDashboard, VscVm, VscAdd } from "react-icons/vsc"
import { MdOutlinePlayLesson } from "react-icons/md"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoSettingsOutline } from "react-icons/io5"
import { TbLogout } from "react-icons/tb"
import { logout } from "../../../services/operations/authAPI"

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.profile)

  const matchRoute = (path) => location.pathname === path

  const sidebarLinks = [
    { id: 1, name: "My Profile", path: "/dashboard/my-profile", icon: <VscAccount size={20} /> },
  ]

  if (user?.accountType === "Student") {
    sidebarLinks.push(
      { id: 2, name: "Enrolled Courses", path: "/dashboard/enrolled-courses", icon: <MdOutlinePlayLesson size={20} /> },
      { id: 3, name: "Your Cart", path: "/dashboard/cart", icon: <AiOutlineShoppingCart size={20} /> }
    )
  } else if (user?.accountType === "Instructor") {
    sidebarLinks.push(
      { id: 2, name: "Dashboard", path: "/dashboard/instructor", icon: <VscDashboard size={20} /> },
      { id: 3, name: "My Courses", path: "/dashboard/my-courses", icon: <VscVm size={20} /> },
      { id: 4, name: "Add Course", path: "/dashboard/add-course", icon: <VscAdd size={20} /> }
    )
  } else if (user?.accountType === "Admin") {
    sidebarLinks.push(
      { id: 2, name: "Dashboard", path: "/dashboard/admin", icon: <VscDashboard size={20} /> }
    )
  }

  sidebarLinks.push({ id: 99, name: "Settings", path: "/dashboard/settings", icon: <IoSettingsOutline size={20} /> })

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