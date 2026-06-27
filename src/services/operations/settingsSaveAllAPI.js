import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints, endpoints } from "../apis"

const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, GET_USER_DETAILS_API, UPDATE_EMAIL_API } = profileEndpoints
const { CHANGE_PASSWORD_API } = endpoints

const getCleanToken = (token) => {
  if (typeof token === "string") {
    return token.replace(/^"(.*)"$/, "$1");
  }
  return token;
}

/**
 * Unified "Save All" for Settings page.
 * Shows a single "Updating Profile" toast throughout.
 * Handles: display picture upload + profile info + password change.
 */
export function saveAllSettings(token, { imageFile, profileData, passwordData, emailData, navigate }) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile...")
    const cleanToken = getCleanToken(token)
    let hasError = false

    try {
      // 1. Upload display picture if a new one was selected
      if (imageFile) {
        const formData = new FormData()
        formData.append("displayPicture", imageFile)
        const picResponse = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cleanToken}`,
          }
        )
        if (!picResponse.data.success) {
          throw new Error(picResponse.data.message)
        }
      }

      // 2. Update profile info (firstName, lastName, gender, contact, etc.)
      const profileResponse = await apiConnector("PUT", UPDATE_PROFILE_API, profileData, {
        Authorization: `Bearer ${cleanToken}`,
      })
      if (!profileResponse.data.success) {
        throw new Error(profileResponse.data.message)
      }

      // 3. Update email if changed
      if (emailData && emailData.email) {
        const emailResponse = await apiConnector("PUT", UPDATE_EMAIL_API, { email: emailData.email }, {
          Authorization: `Bearer ${cleanToken}`,
        })
        if (!emailResponse.data.success) {
          throw new Error(emailResponse.data.message)
        }
      }

      // 4. Change password only if all 3 password fields are filled
      if (passwordData.password && passwordData.newPassword && passwordData.confirmPassword) {
        const passResponse = await apiConnector("PUT", CHANGE_PASSWORD_API, passwordData, {
          Authorization: `Bearer ${cleanToken}`,
        })
        if (!passResponse.data.success) {
          throw new Error(passResponse.data.message)
        }
      }

      // 4. Re-fetch full user details so Redux + sessionStorage stay fresh
      const userResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${cleanToken}`,
      })
      if (userResponse.data.success) {
        const userData = userResponse.data.data
        const userImage = userData.image
          ? userData.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`
        dispatch(setUser({ ...userData, image: userImage }))
        sessionStorage.setItem("user", JSON.stringify(userData))
      }

      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("SAVE_ALL_SETTINGS ERROR............", error)
      toast.error(error.response?.data?.message || error.message || "Could Not Update Profile")
      hasError = true
    }

    toast.dismiss(toastId)

    if (!hasError && navigate) {
      navigate("/dashboard/my-profile")
    }
  }
}
