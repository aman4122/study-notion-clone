import axios from "axios";
import { BASE_URL } from "../apis";
import { getCleanToken } from "./authAPI";

// Fetch all courses (uses existing controller)
export const fetchAllCourses = async () => {
  const token = getCleanToken();
  const { data } = await axios.get(`${BASE_URL}/api/v1/course/getAllCourses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Capture Razorpay order for selected courses
export const capturePayment = async (courses) => {
  const token = getCleanToken();
  const { data } = await axios.post(
    `${BASE_URL}/api/v1/payments/capturePayment`,
    { courses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

// Verify Razorpay payment after checkout
export const verifyPayment = async (payload) => {
  const token = getCleanToken();
  const { data } = await axios.post(
    `${BASE_URL}/api/v1/payments/verifyPayment`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
