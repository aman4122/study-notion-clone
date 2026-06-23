// import React from 'react'
// import logo from "../../../src/assets/Logo/Logo-Full-Light.png"
// import { Link, matchPath } from 'react-router-dom'
// import NavbarLinks from "../../data/navbar-links"
// import { useLocation } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import { apiConnector } from '../../services/apiconnector'
// import { useState, useEffect } from 'react'
// import { categories } from "../../services/apis"
// import { FaAngleDown } from "react-icons/fa";
// import { logout } from '../../services/operations/authAPI'
// import { useNavigate } from 'react-router-dom'
// import { RxDashboard } from "react-icons/rx"
// import { toggleSidebar } from '../../slices/profileSlice'
// import CartDrawer from "./CartDrawer"
// import { useState } from 'react'











// const Navbar = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [cartOpen, setCartOpen] = useState(false)

//   const handleDashboardClick = (e) => {
//     if (location.pathname.startsWith("/dashboard")) {
//       e.preventDefault()
//       dispatch(toggleSidebar())
//     }
//   }

//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);

//   const [subLinks, setSubLinks] = useState([]);

//   const fetchSubLinks = async () => {
//     try {
//       const result = await apiConnector("GET", categories.CATEGORIES_API)
//       console.log("Printing Sublinks:", result);
//       setSubLinks(result.data.data)
//     }
//     catch (err) {
//       console.log("Could not fetch category list");
//     }
//   }

//   useEffect(() => {
//     fetchSubLinks();
//   }, [])



//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   }

//   return (
//     <div className='flex items-center justify-center border-b-[1px] border-b-richblack-800 h-14'>
//       <div className='w-11/12 flex justify-between items-center'>

//         <div className='flex items-center gap-x-4'>
//           {/* Dashboard Icon when logged in */}
//           {token !== null && (
//             <Link
//               to="/dashboard/my-profile"
//               onClick={handleDashboardClick}
//               className="text-white hover:text-yellow-50 text-2xl flex items-center justify-center transition-all duration-200"
//             >
//               <RxDashboard />
//             </Link>
//           )}

//           {/* Logo */}
//           <Link to="/">
//             <img src={logo} alt="StudyNotion" width={162} height={32} loading='lazy' />
//           </Link>
//         </div>

//         {/* NavLinks */}
//         <nav>
//           <ul className='flex gap-x-6 text-richblack-5'>
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (

//                   <div className='relative flex items-center gap-1 group cursor-pointer'>
//                     <p>{link.title}</p>
//                     <FaAngleDown />

//                     {/* Invisible hover bridge — gap cover karta hai */}
//                     <div className='absolute top-full left-0 w-full h-3' />

//                     {/* Dropdown */}
//                     <div className='pointer-events-none opacity-0 absolute translate-x-[-50%] 
//                                     left-[50%] top-[calc(100%+0.75rem)] flex flex-col rounded-md 
//                                     bg-richblack-5 p-4 text-richblack-900 transition-all duration-300 
//                                     group-hover:opacity-100 group-hover:pointer-events-auto 
//                                     lg:w-[300px] z-[1000]'>

//                       {/* Arrow */}
//                       <div className='absolute top-0 left-[50%] translate-x-[-50%] 
//                                       translate-y-[-50%] h-6 w-6 rounded-sm rotate-45 
//                                       bg-richblack-5 z-[-1]' />

//                       {subLinks.length > 0 ? (
//                         subLinks.map((subLink, i) => (
//                           <Link to={`/catalog/${subLink.name}`} key={i}>
//                             <p className='py-2 px-3 rounded-md hover:bg-richblack-50'>
//                               {subLink.name}
//                             </p>
//                           </Link>
//                         ))
//                       ) : (
//                         <p className='text-center'>No Categories Found</p>
//                       )}
//                     </div>
//                   </div>

//                 ) : (
//                   <Link to={link?.path}>
//                     <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Login/Signup/Dashboard */}
//         <div className='flex gap-x-4 items-center'>
         
//           {user && user?.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative text-white text-2xl">
//               <AiOutlineShoppingCart />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-50 text-richblack-900 
//                        text-xs font-bold rounded-full w-4 h-4 flex items-center 
//                        justify-center">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login" className='border border-richblack-700 rounded bg-richblack-900 px-[12px] py-[8px] text-richblack-100'>
//               Log In
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup" className='border border-richblack-700 rounded bg-richblack-900 px-[12px] py-[8px] text-richblack-100'>
//               Sign Up
//             </Link>
//           )}
//           {token !== null && <ProfileDropDown />}
//           {token !== null && (
//             <button
//               onClick={() => dispatch(logout(navigate))}
//               className='border border-richblack-700 rounded bg-richblack-900 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-800 transition-all'
//             >
//               Log Out
//             </button>
//           )}
//         </div>

//       </div>
//       <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

//     </div>
//   )
// }

// export default Navbar

















import React, { useState, useEffect } from 'react'
import logo from "../../../src/assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import NavbarLinks from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from "../../services/apis"
import { FaAngleDown } from "react-icons/fa";
import { logout } from '../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx"
import { toggleSidebar } from '../../slices/profileSlice'
import CartDrawer from "./CartDrawer"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)

  const handleDashboardClick = (e) => {
    if (location.pathname.startsWith("/dashboard")) {
      e.preventDefault()
      dispatch(toggleSidebar())
    }
  }

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      console.log("Printing Sublinks:", result);
      setSubLinks(result.data.data)
    }
    catch (err) {
      console.log("Could not fetch category list");
    }
  }

  useEffect(() => {
    fetchSubLinks();
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className='flex items-center justify-center border-b-[1px] border-b-richblack-800 h-14'>
      <div className='w-11/12 flex justify-between items-center'>

        <div className='flex items-center gap-x-4'>
          {token !== null && (
            <Link
              to="/dashboard/my-profile"
              onClick={handleDashboardClick}
              className="text-white hover:text-yellow-50 text-2xl flex items-center justify-center transition-all duration-200"
            >
              <RxDashboard />
            </Link>
          )}
          <Link to="/">
            <img src={logo} alt="StudyNotion" width={162} height={32} loading='lazy' />
          </Link>
        </div>

        <nav>
          <ul className='flex gap-x-6 text-richblack-5'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className='relative flex items-center gap-1 group cursor-pointer'>
                    <p>{link.title}</p>
                    <FaAngleDown />
                    <div className='absolute top-full left-0 w-full h-3' />
                    <div className='pointer-events-none opacity-0 absolute translate-x-[-50%] 
                                    left-[50%] top-[calc(100%+0.75rem)] flex flex-col rounded-md 
                                    bg-richblack-5 p-4 text-richblack-900 transition-all duration-300 
                                    group-hover:opacity-100 group-hover:pointer-events-auto 
                                    lg:w-[300px] z-[1000]'>
                      <div className='absolute top-0 left-[50%] translate-x-[-50%] 
                                      translate-y-[-50%] h-6 w-6 rounded-sm rotate-45 
                                      bg-richblack-5 z-[-1]' />
                      {subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link to={`/catalog/${subLink.name.toLowerCase().replace(/\s+/g, "-")}`} key={i}>

                            <p className='py-2 px-3 rounded-md hover:bg-richblack-50'>
                              {subLink.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p className='text-center'>No Categories Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex gap-x-4 items-center'>
          {user && user?.accountType !== "Instructor" && (
            <button                                        
              onClick={() => setCartOpen(true)}            
              className="relative text-white text-2xl"
            >
              <AiOutlineShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-50 text-richblack-900 
                       text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          )}
          {token === null && (
            <Link to="/login" className='border border-richblack-700 rounded bg-richblack-900 px-[12px] py-[8px] text-richblack-100'>
              Log In
            </Link>
          )}
          {token === null && (
            <Link to="/signup" className='border border-richblack-700 rounded bg-richblack-900 px-[12px] py-[8px] text-richblack-100'>
              Sign Up
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
          {token !== null && (
            <button
              onClick={() => dispatch(logout(navigate))}
              className='border border-richblack-700 rounded bg-richblack-900 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-800 transition-all'
            >
              Log Out
            </button>
          )}
        </div>

      </div>

      {/* CartDrawer — outside inner div but inside outer div */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

    </div>
  )
}

export default Navbar