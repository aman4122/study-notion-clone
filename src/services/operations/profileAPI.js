import { toast } from "react-hot-toast"
import { setUser, setLoading } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints, endpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API } = profileEndpoints
const { CHANGE_PASSWORD_API } = endpoints

const getCleanToken = (token) => {
  if (typeof token === "string") {
    return token.replace(/^"(.*)"$/, "$1");
  }
  return token;
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    const cleanToken = getCleanToken(token)
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${cleanToken}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile Picture...")
    const cleanToken = getCleanToken(token)
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cleanToken}`,
        }
      )
      console.log("UPDATE_DISPLAY_PICTURE API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile...")
    const cleanToken = getCleanToken(token)
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${cleanToken}`,
      })
      console.log("UPDATE_PROFILE API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      toast.success("Profile Updated Successfully")
      dispatch(getUserDetails(cleanToken, navigate))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("UPDATE_PROFILE API ERROR............", error)
      toast.error(error.response?.data?.message || "Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export function changePassword(token, formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Password...")
    const cleanToken = getCleanToken(token)
    try {
      const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${cleanToken}`,
      })
      console.log("CHANGE_PASSWORD API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Updated Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD API ERROR............", error)
      toast.error(error.response?.data?.message || "Could Not Update Password")
    }
    toast.dismiss(toastId)
  }
}
