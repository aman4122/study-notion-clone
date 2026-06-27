import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiClock, FiCheckCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'

const InstructorCourses = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    }
    fetchCourses()
  }, [token])

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-14">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <button
          onClick={() => navigate('/dashboard/add-course')}
          className="flex items-center gap-x-2 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-100 transition-all"
        >
          <FiPlus />
          Add Course
        </button>
      </div>

      <div className="bg-richblack-800 p-8 rounded-md border border-richblack-700">
        {loading ? (
          <div className="flex justify-center py-20 text-richblack-300">Loading your courses...</div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-richblack-300 font-medium mb-4">You have not created any courses yet</p>
            <button
              onClick={() => navigate('/dashboard/add-course')}
              className="text-yellow-50 font-semibold hover:underline"
            >
              Create your first course
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-12 text-sm text-richblack-300 font-medium uppercase border-b border-richblack-700 pb-2">
              <div className="col-span-8">Courses</div>
              <div className="col-span-2 text-center">Duration</div>
              <div className="col-span-2 text-center">Price</div>
            </div>
            
            {courses.map((course) => (
              <div key={course._id} className="grid grid-cols-12 gap-x-4 border-b border-richblack-700 pb-6 last:border-0 last:pb-0">
                <div className="col-span-8 flex gap-x-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.courseName} 
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold text-richblack-5">{course.courseName}</h2>
                    <p className="text-xs text-richblack-300 w-3/4">
                      {course.courseDescription.split(" ").length > 30 
                        ? course.courseDescription.split(" ").slice(0, 30).join(" ") + "..." 
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white mt-1">
                      Created: {new Date(course.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center gap-x-2 mt-2 w-fit bg-richblack-700 rounded-full px-3 py-1">
                      <FiCheckCircle className="text-caribbeangreen-200" size={14} />
                      <p className="text-xs font-medium text-caribbeangreen-200">Published</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-center text-sm font-medium text-richblack-50">
                  <span className="mt-2">{course?.totalDuration || "0m 0s"}</span>
                </div>
                
                <div className="col-span-2 flex justify-center text-sm font-medium text-richblack-50">
                  <span className="mt-2">₹{course.price}</span>
                </div>
                
                <div className="col-span-1 flex flex-col justify-center gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    className="text-yellow-50 bg-richblack-700 px-3 py-1 rounded-md text-xs font-semibold hover:bg-richblack-600 transition-all w-fit mx-auto"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InstructorCourses
