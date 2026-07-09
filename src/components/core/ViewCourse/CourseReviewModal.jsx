import React, { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import { apiConnector } from "../../../services/apiconnector"
import { toast } from "react-hot-toast"
import { FaStar } from "react-icons/fa"

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [submitting, setSubmitting] = useState(false)

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
    const toastId = toast.loading("Loading...")
    try {
      const res = await apiConnector(
        "POST",
        process.env.REACT_APP_BASE_URL + "/course/createRating",
        { courseId: courseEntireData._id, rating, review: review.trim() },
        { Authorization: `Bearer ${token}` }
      )
      if (res?.data?.success) {
        toast.success("Review submitted successfully!")
        setReviewModal(false)
      } else {
        toast.error(res?.data?.message || "Failed to submit review")
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to submit review"
      toast.error(msg)
    } finally {
      setSubmitting(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-500">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmitReview}
            className="mt-6 flex flex-col items-center"
          >
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="bg-transparent border-none outline-none"
                >
                  <FaStar
                    size={28}
                    className={`transition-colors duration-200 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-50"
                        : "text-richblack-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
