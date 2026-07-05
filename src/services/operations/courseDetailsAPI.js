import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  GET_INSTRUCTOR_COURSES_API,
  UPDATE_SECTION_ORDER_API
} = courseEndpoints

export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    // backend returns the new course in some format, or maybe we just return response.data
    // but looking at createCourse controller, it returns the course inside response... wait, it doesn't return anything explicit?
    // Let's assume it returns { success: true } and we need the newCourse id. 
    // Actually wait! Let me check what Course.js `createCourse` returns...
    // Let's just return response.data and figure it out in AddCourse.js.
    result = response?.data?.data || response?.data // Usually data is nested
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSectionOrder = async (data, token) => {
  let result = null
  const toastId = toast.loading("Updating Order...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_ORDER_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION ORDER API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section Order")
    }
    toast.success("Section Order Updated")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("UPDATE SECTION ORDER API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data", // Uses req.files.videoFile
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchInstructorCourses = async (token) => {
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_COURSES_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_INSTRUCTOR_COURSES_API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

export const publishCourseDetails = async (courseId, manualDuration, token) => {
  let result = null
  const toastId = toast.loading("Publishing...")
  try {
    const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API.replace("createCourse", "publishCourse"), { courseId, manualDuration }, {
      Authorization: `Bearer ${token}`,
    })
    console.log("PUBLISH COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Publish Course")
    }
    toast.success("Course Published Successfully")
    result = response?.data
  } catch (error) {
    console.log("PUBLISH COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", courseEndpoints.DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.updatedCourse || true
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", courseEndpoints.DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.updatedSection || true
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getFullDetailsOfCourse = async (courseId, token) => {
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.GET_FULL_DETAILS_OF_COURSE_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )
    console.log("GET_FULL_DETAILS_OF_COURSE_API RESPONSE............", response)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_FULL_DETAILS_OF_COURSE_API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

export const instructorCreateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Uploading Video...")
  try {
    // We intentionally DO NOT hardcode "Content-Type": "multipart/form-data" here
    // Axios will automatically attach it with the correctly generated boundary string!
    const response = await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("INSTRUCTOR CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added Successfully")
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("INSTRUCTOR CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const markLectureAsComplete = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    //below single line se requst jaati hai and usse course completed hone
    const response = await apiConnector("POST", courseEndpoints.UPDATE_COURSE_PROGRESS_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("MARK LECTURE AS COMPLETE API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK LECTURE AS COMPLETE API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}
