import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart } from "../../../slices/cartSlice"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../services/operations/studentFeaturesAPI"
import { RxCross2 } from "react-icons/rx"

const Cart = () => {
  const { cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalPrice = cart.reduce((acc, course) => acc + course.price, 0)
  const courseIds = cart.map((c) => c._id)

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-richblack-5 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-richblack-400">Your cart is empty.</p>
      ) : (
        <div className="flex gap-8">
          {/* Left — Course List */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((course) => (
              <div key={course._id}
                className="flex items-center gap-4 bg-richblack-800 p-4 rounded-lg border border-richblack-700">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-24 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-richblack-5">{course.courseName}</p>
                  <p className="text-richblack-300 text-sm">{course.courseDescription?.slice(0, 60)}...</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-yellow-50 font-bold">Rs. {course.price}</span>
                  <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className="text-pink-200 text-sm hover:text-pink-100 flex items-center gap-1"
                  >
                    <RxCross2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Order Summary */}
          <div className="w-[280px] flex-shrink-0">
            <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6 flex flex-col gap-4 sticky top-6">
              <h2 className="text-richblack-400 text-sm font-medium uppercase">Order Summary</h2>
              <p className="text-richblack-400 text-sm">{cart.length} Course(s)</p>
              <div className="flex justify-between items-center border-t border-richblack-600 pt-4">
                <span className="text-richblack-300">Total:</span>
                <span className="text-yellow-50 text-2xl font-bold">Rs. {totalPrice}</span>
              </div>
              <button
                onClick={() => buyCourse(token, courseIds, user, navigate, dispatch)}
                className="w-full bg-yellow-50 text-richblack-900 font-bold py-3 rounded-lg hover:bg-yellow-100 transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart