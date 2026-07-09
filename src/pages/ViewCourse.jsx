import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

const ViewCourse = () => {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const res = await apiConnector("POST", process.env.REACT_APP_BASE_URL + "/course/getCourseFullDetails", { courseId }, {
        Authorization: `Bearer ${token}`,
      })

      if (res?.data?.success) {
        dispatch(setCourseSectionData(res.data.data.courseDetails.courseContent))
        dispatch(setEntireCourseData(res.data.data.courseDetails))
        dispatch(setCompletedLectures(res.data.data.completedVideos || []))
        let lectures = 0
        res.data.data.courseDetails.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))
      }
    }
    setCourseSpecificDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token])

  return (
    <>
      <div className="relative flex flex-col-reverse md:flex-row h-[calc(100vh-3.5rem)] text-white overflow-hidden">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-full flex-1 overflow-y-auto">
          <div className="mx-2 md:mx-6 flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

export default ViewCourse
