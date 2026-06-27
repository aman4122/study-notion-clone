import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getFullDetailsOfCourse, createSection, deleteSection, instructorCreateSubSection, deleteSubSection, updateSectionOrder } from '../../../../services/operations/courseDetailsAPI'
import { MdDragIndicator } from 'react-icons/md'

const EditCourse = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  const [newSectionName, setNewSectionName] = useState("")
  
  // For adding a subsection (video)
  const [activeSectionId, setActiveSectionId] = useState(null)
  const [lectureTitle, setLectureTitle] = useState("")
  const [lectureDesc, setLectureDesc] = useState("")
  const [videoFile, setVideoFile] = useState(null)

  const dragItemIndex = React.useRef(null)
  const dragOverItemIndex = React.useRef(null)

  const handleDragStart = (e, index) => {
    dragItemIndex.current = index
    setTimeout(() => {
      e.target.classList.add('opacity-50')
    }, 0)
  }

  const handleDragEnter = (e, index) => {
    dragOverItemIndex.current = index
  }

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50')
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    if (dragItemIndex.current === null || dragOverItemIndex.current === null) return
    if (dragItemIndex.current === dragOverItemIndex.current) return

    let updatedSections = [...course.courseContent]
    const draggedItem = updatedSections[dragItemIndex.current]
    updatedSections.splice(dragItemIndex.current, 1)
    updatedSections.splice(dragOverItemIndex.current, 0, draggedItem)
    
    setCourse({ ...course, courseContent: updatedSections })

    const newSectionOrder = updatedSections.map(sec => sec._id)
    await updateSectionOrder({ courseId, sectionOrder: newSectionOrder }, token)
    
    dragItemIndex.current = null
    dragOverItemIndex.current = null
  }

  const fetchCourse = async () => {
    setLoading(true)
    const result = await getFullDetailsOfCourse(courseId, token)
    if (result) {
      setCourse(result)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCourse()
  }, [courseId, token])

  const handleAddSection = async () => {
    if (!newSectionName) return
    const result = await createSection({ sectionName: newSectionName, courseId }, token)
    if (result) {
      setNewSectionName("")
      fetchCourse()
    }
  }

  const handleDeleteSection = async (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section and all its lectures?")) {
      const result = await deleteSection({ sectionId, courseId }, token)
      if (result) fetchCourse()
    }
  }

  const handleAddLecture = async (e) => {
    e.preventDefault()
    if (!lectureTitle || !lectureDesc || !videoFile) return

    const formData = new FormData()
    formData.append("sectionId", activeSectionId)
    formData.append("title", lectureTitle)
    formData.append("description", lectureDesc)
    formData.append("timeDuration", "00:00")
    formData.append("videoFile", videoFile)

    const result = await instructorCreateSubSection(formData, token)
    if (result) {
      setActiveSectionId(null)
      setLectureTitle("")
      setLectureDesc("")
      setVideoFile(null)
      fetchCourse()
    }
  }

  const handleDeleteLecture = async (sectionId, subSectionId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      const result = await deleteSubSection({ sectionId, subSectionId }, token)
      if (result) fetchCourse()
    }
  }

  if (loading) return <div className="text-white p-10 flex justify-center text-xl">Loading Course...</div>
  if (!course) return <div className="text-white p-10 flex justify-center text-xl">Course not found.</div>

  return (
    <div className="text-white max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-richblack-5">Edit Course: {course.courseName}</h1>
        <button onClick={() => navigate("/dashboard/my-courses")} className="bg-richblack-700 px-6 py-2 rounded-md hover:bg-richblack-600 font-semibold transition-all">Back</button>
      </div>

      <div className="bg-richblack-800 p-8 rounded-md border border-richblack-700 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Course Content Builder</h2>

        <div className="flex gap-x-4 mb-8">
          <input 
            type="text" 
            placeholder="Add a new section (e.g. Introduction)" 
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            className="w-full bg-richblack-700 rounded-md p-3 outline-none border border-richblack-600 focus:border-yellow-50 text-richblack-5"
          />
          <button onClick={handleAddSection} className="bg-yellow-50 text-richblack-900 font-bold px-8 py-3 rounded-md hover:bg-yellow-100 whitespace-nowrap transition-all duration-200 hover:scale-95 active:scale-90 shadow-md">
            Add Section
          </button>
        </div>

        <div className="flex flex-col gap-y-6">
          {course.courseContent?.map((section, index) => (
            <div 
              key={section._id} 
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="bg-richblack-700 border border-richblack-600 rounded-lg p-5 shadow-sm transition-all"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-x-3">
                  <MdDragIndicator className="text-richblack-300 cursor-grab text-2xl hover:text-white" />
                  <h3 className="text-xl font-bold text-richblack-5">{section.sectionName}</h3>
                </div>
                <div className="flex gap-x-4">
                  <button onClick={() => setActiveSectionId(section._id)} className="text-caribbeangreen-200 text-sm font-semibold hover:underline bg-richblack-800 px-3 py-1 rounded border border-richblack-600 transition-all">+ Add Lecture</button>
                  <button onClick={() => handleDeleteSection(section._id)} className="text-pink-200 text-sm font-semibold hover:underline bg-richblack-800 px-3 py-1 rounded border border-richblack-600 transition-all">Delete Section</button>
                </div>
              </div>

              {activeSectionId === section._id && (
                <form onSubmit={handleAddLecture} className="bg-richblack-800 p-5 rounded-lg border border-richblack-600 mb-5 flex flex-col gap-y-4 shadow-inner">
                  <h4 className="font-semibold text-yellow-50 text-lg">Adding New Lecture to "{section.sectionName}"</h4>
                  <input required type="text" placeholder="Lecture Title" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} className="w-full bg-richblack-700 text-richblack-5 rounded p-3 border border-richblack-600 outline-none focus:border-yellow-50" />
                  <textarea required placeholder="Lecture Description" value={lectureDesc} onChange={e => setLectureDesc(e.target.value)} className="w-full bg-richblack-700 text-richblack-5 rounded p-3 border border-richblack-600 outline-none focus:border-yellow-50 h-24" />
                  <div>
                    <label className="text-sm text-richblack-200 mb-2 block font-medium">Video File Upload</label>
                    <input required type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} className="text-sm text-richblack-300 bg-richblack-700 p-2 border border-richblack-600 rounded w-full cursor-pointer" />
                  </div>
                  <div className="flex justify-end gap-x-3 mt-4">
                    <button type="button" onClick={() => setActiveSectionId(null)} className="bg-richblack-700 px-6 py-2 rounded font-semibold hover:bg-richblack-600 transition-all duration-200">Cancel</button>
                    <button type="submit" className="bg-yellow-50 text-richblack-900 font-bold px-6 py-2 rounded hover:bg-yellow-100 transition-all duration-200 hover:scale-95 active:scale-90">Upload Video</button>
                  </div>
                </form>
              )}

              <div className="flex flex-col gap-y-3 pl-5 border-l-2 border-richblack-600">
                {section.subSection?.map((sub) => (
                  <div key={sub._id} className="flex justify-between items-center bg-richblack-800 p-4 rounded-md border border-richblack-700 hover:bg-richblack-900 transition-all">
                    <div>
                      <p className="font-semibold text-richblack-5 text-md mb-1">{sub.title}</p>
                      <p className="text-sm text-richblack-300">{sub.description}</p>
                      {sub.videoUrl && <p className="text-xs text-caribbeangreen-100 mt-2 font-medium">Video Attached • {sub.timeDuration || "Duration TBD"}</p>}
                    </div>
                    <button onClick={() => handleDeleteLecture(section._id, sub._id)} className="text-pink-200 text-xs font-bold hover:text-pink-100 border border-pink-300 rounded px-3 py-1 transition-all">
                      Remove
                    </button>
                  </div>
                ))}
                {section.subSection?.length === 0 && <p className="text-sm text-richblack-400 py-2">No lectures in this section yet. Add one to get started!</p>}
              </div>
            </div>
          ))}
          
          {course.courseContent?.length === 0 && (
            <div className="text-center py-10 bg-richblack-700 border border-richblack-600 rounded-lg">
              <p className="text-richblack-300 text-lg">No sections available.</p>
              <p className="text-richblack-400 text-sm mt-1">Add a new section above to start building your course.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditCourse
