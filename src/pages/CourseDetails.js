import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { apiConnector } from '../services/apiconnector'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-hot-toast'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { FaShareSquare } from "react-icons/fa"
const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showShareModal, setShowShareModal] = useState(false)

  function shareHandler() {
    setShowShareModal(true)
  }

  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [fullCourseData, setFullCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const previewRes = await apiConnector(
          "POST",
          process.env.REACT_APP_BASE_URL + "/course/getCoursePreview",
          { courseId },
          { Authorization: `Bearer ${token}` }
        )
        const preview = previewRes?.data?.data
        setCourseData(preview)

        const enrolled = preview?.studentsEnrolled?.some(
          (sid) => String(sid) === String(user?._id) || String(sid?._id) === String(user?._id)
        )
        setIsEnrolled(enrolled)

        if (enrolled) {
          const fullRes = await apiConnector(
            "POST",
            process.env.REACT_APP_BASE_URL + "/course/getCourseFullDetails",
            { courseId },
            { Authorization: `Bearer ${token}` }
          )
          setFullCourseData(fullRes?.data?.data)
        }
      } catch (error) {
        console.log("Could not fetch course details", error)
      } finally {
        setLoading(false)
      }
    }
    if (courseId) fetchCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  // ✅ isActive: array of section _ids that are currently open
  const [isActive, setIsActive] = useState([])

  // ✅ Seed first section open once fullCourseData arrives
  useEffect(() => {
    if (fullCourseData?.courseContent?.length > 0) {
      setIsActive([fullCourseData.courseContent[0]._id])
    }
  }, [fullCourseData])

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    )
  }

  const handleCollapseToggle = () => {
    const allIds = fullCourseData?.courseContent?.map((s) => s._id) || []
    // eslint-disable-next-line no-unused-vars
    const allOpen = allIds.every((id) => isActive.includes(id))
    setIsActive([])
  }

  // eslint-disable-next-line no-unused-vars
  const allSectionsOpen =
    fullCourseData?.courseContent?.length > 0 &&
    fullCourseData.courseContent.every((s) => isActive.includes(s._id))

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

  const avgReviewCount = courseData?.ratingandReviews?.length || 0
  const ratingAvg = avgReviewCount > 0
    ? courseData.ratingandReviews.reduce((acc, curr) => acc + curr.rating, 0) / avgReviewCount
    : 0

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingAvg) stars.push(<span key={i} className="text-yellow-100 text-xl">★</span>)
      else stars.push(<span key={i} className="text-richblack-600 text-xl">★</span>)
    }
    return stars
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const courseUrl = window.location.href
  const shareText = `Check out this course: ${courseData?.courseName}`

  const shareOptions = [
    {
      label: "WhatsApp",
      icon: "💬",
      color: "bg-green-600 hover:bg-green-500",
      action: () => window.open(
        `https://wa.me/?text=${encodeURIComponent(shareText + " " + courseUrl)}`,
        "_blank"
      )
    },
    {
      label: "Email",
      icon: "📧",
      color: "bg-blue-600 hover:bg-blue-500",
      action: () => window.open(
        `mailto:?subject=${encodeURIComponent(courseData?.courseName)}&body=${encodeURIComponent(shareText + "\n\n" + courseUrl)}`,
        "_blank"
      )
    },
    {
      label: "Twitter/X",
      icon: "🐦",
      color: "bg-sky-500 hover:bg-sky-400",
      action: () => window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(courseUrl)}`,
        "_blank"
      )
    },
    {
      label: "Copy Link",
      icon: "🔗",
      color: "bg-richblack-600 hover:bg-richblack-500",
      action: () => {
        navigator.clipboard.writeText(courseUrl)
        toast.success("Link copied to clipboard!")
        setShowShareModal(false)
      }
    }
  ]

  return (
    <div className="bg-richblack-900 text-white min-h-screen pb-10">
      {/* Hero Section */}
      <div className="bg-richblack-800 py-12 relative border-b border-richblack-700">
        <div className="mx-auto max-w-maxContent w-11/12 grid lg:grid-cols-3 gap-8 relative">

          <div className="lg:col-span-2 flex flex-col gap-4 pr-10">
            <p className="text-richblack-300 text-sm">
              Home / Catalog / <span className="text-yellow-50">{courseData?.category?.name || "Category"}</span>
            </p>
            <h1 className="text-4xl font-bold">{courseData?.courseName}</h1>
            <p className="text-richblack-200 text-lg">{courseData?.courseDescription}</p>

            <a href="#reviews" className="flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer">
              <span className="text-yellow-50 font-bold">{ratingAvg.toFixed(1)}</span>
              <div className="flex items-center gap-1">{renderStars()}</div>
              <span className="text-richblack-300 hover:text-yellow-50 hover:underline transition-all">
                ({avgReviewCount} reviews)
              </span>
              <span className="text-richblack-100 ml-2">{courseData?.studentsEnrolled?.length || 0} students enrolled</span>
            </a>

            <p className="text-richblack-100 text-lg">
              Created By{" "}
              <span className="text-yellow-50 font-semibold">
                {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
              </span>
            </p>

            <div className="flex items-center gap-6 text-richblack-200 mt-2">
              <div className="flex items-center gap-2">
                <BiInfoCircle className="text-xl" />
                <span>Created at {courseData?.createdAt ? formatDate(courseData.createdAt) : "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineGlobeAlt className="text-xl" />
                <span>English</span>
              </div>
            </div>
          </div>

          {/* Floating Action Card */}
          <div className="lg:col-span-1 lg:absolute right-0 top-0 lg:w-[400px]">
            <div className="bg-richblack-700 rounded-lg overflow-hidden border border-richblack-600 shadow-xl flex flex-col">
              <img
                src={courseData?.thumbnail}
                alt={courseData?.courseName}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-6 flex flex-col gap-4">
                <span className="text-3xl font-bold text-white">Rs. {courseData?.price}</span>

                {isEnrolled ? (
                  <button
                    onClick={() => navigate("/dashboard/enrolled-courses")}
                    className="w-full bg-yellow-50 text-richblack-900 font-bold py-3 rounded-md hover:bg-yellow-100 transition-all duration-200 hover:scale-95 active:scale-90 text-lg"
                  >
                    Go to Course
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleBuyCourse}
                      className="w-full bg-yellow-50 text-richblack-900 font-bold py-3 rounded-md hover:bg-yellow-100 transition-all duration-200 hover:scale-95 active:scale-90 text-lg"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="w-full border border-yellow-50 text-yellow-50 font-bold py-3 rounded-md hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-200 hover:scale-95 active:scale-90 text-lg"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
                <p className="text-center text-richblack-200 text-sm">30-Day Money-Back Guarantee</p>

                <div className="mt-4">
                  <h3 className="text-white font-semibold text-lg mb-2">This Course Includes :</h3>
                  <ul className="flex flex-col gap-2 text-caribbeangreen-100 text-sm">
                    <li className="flex items-center gap-2"><span>▶</span> Lifetime access to course materials</li>
                    <li className="flex items-center gap-2"><span>▶</span> Comprehensive Video Lectures</li>
                    <li className="flex items-center gap-2"><span>▶</span> Certificate of completion</li>
                  </ul>
                </div>

                <button
                  onClick={shareHandler}
                  className="flex items-center justify-center gap-2 text-yellow-100 font-medium mt-4 hover:scale-105 transition-all duration-200">
                  <FaShareSquare /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Sections */}
      <div className="mx-auto max-w-maxContent w-11/12 grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div className="border border-richblack-600 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">What you'll learn</h2>
            <p className="text-richblack-200">{fullCourseData?.whatYouWillLearn || courseData?.whatYouWillLearn}</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Course Content</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-richblack-200">{fullCourseData?.courseContent?.length || 0} section(s)</span>
              <button
                className="text-yellow-50 font-medium hover:text-yellow-100 transition-colors duration-200"
                onClick={handleCollapseToggle}
              >
                {"Collapse all sections"}
              </button>
            </div>

            {isEnrolled && fullCourseData ? (
              <div className="flex flex-col gap-4">
                {fullCourseData?.courseContent?.length > 0 ? (

                  fullCourseData.courseContent.map((section) => (
                    <SectionAccordion
                      key={section._id}
                      section={section}
                      isOpen={isActive.includes(section._id)}
                      onToggle={() => handleActive(section._id)}
                    />
                  ))
                ) : (
                  <p className="text-richblack-400">No content available yet.</p>
                )}
              </div>
            ) : (
              <div className="border border-richblack-600 p-6 rounded-lg text-center">
                <p className="text-richblack-300">Purchase this course to access all sections, lectures, and resources.</p>
              </div>
            )}
          </div>

          {/* Review Section — only for enrolled students */}
          {isEnrolled && (
            <div className="mt-10" id="reviews">
              <h2 className="text-3xl font-bold mb-4">Reviews</h2>
              <ReviewForm
                courseId={courseId}
                token={token}
                existingReview={courseData?.ratingandReviews?.find(r => r.user === user?._id || r.user?._id === user?._id)}
              />
              {courseData?.ratingandReviews?.length > 0 && (
                <div className="mt-6 flex flex-col gap-4">
                  {courseData.ratingandReviews.map((rev, idx) => (
                    <div key={idx} className="bg-richblack-800 p-4 rounded-lg border border-richblack-700">
                      <div className="flex items-center gap-4 mb-3">
                        <img
                          src={rev?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${rev?.user?.firstName || 'User'} ${rev?.user?.lastName || ''}`}
                          alt="user profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-richblack-5">
                            {rev?.user?.firstName} {rev?.user?.lastName}
                          </p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <span key={i} className={`text-sm ${i <= rev.rating ? 'text-yellow-100' : 'text-richblack-600'}`}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-richblack-200">{rev.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-richblack-800 rounded-xl p-6 w-[340px] flex flex-col gap-4 border border-richblack-600 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white text-xl font-bold">Share this Course</h3>
              <button onClick={() => setShowShareModal(false)} className="text-richblack-400 hover:text-white text-2xl transition-all">✕</button>
            </div>
            <div className="flex items-center gap-3 bg-richblack-700 p-3 rounded-lg">
              <img src={courseData?.thumbnail} className="w-14 h-14 rounded-md object-cover" alt="thumb" />
              <p className="text-richblack-100 text-sm font-medium line-clamp-2">{courseData?.courseName}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((opt) => (
                <button key={opt.label} onClick={opt.action}
                  className={`${opt.color} text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-95 active:scale-90`}>
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-richblack-700 rounded-lg p-3 border border-richblack-500">
              <p className="text-richblack-300 text-xs truncate flex-1">{courseUrl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ✅ SectionAccordion now fully controlled by parent via isOpen + onToggle props
const SectionAccordion = ({ section, isOpen, onToggle }) => {
  const [activeVideo, setActiveVideo] = useState(null)
  const [durations, setDurations] = useState({})

  const handleLoadedMetadata = (e, subId) => {
    const duration = e.target.duration
    if (duration && !isNaN(duration)) {
      const m = Math.floor(duration / 60)
      const s = Math.floor(duration % 60)
      setDurations(prev => ({ ...prev, [subId]: `${m}:${s.toString().padStart(2, '0')}` }))
    }
  }

  return (
    <div className="border border-richblack-600 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 bg-richblack-700 hover:bg-richblack-600 transition-colors duration-200"
      >
        <span className="font-semibold text-lg">{section?.sectionName}</span>
        {/* ✅ Arrow rotates smoothly on open/close */}
        <span
          className={`text-yellow-50 text-sm transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* ✅ Section body slides open/closed with max-h transition */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          {section?.subSection?.length > 0 ? (
            section.subSection.map((sub) => (
              <div key={sub._id} className="flex flex-col border-t border-richblack-600">
                <div
                  className="flex items-center gap-4 p-4 hover:bg-richblack-800 cursor-pointer transition-colors duration-150"
                  onClick={() => setActiveVideo(activeVideo === sub._id ? null : sub._id)}
                >
                  {/* ✅ Play icon pulses when active */}
                  <span
                    className={`text-yellow-50 transition-all duration-200 ${
                      activeVideo === sub._id ? "scale-125 text-yellow-100" : "scale-100"
                    }`}
                  >
                    ▶
                  </span>
                  <div>
                    <p className="font-medium">{sub?.title}</p>
                    <p className="text-richblack-400 text-sm">{durations[sub._id] || sub?.timeDuration || "00:00"}</p>
                    {sub?.videoUrl && !durations[sub._id] && (
                      <video
                        src={sub.videoUrl}
                        preload="metadata"
                        className="hidden"
                        onLoadedMetadata={(e) => handleLoadedMetadata(e, sub._id)}
                      />
                    )}
                  </div>
                </div>

                {/* ✅ Video panel slides open/closed with max-h transition */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeVideo === sub._id
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 bg-richblack-900">
                    {sub?.videoUrl ? (
                      <video
                        src={sub.videoUrl}
                        controls
                        className="w-full rounded-md shadow-lg max-h-[500px]"
                        controlsList="nodownload"
                        onLoadedMetadata={(e) => handleLoadedMetadata(e, sub._id)}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 bg-richblack-800 rounded-md border border-richblack-700">
                        <p className="text-richblack-300 text-lg">⚠️ No video file was uploaded for this lecture.</p>
                      </div>
                    )}
                    {sub?.description && (
                      <p className="text-richblack-200 mt-4 text-sm bg-richblack-800 p-3 rounded">{sub.description}</p>
                    )}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <p className="text-richblack-400 p-4">No lectures yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

const ReviewForm = ({ courseId, token, existingReview }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState(existingReview?.review || "")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating)
      setReview(existingReview.review)
    }
  }, [existingReview])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error("Please select a star rating")
      return
    }
    if (!review.trim()) {
      toast.error("Please write a review")
      return
    }
    setSubmitting(true)
    try {
      const endpoint = existingReview
        ? process.env.REACT_APP_BASE_URL + "/course/editRating"
        : process.env.REACT_APP_BASE_URL + "/course/createRating"

      const res = await apiConnector(
        "POST",
        endpoint,
        { courseId, rating, review: review.trim() },
        { Authorization: `Bearer ${token}` }
      )
      if (res?.data?.success) {
        toast.success(existingReview ? "Review updated successfully!" : "Review submitted successfully!")
        setSubmitted(true)
      } else {
        toast.error(res?.data?.message || "Failed to submit review")
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to submit review"
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-richblack-800 p-6 rounded-lg border border-richblack-700 text-center">
        <p className="text-caribbeangreen-100 text-lg font-semibold">✓ Thank you for your review!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmitReview} className="bg-richblack-800 p-6 rounded-lg border border-richblack-700 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-richblack-5">Rate this course</h3>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-3xl transition-all duration-150 hover:scale-125 active:scale-90"
          >
            <span className={`${(hoverRating || rating) >= star ? 'text-yellow-100' : 'text-richblack-600'}`}>
              ★
            </span>
          </button>
        ))}
        <span className="text-richblack-300 text-sm ml-2">
          {rating > 0 ? `${rating}/5` : "Select rating"}
        </span>
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience with this course..."
        rows="4"
        className="w-full bg-richblack-700 rounded-md p-3 text-richblack-5 outline-none border border-richblack-600 focus:border-yellow-50 resize-none"
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-yellow-50 text-richblack-900 font-bold py-3 rounded-md hover:bg-yellow-100 transition-all duration-200 hover:scale-[0.98] active:scale-95 disabled:opacity-50 w-fit px-8"
      >
        {submitting ? (existingReview ? "Updating..." : "Submitting...") : (existingReview ? "Update Review" : "Submit Review")}
      </button>
    </form>
  )
}

export default CourseDetails