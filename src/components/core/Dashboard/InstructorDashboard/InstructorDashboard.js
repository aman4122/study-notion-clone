import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'
import InstructorChart from './InstructorChart'

const InstructorDashboard = () => {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true)
      const res = await fetchInstructorCourses(token)
      if (res) {
        setCourses(res)
      }
      setLoading(false)
    }
    getCourses()
  }, [token])

  const totalCourses = courses.length
  const totalStudents = courses.reduce((acc, course) => acc + (course.studentsEnrolled?.length || 0), 0)
  const totalIncome = courses.reduce((acc, course) => acc + ((course.price || 0) * (course.studentsEnrolled?.length || 0)), 0)

  if (loading) {
    return <div className="text-white flex justify-center items-center min-h-[50vh]">Loading...</div>
  }

  return (
    <div display='flex' className="text-white">
      <h1 className="text-3xl font-medium text-richblack-5 mb-14">Instructor Dashboard</h1>
      <div className="flex flex-col gap-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
            <h2 className="text-lg font-semibold text-richblack-5">Total Courses</h2>
            <p className="text-3xl font-bold text-yellow-50 mt-4">{totalCourses}</p>
          </div>
          <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
            <h2 className="text-lg font-semibold text-richblack-5">Total Students</h2>
            <p className="text-3xl font-bold text-yellow-50 mt-4">{totalStudents}</p>
          </div>
          <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
            <h2 className="text-lg font-semibold text-richblack-5">Total Income</h2>
            <p className="text-3xl font-bold text-yellow-50 mt-4">Rs. {totalIncome}</p>
          </div>
        </div>
        
        <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-richblack-5">Your Courses</h2>
            <button 
              onClick={() => navigate('/dashboard/my-courses')}
              className="text-yellow-50 font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          
          {courses.length === 0 ? (
            <p className="text-richblack-300">You have not created any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="flex flex-col gap-2">
                  <img 
                    src={course.thumbnail} 
                    alt={course.courseName}
                    className="h-[200px] w-full rounded-md object-cover"
                  />
                  <div className="mt-2">
                    <p className="text-xl font-bold text-richblack-5 truncate">{course.courseName}</p>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-richblack-300">
                      <p>{course.studentsEnrolled?.length || 0} students</p>
                      <p>|</p>
                      <p>Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {courses.length > 0 && <InstructorChart courses={courses} />}
    </div>
  )
}

export default InstructorDashboard
