import React, { useState, useRef, useEffect } from 'react'
import { FiUploadCloud, FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../../../../services/apiconnector'
import { categories } from '../../../../services/apis'
import { addCourseDetails, createSection, createSubSection, publishCourseDetails } from '../../../../services/operations/courseDetailsAPI'

const AddCourse = () => {
  const [step, setStep] = useState(1)
  const [courseId, setCourseId] = useState(null)

  return (
    <div className="text-white w-full max-w-[1000px] mx-auto flex flex-col md:flex-row gap-6 items-start pb-20">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-y-6">
        <h1 className="text-3xl font-medium text-richblack-5 mb-4">Add Course</h1>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[
            { id: 1, title: "Course Information" },
            { id: 2, title: "Course Builder" },
            { id: 3, title: "Publish" },
          ].map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center gap-y-2">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold
                  ${step === item.id 
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                    : step > item.id 
                      ? "bg-yellow-50 border-yellow-50 text-richblack-900" 
                      : "bg-richblack-800 border-richblack-700 text-richblack-300"
                  }`}
                >
                  {step > item.id ? "✓" : item.id}
                </div>
                <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-300"}`}>
                  {item.title}
                </p>
              </div>
              {item.id !== 3 && (
                <div className={`h-[1px] w-full border-t border-dashed mx-4
                  ${step > item.id ? "border-yellow-50" : "border-richblack-600"}
                `}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Forms */}
        {step === 1 && <CourseInformationForm nextStep={() => setStep(2)} setCourseId={setCourseId} />}
        {step === 2 && <CourseBuilderForm prevStep={() => setStep(1)} nextStep={() => setStep(3)} courseId={courseId} />}
        {step === 3 && <PublishCourseForm prevStep={() => setStep(2)} courseId={courseId} />}
      </div>

      {/* Course Upload Tips */}
      <div className="w-full md:w-[350px] bg-richblack-800 border border-richblack-700 rounded-md p-6 mt-16 md:mt-[100px] sticky top-10">
        <p className="text-lg font-bold text-richblack-5 mb-4 flex items-center gap-x-2">
          ⚡ Course Upload Tips
        </p>
        <ul className="text-sm text-richblack-50 list-disc list-inside flex flex-col gap-y-2">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make Announcements to notify any important notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  )
}

// Reusable Upload Component
const UploadBox = ({ label, isVideo, preview, setPreview, setFile }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      if(setFile) setFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      if(setFile) setFile(file)
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-sm text-richblack-5">{label} <sup className="text-pink-200">*</sup></span>
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !preview && fileInputRef.current.click()}
        className={`bg-richblack-700 flex flex-col items-center justify-center rounded-md border-2 border-dotted 
          ${preview ? 'p-2 border-richblack-500' : 'p-10 border-richblack-500 cursor-pointer hover:border-richblack-400'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept={isVideo ? "video/*" : "image/*"} 
          onChange={handleFileChange} 
        />
        
        {preview ? (
          <div className="relative w-full">
            {isVideo ? (
              <video src={preview} controls className="w-full max-h-[300px] object-contain rounded-md" />
            ) : (
              <img src={preview} alt="Preview" className="w-full max-h-[300px] object-cover rounded-md" />
            )}
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); setPreview(null); if(setFile) setFile(null); }}
              className="absolute top-2 right-2 bg-richblack-900 bg-opacity-70 text-white rounded-full p-1 hover:text-pink-200"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-richblack-800 rounded-full flex items-center justify-center mb-4">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="text-richblack-200 text-sm mb-2 text-center">
              Drag and drop a {isVideo ? 'video' : 'image'}, or click to <span className="text-yellow-50 font-semibold">Browse</span> a file
            </p>
            <ul className="text-xs text-richblack-400 flex gap-x-6 list-disc">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

const CourseInformationForm = ({ nextStep, setCourseId }) => {
  const { token } = useSelector((state) => state.auth)
  const [courseCategories, setCourseCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseShortDesc: "",
    coursePrice: "",
    courseCategory: "",
    courseTags: "",
    courseBenefits: "",
  })
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  
  const [reqInput, setReqInput] = useState("")
  const [requirements, setRequirements] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        if(res?.data?.data) {
          setCourseCategories(res.data.data)
        }
      } catch (error) {
        console.log("Could not fetch categories", error)
      }
    }
    fetchCategories()
  }, [])

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const addRequirement = () => {
    if (reqInput.trim()) {
      setRequirements([...requirements, reqInput.trim()])
      setReqInput("")
    }
  }

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const onSubmit = async () => {
    if (!formData.courseTitle || !formData.courseShortDesc || !formData.coursePrice || !formData.courseCategory || !formData.courseTags || !thumbnailFile || !formData.courseBenefits) {
      toast.error("Please fill all required fields including Thumbnail")
      return
    }

    setLoading(true)
    const currentValues = new FormData()
    currentValues.append("courseName", formData.courseTitle)
    currentValues.append("courseDescription", formData.courseShortDesc)
    currentValues.append("price", formData.coursePrice)
    currentValues.append("tag", formData.courseTags)
    currentValues.append("whatYouWillLearn", formData.courseBenefits)
    currentValues.append("category", formData.courseCategory)
    currentValues.append("thumbnail", thumbnailFile)
    currentValues.append("instructions", JSON.stringify(requirements))

    const result = await addCourseDetails(currentValues, token)
    if (result) {
      setCourseId(result._id)
      nextStep()
    }
    setLoading(false)
  }

  return (
    <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 flex flex-col gap-y-6 w-full">
      <label className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Course Title <sup className="text-pink-200">*</sup></span>
        <input type="text" name="courseTitle" value={formData.courseTitle} onChange={handleOnChange} placeholder="Enter Course Title" className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50" />
      </label>
      
      <label className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Course Short Description <sup className="text-pink-200">*</sup></span>
        <textarea name="courseShortDesc" value={formData.courseShortDesc} onChange={handleOnChange} placeholder="Enter Description" rows="4" className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50" />
      </label>
      
      <label className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Course Price <sup className="text-pink-200">*</sup></span>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400">₹</span>
          <input type="number" name="coursePrice" value={formData.coursePrice} onChange={handleOnChange} placeholder="Enter Course Price" className="rounded-md bg-richblack-700 p-3 pl-8 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50" />
        </div>
      </label>

      <label className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Course Category <sup className="text-pink-200">*</sup></span>
        <select name="courseCategory" value={formData.courseCategory} onChange={handleOnChange} className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50">
          <option value="" disabled>Choose a Category</option>
          {courseCategories.map((category, index) => (
            <option key={index} value={category._id}>{category.name}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Tags <sup className="text-pink-200">*</sup></span>
        <input type="text" name="courseTags" value={formData.courseTags} onChange={handleOnChange} placeholder="Enter Tags and press Enter" className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50" />
      </label>

      <UploadBox label="Course Thumbnail" isVideo={false} preview={thumbnailPreview} setPreview={setThumbnailPreview} setFile={setThumbnailFile} />

      <label className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Benefits of the course <sup className="text-pink-200">*</sup></span>
        <textarea name="courseBenefits" value={formData.courseBenefits} onChange={handleOnChange} placeholder="Enter Benefits of the course" rows="4" className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50" />
      </label>

      <div className="flex flex-col gap-y-2">
        <span className="text-sm text-richblack-5">Requirements/Instructions <sup className="text-pink-200">*</sup></span>
        <input 
          type="text" 
          value={reqInput}
          onChange={(e) => setReqInput(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addRequirement(); } }}
          placeholder="Enter Requirements/Instructions"
          className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50"
        />
        <button type="button" onClick={addRequirement} className="text-yellow-50 font-semibold text-left mt-1 text-sm w-fit hover:text-yellow-100">Add</button>
        
        {requirements.length > 0 && (
          <ul className="mt-2 flex flex-col gap-y-1">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-center gap-x-2 text-richblack-5 text-sm">
                <span>{req}</span>
                <button type="button" onClick={() => removeRequirement(index)} className="text-richblack-300 hover:text-pink-200 text-xs px-1">Clear</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end gap-x-2 mt-4">
        <button onClick={nextStep} className="bg-richblack-700 px-6 py-2 rounded-md font-semibold text-richblack-5 hover:bg-richblack-600 transition-all">Continue Without Saving</button>
        <button onClick={onSubmit} disabled={loading} className="bg-yellow-50 px-6 py-2 rounded-md font-semibold text-richblack-900 hover:bg-yellow-100 transition-all disabled:opacity-50">
          {loading ? "Saving..." : "Next >"}
        </button>
      </div>
    </div>
  )
}

const CourseBuilderForm = ({ prevStep, nextStep, courseId }) => {
  const { token } = useSelector((state) => state.auth)
  const [sections, setSections] = useState([])
  const [sectionName, setSectionName] = useState("")
  const [activeSectionIndex, setActiveSectionIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Modal state
  const [showLectureModal, setShowLectureModal] = useState(false)
  const [lectureVideoPreview, setLectureVideoPreview] = useState(null)
  const [lectureVideoFile, setLectureVideoFile] = useState(null)
  const [lectureTitle, setLectureTitle] = useState("")
  const [lectureDesc, setLectureDesc] = useState("")

  const handleCreateSection = async () => {
    if (!sectionName.trim()) return
    if (!courseId) {
      toast.error("Course ID is missing. Please go back to Step 1.")
      return
    }

    setLoading(true)
    const result = await createSection({ sectionName: sectionName.trim(), courseId }, token)
    if (result) {
      // The backend creates section and updates course. It returns updatedCourse, but doesn't necessarily return the section ID directly.
      // Assuming result.courseContent has the IDs, we can't easily map it perfectly, so we use a dummy ID locally just to let the user add lectures.
      // Wait, in Section.js, createSection returns `updatedCourse`. The new section ID is `updatedCourse.courseContent[updatedCourse.courseContent.length - 1]`
      const newSectionId = result.courseContent ? result.courseContent[result.courseContent.length - 1] : Date.now()
      
      setSections([...sections, { _id: newSectionId, name: sectionName.trim(), lectures: [] }])
      setSectionName("")
    }
    setLoading(false)
  }

  const openLectureModal = (index) => {
    setActiveSectionIndex(index)
    setLectureVideoPreview(null)
    setLectureVideoFile(null)
    setLectureTitle("")
    setLectureDesc("")
    setShowLectureModal(true)
  }

  const handleSaveLecture = async () => {
    if (!lectureTitle.trim() || !lectureVideoFile || activeSectionIndex === null) {
      toast.error("Please provide title and video")
      return
    }

    setLoading(true)
    const currentSection = sections[activeSectionIndex]
    
    const formData = new FormData()
    formData.append("sectionId", currentSection._id)
    formData.append("title", lectureTitle.trim())
    formData.append("description", lectureDesc.trim())
    formData.append("timeDuration", "00:00") // Dummy
    formData.append("videoFile", lectureVideoFile)

    const result = await createSubSection(formData, token)
    if (result) {
      const newSections = [...sections]
      newSections[activeSectionIndex].lectures.push({ title: lectureTitle.trim(), video: lectureVideoPreview })
      setSections(newSections)
      setShowLectureModal(false)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 flex flex-col gap-y-6 w-full">
        <h2 className="text-2xl font-semibold text-richblack-5">Course Builder</h2>
        
        <label className="flex flex-col gap-y-2">
          <span className="text-sm text-richblack-5">Section Name <sup className="text-pink-200">*</sup></span>
          <input 
            type="text" 
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleCreateSection(); } }}
            placeholder="Add a section to build your course"
            className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50"
          />
        </label>
        
        <button onClick={handleCreateSection} disabled={loading} className="text-yellow-50 border border-yellow-50 rounded-md px-4 py-2 flex items-center gap-x-2 w-fit font-semibold hover:bg-yellow-50 hover:text-richblack-900 transition-all disabled:opacity-50">
          <span>⊕</span> Create Section
        </button>

        {/* Render Sections */}
        {sections.length > 0 && (
          <div className="flex flex-col gap-y-4 mt-4 bg-richblack-700 p-6 rounded-md border border-richblack-600">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col border-b border-richblack-600 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-richblack-5 font-semibold flex items-center gap-x-2">
                    <span className="text-richblack-300">≡</span> {section.name}
                  </p>
                  <div className="flex items-center gap-x-3">
                    <button className="text-richblack-300 hover:text-richblack-5 text-sm">✎</button>
                    <button className="text-richblack-300 hover:text-pink-200 text-sm">🗑</button>
                    <span className="text-richblack-300">|</span>
                    <button onClick={() => openLectureModal(index)} className="text-yellow-50 text-sm font-semibold hover:underline">+ Add Lecture</button>
                  </div>
                </div>
                {/* Render Lectures inside section */}
                {section.lectures.length > 0 && (
                  <div className="flex flex-col gap-y-2 mt-2 pl-6">
                    {section.lectures.map((lec, lIndex) => (
                      <div key={lIndex} className="flex justify-between items-center bg-richblack-800 py-2 px-3 rounded-md">
                        <p className="text-sm text-richblack-5 flex items-center gap-x-2">
                          <span className="text-richblack-300">≡</span> {lec.title} {lec.video ? '🎥' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-x-2 mt-4">
          <button onClick={prevStep} className="bg-richblack-700 px-6 py-2 rounded-md font-semibold text-richblack-5 hover:bg-richblack-600 transition-all duration-200 hover:scale-95 active:scale-90">Back</button>
          <button onClick={nextStep} className="bg-yellow-50 px-6 py-2 rounded-md font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200 hover:scale-95 active:scale-90">Next &gt;</button>
        </div>
      </div>

      {showLectureModal && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-70 backdrop-blur-sm">
          <div className="w-11/12 max-w-[600px] rounded-lg border border-richblack-600 bg-richblack-800 p-6 shadow-xl my-10">
            <div className="flex items-center justify-between border-b border-richblack-600 pb-4 mb-6">
              <h3 className="text-xl font-semibold text-richblack-5">Adding Lecture</h3>
              <button onClick={() => setShowLectureModal(false)} className="text-richblack-300 text-2xl hover:text-richblack-5">×</button>
            </div>
            
            <div className="flex flex-col gap-y-6">
              <UploadBox label="Lecture Video" isVideo={true} preview={lectureVideoPreview} setPreview={setLectureVideoPreview} setFile={setLectureVideoFile} />

              <label className="flex flex-col gap-y-2">
                <span className="text-sm text-richblack-5">Lecture Title <sup className="text-pink-200">*</sup></span>
                <input 
                  type="text" 
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  placeholder="Enter Lecture Title"
                  className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50"
                />
              </label>

              <label className="flex flex-col gap-y-2">
                <span className="text-sm text-richblack-5">Lecture Description <sup className="text-pink-200">*</sup></span>
                <textarea 
                  value={lectureDesc}
                  onChange={(e) => setLectureDesc(e.target.value)}
                  placeholder="Enter Lecture Description"
                  rows="4"
                  className="rounded-md bg-richblack-700 p-3 text-richblack-5 outline-none w-full border border-richblack-600 focus:border-yellow-50"
                />
              </label>

              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleSaveLecture}
                  disabled={loading}
                  className="bg-yellow-50 px-6 py-2 rounded-md font-semibold text-richblack-900 hover:bg-yellow-100 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const PublishCourseForm = ({ prevStep, courseId }) => {
  const { token } = useSelector((state) => state.auth)
  const [manualDuration, setManualDuration] = useState("")

  const handlePublish = async () => {
    if (!courseId) {
      toast.error("Course ID is missing")
      return
    }
    const res = await publishCourseDetails(courseId, manualDuration, token)
    if (res) {
      window.location.href = "/dashboard/my-courses"
    }
  }

  return (
    <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 flex flex-col gap-y-6 w-full">
      <h2 className="text-2xl font-semibold text-richblack-5">Publish Settings</h2>
      
      <div className="flex items-center gap-x-3 bg-richblack-700 p-4 rounded-md border border-richblack-600">
        <input 
          type="checkbox" 
          id="public"
          className="w-5 h-5 accent-yellow-50 rounded"
        />
        <label htmlFor="public" className="text-richblack-5 text-lg cursor-pointer">
          Make this course public
        </label>
      </div>

      <div className="flex flex-col gap-y-2">
        <label className="text-sm text-richblack-5">Total Course Duration (optional)</label>
        <input 
          type="text"
          placeholder="e.g. 2h 30m (Leave blank to auto-calculate)"
          value={manualDuration}
          onChange={(e) => setManualDuration(e.target.value)}
          className="w-full bg-richblack-700 text-richblack-5 rounded-md p-3 border border-richblack-600 outline-none focus:border-yellow-50"
        />
      </div>

      <div className="flex justify-end gap-x-2 mt-4">
        <button onClick={prevStep} className="bg-richblack-700 px-6 py-2 rounded-md font-semibold text-richblack-5 hover:bg-richblack-600 transition-all duration-200 hover:scale-95 active:scale-90">Back</button>
        <button onClick={handlePublish} className="bg-yellow-50 px-6 py-2 rounded-md font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200 hover:scale-95 active:scale-90">Save Changes</button>
      </div>
    </div>
  )
}

export default AddCourse
