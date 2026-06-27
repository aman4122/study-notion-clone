import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RiEditBoxLine } from "react-icons/ri"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`
    : "U"

  return (
    <div className="text-white w-full max-w-[1000px] mx-auto py-10 px-4 md:px-8">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>

      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 md:px-12 mb-8 gap-y-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
          {user?.image ? (
            <img
              src={user.image}
              alt={`profile-${user.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-[78px] items-center justify-center rounded-full bg-red-600 font-bold text-2xl text-white">
              {initials}
            </div>
          )}
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
        >
          <span>Edit</span>
          <RiEditBoxLine />
        </button>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-y-4 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 md:px-12 mb-8">
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-y-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
          >
            <span>Edit</span>
            <RiEditBoxLine />
          </button>
        </div>
        <p className="text-richblack-400 text-sm font-medium">
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col gap-y-6 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 md:px-12">
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-y-4">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
          >
            <span>Edit</span>
            <RiEditBoxLine />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contact ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.birthDate ?? "January 1, 1970"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
