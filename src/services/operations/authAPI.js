import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { resetCart, syncCartWithUser } from "../../slices/cartSlice"
import { apiConnector } from "../apiconnector"
import { endpoints, profileEndpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
} = endpoints

const {
  GET_USER_DETAILS_API,
} = profileEndpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserExists: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error.response?.data?.message || "Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error.response?.data?.message || "Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      
      // Fetch fully populated user details
      const userDetailsResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${response.data.token}`,
      })
      
      if (!userDetailsResponse.data.success) {
        throw new Error(userDetailsResponse.data.message)
      }
      
      const userDetails = userDetailsResponse.data.data
      const userImage = userDetails.image
        ? userDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userDetails.firstName} ${userDetails.lastName}`
      dispatch(setUser({ ...userDetails, image: userImage }))
      dispatch(syncCartWithUser(userDetails.email))
      
      sessionStorage.setItem("token", JSON.stringify(response.data.token))
      sessionStorage.setItem("user", JSON.stringify(userDetails))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response?.data?.message || "Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
