import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart } from "../../slices/cartSlice"
import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, totalItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalPrice = cart.reduce((acc, course) => acc + course.price, 0)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[380px] bg-richblack-800 
                       shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
                       ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-richblack-700">
          <h2 className="text-white text-xl font-bold">
            Your Cart ({totalItems})
          </h2>
          <button onClick={onClose} className="text-richblack-300 hover:text-white">
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 px-6 py-4 overflow-y-auto max-h-[60vh]">
          {cart.length === 0 ? (
            <p className="text-richblack-400 text-center py-12">Your cart is empty!</p>
          ) : (
            cart.map((course) => (
              <div key={course._id}
                className="flex items-center gap-4 bg-richblack-700 p-3 rounded-lg">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-16 h-12 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {course.courseName}
                  </p>
                  <p className="text-yellow-50 font-bold text-sm">
                    Rs. {course.price}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  className="text-richblack-400 hover:text-pink-200 transition-all"
                >
                  <RxCross2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer — Total + Checkout */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-6 
                          border-t border-richblack-700 bg-richblack-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-richblack-300 text-lg">Total:</span>
              <span className="text-yellow-50 text-2xl font-bold">
                Rs. {totalPrice}
              </span>
            </div>
            <button
              onClick={() => { onClose(); navigate("/dashboard/cart") }}
              className="w-full bg-yellow-50 text-richblack-900 font-bold 
                         py-3 rounded-lg hover:bg-yellow-100 transition-all"
            >
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer