import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { logout } from "../../../services/operations/authAPI"
import { VscSignOut, VscAccount, VscBook, VscSettingsGear, VscArchive } from "react-icons/vsc"

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)

  const matchRoute = (route) => {
    return location.pathname === route
  }

  const sidebarLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: VscAccount,
    },
    {
      id: 2,
      name: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      icon: VscBook,
    },
    {
      id: 3,
      name: "Your Cart",
      path: "/dashboard/cart",
      icon: VscArchive,
    },
    {
      id: 4,
      name: "Settings",
      path: "/dashboard/settings",
      icon: VscSettingsGear,
    },
  ]

  return (
    <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 text-richblack-300">
      <div className="flex flex-col gap-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = matchRoute(link.path)
          return (
            <Link
              key={link.id}
              to={link.path}
              className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
                isActive ? "bg-yellow-800 text-yellow-50" : "bg-transparent text-richblack-300"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50" />
              )}
              <div className="flex items-center gap-x-2">
                <Icon className="text-lg" />
                <span>{link.name}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600" />

      <div className="flex flex-col">
        <button
          onClick={() => dispatch(logout(navigate))}
          className="px-8 py-2 text-sm font-medium text-richblack-300 hover:text-richblack-5 transition-all duration-200"
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
