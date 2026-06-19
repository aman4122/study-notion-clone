import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { studentEndpoints } from "../apis"
import { getUserDetails } from "./profileAPI"

const { COURSE_PAYMENT_API, COURSE_VERIFY_API } = studentEndpoints

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...")
  try {
    // 1. Load Razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!res) {
      toast.error("RazorPay SDK failed to load. Are you online?")
      return
    }

    // 2. Initiate order from backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }

    console.log("PAYMENT RESPONSE FROM BACKEND:", orderResponse.data)

    const orderData = orderResponse.data.message

    // 3. Open Razorpay checkout options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_SgH8X9SFF5QXIA",
      currency: orderData.currency,
      amount: `${orderData.amount}`,
      order_id: orderData.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // Upon successful signature, verify payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error)
    toast.error(error.response?.data?.message || "Could Not Initiate Payment")
  }
  toast.dismiss(toastId)
}

// Verify Payment details on backend
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful! Course Added.")
    dispatch(getUserDetails(token, navigate))
    navigate("/dashboard/my-profile")
  } catch (error) {
    console.log("PAYMENT VERIFICATION ERROR.....", error)
    toast.error("Payment Verification Failed")
  }
  toast.dismiss(toastId)
}
