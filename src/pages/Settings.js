// import React, { useState, useRef } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { FiUpload } from "react-icons/fi"
// import { updateDisplayPicture, updateProfile, changePassword } from "../services/operations/profileAPI"

// const Settings = () => {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const [imageFile, setImageFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(null)
//   const fileInputRef = useRef(null)

//   const [profileData, setProfileData] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     birthDate: user?.additionalDetails?.birthDate || "",
//     gender: user?.additionalDetails?.gender || "Male",
//     contact: user?.additionalDetails?.contact || "",
//     about: user?.additionalDetails?.about || "",
//   })

//   const [passwordData, setPasswordData] = useState({
//     password: "",
//     newPassword: "",
//     confirmPassword: "",
//   })

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       previewFile(file)
//     }
//   }

//   const previewFile = (file) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   const handleImageUpload = (e) => {
//     e.preventDefault()
//     if (!imageFile) return
//     const formData = new FormData()
//     formData.append("displayPicture", imageFile)
//     dispatch(updateDisplayPicture(token, formData))
//   }

//   const handleProfileChange = (e) => {
//     setProfileData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handleProfileSubmit = (e) => {
//     e.preventDefault()
//     dispatch(updateProfile(token, profileData, navigate))
//   }

//   const handlePasswordChange = (e) => {
//     setPasswordData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault()
//     dispatch(changePassword(token, passwordData, navigate))
//   }

//   return (
//     <div className="text-white space-y-10 w-full max-w-[1000px] mx-auto py-10 px-4 md:px-8">
//       <h1 className="text-3xl font-medium text-richblack-5 mb-14">Edit Profile</h1>

//       {/* 1. Change Profile Picture */}
//       <div className="flex items-center gap-x-4 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <img
//           src={previewSource || user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[78px] rounded-full object-cover"
//         />
//         <div className="space-y-3">
//           <p className="font-semibold text-richblack-5">Change Profile Picture</p>
//           <div className="flex gap-x-3">
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               className="hidden"
//               accept="image/png, image/gif, image/jpeg, image/webp"
//             />
//             <button
//               onClick={() => fileInputRef.current.click()}
//               className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
//             >
//               Select
//             </button>
//             <button
//               onClick={handleImageUpload}
//               className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
//             >
//               <span>Upload</span>
//               <FiUpload />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 2. Edit Profile Information */}
//       <form onSubmit={handleProfileSubmit} className="rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 flex flex-col gap-y-6">
//         <p className="text-lg font-semibold text-richblack-5">Profile Information</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">First Name</span>
//             <input
//               type="text"
//               name="firstName"
//               value={profileData.firstName}
//               onChange={handleProfileChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">Last Name</span>
//             <input
//               type="text"
//               name="lastName"
//               value={profileData.lastName}
//               onChange={handleProfileChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">Date of Birth</span>
//             <input
//               type="date"
//               name="birthDate"
//               value={profileData.birthDate}
//               onChange={handleProfileChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">Gender</span>
//             <select
//               name="gender"
//               value={profileData.gender}
//               onChange={handleProfileChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Non-Binary">Non-Binary</option>
//               <option value="Other">Other</option>
//               <option value="Prefer not to say">Prefer not to say</option>
//             </select>
//           </label>
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">Contact Number</span>
//             <input
//               type="tel"
//               name="contact"
//               value={profileData.contact}
//               onChange={handleProfileChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">About</span>
//             <input
//               type="text"
//               name="about"
//               value={profileData.about}
//               onChange={handleProfileChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//         </div>
//         <div className="flex justify-end gap-x-2 mt-4">
//           <button
//             type="button"
//             onClick={() => navigate("/dashboard/my-profile")}
//             className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
//           >
//             Save
//           </button>
//         </div>
//       </form>

//       {/* 3. Change Password */}
//       <form onSubmit={handlePasswordSubmit} className="rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 flex flex-col gap-y-6">
//         <p className="text-lg font-semibold text-richblack-5">Password</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">Current Password</span>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter current password"
//               value={passwordData.password}
//               onChange={handlePasswordChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//           <label className="flex flex-col gap-y-1">
//             <span className="text-sm text-richblack-300">New Password</span>
//             <input
//               type="password"
//               name="newPassword"
//               placeholder="Enter new password"
//               value={passwordData.newPassword}
//               onChange={handlePasswordChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//           <label className="flex flex-col gap-y-1 md:col-span-2">
//             <span className="text-sm text-richblack-300">Confirm Password</span>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm new password"
//               value={passwordData.confirmPassword}
//               onChange={handlePasswordChange}
//               className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
//             />
//           </label>
//         </div>
//         <div className="flex justify-end gap-x-2 mt-4">
//           <button
//             type="button"
//             onClick={() => navigate("/dashboard/my-profile")}
//             className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Settings
















import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture, updateProfile, changePassword } from "../services/operations/profileAPI"
import { saveAllSettings } from "../services/operations/settingsSaveAllAPI"

const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const fileInputRef = useRef(null)

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthDate: user?.additionalDetails?.birthDate || "",
    gender: user?.additionalDetails?.gender || "Male",
    contact: user?.additionalDetails?.contact || "",
    about: user?.additionalDetails?.about || "",
  })

  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [emailData, setEmailData] = useState({
    email: user?.email || "",
  })

  const handleEmailChange = (e) => {
    setEmailData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleProfileChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // ✅ SINGLE SAVE ALL HANDLER — uses unified saveAllSettings (one toast for everything)
  const handleSaveAll = async (e) => {
    e.preventDefault()
    await dispatch(saveAllSettings(token, {
      imageFile,
      profileData,
      passwordData,
      emailData: emailData.email !== user?.email ? emailData : null,
      navigate,
    }))
  }

  return (
    <div className="text-white space-y-10 w-full max-w-[1000px] mx-auto py-10 px-4 md:px-8">
      <h1 className="text-3xl font-medium text-richblack-5 mb-14">Edit Profile</h1>

      {/* 1. Change Profile Picture */}
      <div className="flex items-center gap-x-4 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <img
          src={previewSource || user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-3">
          <p className="font-semibold text-richblack-5">Change Profile Picture</p>
          <div className="flex gap-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/webp"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
            >
              Select
            </button>
            {previewSource && (
              <span className="flex items-center text-yellow-50 text-sm font-medium">
                ✓ Image selected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Profile Information */}
      <div className="rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 flex flex-col gap-y-6">
        <p className="text-lg font-semibold text-richblack-5">Profile Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">First Name</span>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">Date of Birth</span>
            <input
              type="date"
              name="birthDate"
              value={profileData.birthDate}
              onChange={handleProfileChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">Gender</span>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleProfileChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">Contact Number</span>
            <input
              type="tel"
              name="contact"
              value={profileData.contact}
              onChange={handleProfileChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">About</span>
            <input
              type="text"
              name="about"
              value={profileData.about}
              onChange={handleProfileChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">Email</span>
            <input
              type="email"
              name="email"
              value={emailData.email}
              onChange={handleEmailChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
        </div>
      </div>

      {/* 3. Change Password */}
      <div className="rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 flex flex-col gap-y-6">
        <p className="text-lg font-semibold text-richblack-5">Password <span className="text-richblack-400 text-sm font-normal">(Optional — fill only if you want to change)</span></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">Current Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter current password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1">
            <span className="text-sm text-richblack-300">New Password</span>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
          <label className="flex flex-col gap-y-1 md:col-span-2">
            <span className="text-sm text-richblack-300">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none"
            />
          </label>
        </div>
      </div>

      {/* ✅ SINGLE FIXED SAVE ALL BUTTON */}
      <div className="sticky bottom-6 flex justify-end gap-x-3 bg-richblack-900 py-4 px-6 rounded-2xl border border-richblack-700 shadow-lg">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 py-2 px-6 font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveAll}
          className="rounded-md bg-yellow-50 py-2 px-8 font-semibold text-richblack-900 transition-all hover:bg-yellow-100 text-lg"
        >
          Save All Changes
        </button>
      </div>

    </div>
  )
}

export default Settings