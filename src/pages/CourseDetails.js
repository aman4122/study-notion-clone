// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import { buyCourse } from '../services/operations/studentFeaturesAPI'

// const CourseDetails = () => {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { courseId } = useParams()

//   const handleBuyCourse = () => {
//     if (token) {
//       buyCourse(token, [courseId], user, navigate, dispatch)
//     } else {
//       navigate("/login")
//     }
//   }

//   return (
//     <div className='flex items-center justify-center min-h-[calc(100vh-3.5rem)] text-white'>
//       <button 
//         onClick={handleBuyCourse}
//         className='bg-yellow-50 p-6 text-richblack-900 font-bold rounded-lg hover:bg-yellow-100 transition-all'
//       >Buy Now
//       </button>
//     </div>
//   )
// }

// export default CourseDetails

















import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
// import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-hot-toast'














const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true)
        const res = await apiConnector(
          "POST",
          "http://localhost:4000/api/v1/course/getCourseDetails",
          { courseId },
          { Authorization: `Bearer ${token}` }
        )
        setCourseData(res?.data?.data)
      } catch (error) {
        console.log("Could not fetch course details", error)
      } finally {
        setLoading(false)
      }
    }
    if (courseId) fetchCourseDetails()
  }, [courseId])

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
    } else {
      navigate("/login")
    }
  }


  const handleAddToCart = () => {
    if (user && user?.accountType === "Instructor") {
      toast.error("Instructors can't buy courses!")
      return
    }
    if (courseData) {
      dispatch(addToCart(courseData))
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center text-white text-xl">
      Loading...
    </div>
  )

  if (!courseData) return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center text-white text-xl">
      Course not found
    </div>
  )

  return (
    <div className="bg-richblack-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-richblack-800 py-12">
        <div className="mx-auto max-w-maxContent w-11/12 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{courseData?.courseName}</h1>
          <p className="text-richblack-200 text-lg">{courseData?.courseDescription}</p>
          <p className="text-richblack-100">
            By{" "}
            <span className="text-yellow-50 font-semibold">
              {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
            </span>
          </p>
          <div className="flex items-center gap-6 mt-2">
            <span className="text-3xl font-bold text-yellow-50">Rs. {courseData?.price}</span>
            <button
              onClick={handleAddToCart}
              className="border border-yellow-50 text-yellow-50 font-bold px-8 py-3 rounded-lg hover:bg-yellow-50 hover:text-richblack-900 transition-all text-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyCourse}
              className="bg-yellow-50 text-richblack-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-100 transition-all text-lg"
            >
              Buy Now
            </button>
          </div>




        </div>
      </div>

      {/* What You Will Learn */}
      <div className="mx-auto max-w-maxContent w-11/12 py-10">
        <div className="border border-richblack-600 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
          <p className="text-richblack-200">{courseData?.whatYouWillLearn}</p>
        </div>

        {/* Sections + SubSections */}
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <div className="flex flex-col gap-4">
          {courseData?.courseContent?.length > 0 ? (
            courseData.courseContent.map((section, idx) => (
              <SectionAccordion key={section._id} section={section} defaultOpen={idx === 0} />
            ))
          ) : (
            <p className="text-richblack-400">No content available yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

const SectionAccordion = ({ section, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-richblack-600 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-richblack-700 hover:bg-richblack-600 transition-all"
      >
        <span className="font-semibold text-lg">{section?.sectionName}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="flex flex-col">
          {section?.subSection?.length > 0 ? (
            section.subSection.map((sub) => (
              <div key={sub._id} className="flex items-center gap-4 p-4 border-t border-richblack-600 hover:bg-richblack-800 transition-all">
                <span className="text-yellow-50">▶</span>
                <div>
                  <p className="font-medium">{sub?.title}</p>
                  <p className="text-richblack-400 text-sm">{sub?.timeDuration}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-richblack-400 p-4">No lectures yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default CourseDetails