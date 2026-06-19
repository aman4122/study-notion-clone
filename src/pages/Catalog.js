import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"

const Catalog = () => {
  const { catalogName } = useParams()
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const categoriesList = res.data.data
        const category = categoriesList.find(
          (ct) => ct.name.toLowerCase().replace(" ", "-") === catalogName.toLowerCase()
        ) || categoriesList[0]

        setActiveCategory(category)
        
        // Fetch courses for this category (mocked or from server categoryPageDetails)
        // For standard catalog listing, let's list some courses
        if (category) {
          setCatalogPageData({
            name: category.name,
            description: category.description,
            courses: category.courses || [],
          })
        }
      } catch (error) {
        console.log("Could not fetch category details", error)
      }
    }
    if (catalogName) {
      getCategoryDetails()
    }
  }, [catalogName])

  return (
    <div className="bg-richblack-900 text-white min-h-screen p-8">
      <div className="mx-auto max-w-maxContent w-11/12">
        <h1 className="text-3xl font-bold text-yellow-50 mb-2">
          {catalogPageData?.name || "Catalog"}
        </h1>
        <p className="text-richblack-200 mb-8">
          {catalogPageData?.description || "Explore our courses"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalogPageData?.courses && catalogPageData.courses.length > 0 ? (
            catalogPageData.courses.map((course) => (
              <Link to={`/catalog/${course._id}`} key={course._id}>
                <div className="bg-richblack-800 p-4 rounded-lg border border-richblack-700 hover:scale-105 transition-all">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold text-lg">{course.courseName}</h3>
                  <p className="text-richblack-300 text-sm mt-1">{course.instructor?.firstName}</p>
                  <p className="text-yellow-50 font-bold mt-2">Rs. {course.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-richblack-400">
              No Courses found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog
