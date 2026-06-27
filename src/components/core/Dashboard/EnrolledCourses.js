import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from "../../../services/apiconnector"
import { Link } from "react-router-dom"

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true)
        const res = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/course/getEnrolledCourses",
          null,
          { Authorization: `Bearer ${token}` }
        )
        setEnrolledCourses(res?.data?.data || [])
      } catch (err) {
        console.log("Could not fetch enrolled courses", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEnrolledCourses()
  }, [token])

  if (loading) return (
    <div className="text-white text-xl">Loading...</div>
  )

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-richblack-5 mb-8">Enrolled Courses</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-richblack-400">No courses enrolled yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="hidden md:grid md:grid-cols-4 px-4 py-2 text-richblack-400 text-sm font-medium border-b border-richblack-700">
            <span className="col-span-1">Course</span>
            <span className="text-center">Duration</span>
            <span className="text-center">Avg Rating</span>
            <span className="text-right">Progress</span>
          </div>

          {/* Course List */}
          {enrolledCourses.map((course) => {
            const avgRating = course?.ratingandReviews?.length > 0 
              ? (course.ratingandReviews.reduce((acc, curr) => acc + curr.rating, 0) / course.ratingandReviews.length).toFixed(1)
              : 0;
            return (
              <Link
                to={`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`}
                key={course._id}
                className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 items-start md:items-center px-4 py-4 bg-richblack-800 rounded-lg border border-richblack-700 hover:border-yellow-50 transition-all"
              >
                {/* Course Info */}
                <div className="flex items-center gap-4 col-span-1">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="w-16 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold text-richblack-5">{course?.courseName}</p>
                    <p className="text-richblack-400 text-sm">
                      {course?.courseContent?.length || 0} Sections
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="text-left md:text-center text-richblack-300 text-sm flex gap-2 md:block">
                  <span className="md:hidden font-semibold text-richblack-100">Duration: </span>
                  {course?.totalDuration || "N/A"}
                </div>

                {/* Avg Rating */}
                <div className="text-left md:text-center text-richblack-300 text-sm flex items-center gap-1">
                  <span className="md:hidden font-semibold text-richblack-100 mr-1">Rating: </span>
                  {avgRating > 0 ? (
                    <>
                      <span className="text-yellow-50 font-semibold">{avgRating}</span>
                      <span className="text-yellow-100">★</span>
                    </>
                  ) : (
                    "No ratings"
                  )}
                </div>

                {/* Progress */}
                <div className="flex flex-col items-start md:items-end gap-1 w-full md:w-auto">
                  <span className="text-richblack-300 text-sm">Progress: {course.progressPercentage || 0}%</span>
                  <div className="w-full md:w-32 h-2 bg-richblack-700 rounded-full">
                    <div
                      className="h-2 bg-yellow-50 rounded-full transition-all duration-500"
                      style={{ width: `${course.progressPercentage || 0}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses