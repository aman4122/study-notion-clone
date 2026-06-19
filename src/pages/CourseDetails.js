import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { courseId } = useParams()

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
    } else {
      navigate("/login")
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-3.5rem)] text-white'>
      <button 
        onClick={handleBuyCourse}
        className='bg-yellow-50 p-6 text-richblack-900 font-bold rounded-lg hover:bg-yellow-100 transition-all'
      >Buy Now
      </button>
    </div>
  )
}

export default CourseDetails