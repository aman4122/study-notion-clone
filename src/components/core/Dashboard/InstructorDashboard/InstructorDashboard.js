import React from 'react'

const InstructorDashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-medium text-richblack-5 mb-14">Instructor Dashboard</h1>
      <div className="flex flex-col gap-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
            <h2 className="text-lg font-semibold text-richblack-5">Total Courses</h2>
            <p className="text-3xl font-bold text-yellow-50 mt-4">0</p>
          </div>
          <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
            <h2 className="text-lg font-semibold text-richblack-5">Total Students</h2>
            <p className="text-3xl font-bold text-yellow-50 mt-4">0</p>
          </div>
          <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
            <h2 className="text-lg font-semibold text-richblack-5">Total Income</h2>
            <p className="text-3xl font-bold text-yellow-50 mt-4">Rs. 0</p>
          </div>
        </div>
        
        <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700">
          <h2 className="text-xl font-bold text-richblack-5 mb-4">Your Courses</h2>
          <p className="text-richblack-300">You have not created any courses yet.</p>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
