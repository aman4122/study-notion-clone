const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_API:BASE_URL + "/course/showAllCategories",
    CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",

}

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    UPDATE_EMAIL_API: BASE_URL + "/profile/updateEmail",
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payments/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payments/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payments/sendPaymentSuccessEmail",
}

export const courseEndpoints = {
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
}