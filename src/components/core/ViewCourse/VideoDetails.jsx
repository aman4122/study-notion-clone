import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { 
  MdPlayArrow, 
  MdPause, 
  MdSkipNext, 
  MdSkipPrevious, 
  MdVolumeUp, 
  MdVolumeOff, 
  MdFullscreen
} from "react-icons/md"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )

  const [videoData, setVideoData] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [countdown, setCountdown] = useState(7)
  const timerRef = useRef(null)

  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const handleMouseLeave = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    setShowControls(false)
  }

  useEffect(() => {
    const container = playerContainerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
      // trigger initially
      handleMouseMove()
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [videoData])

  const [showVolumeToast, setShowVolumeToast] = useState(false)
  const volumeToastTimer = useRef(null)

  const triggerVolumeToast = () => {
    setShowVolumeToast(true)
    if (volumeToastTimer.current) clearTimeout(volumeToastTimer.current)
    volumeToastTimer.current = setTimeout(() => {
      setShowVolumeToast(false)
    }, 1500)
  }

  // Custom player states
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        setVideoData(filteredVideoData?.[0])
        setVideoEnded(false)
        setCountdown(7)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    if (!courseSectionData?.length) return true;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx === -1) return true;
    
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  const isLastVideo = () => {
    if (!courseSectionData?.length) return true;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx === -1) return true;

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  const goToNextVideo = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  // user requested to auto mark as complete
  const handleOnEnded = () => {
    setVideoEnded(true)
    if (!completedLectures.includes(subSectionId)) {
      handleLectureCompletion()
    }
  }

  // Handle Autoplay timer
  useEffect(() => {
    if (videoEnded && !isLastVideo()) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            goToNextVideo()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [videoEnded])

  // Smooth seeker update
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.currentTime);
        }
      }, 50); // Updates very smoothly at 20fps
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle Keyboard Shortcuts F, Space and Arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName.toLowerCase() === 'input' && e.target.type !== 'range') return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        if (playerRef.current) {
          const newVol = Math.min(1, playerRef.current.volume + 0.05);
          playerRef.current.volume = newVol;
          setVolume(newVol);
          setIsMuted(newVol === 0);
          triggerVolumeToast();
        }
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        if (playerRef.current) {
          const newVol = Math.max(0, playerRef.current.volume - 0.05);
          playerRef.current.volume = newVol;
          setVolume(newVol);
          setIsMuted(newVol === 0);
          triggerVolumeToast();
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (playerRef.current) {
          playerRef.current.currentTime = Math.max(0, playerRef.current.currentTime - 5);
          setCurrentTime(playerRef.current.currentTime);
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (playerRef.current) {
          playerRef.current.currentTime = Math.min(playerRef.current.duration || 100, playerRef.current.currentTime + 5);
          setCurrentTime(playerRef.current.currentTime);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Custom Player Handlers
  const togglePlay = () => {
    if (playerRef.current) {
      if (!playerRef.current.paused) {
        playerRef.current.pause()
      } else {
        if (videoEnded) {
            setVideoEnded(false)
            playerRef.current.currentTime = 0
        }
        playerRef.current.play().catch(e => console.log("Play error", e))
      }
    }
  }

  const clickTimeout = useRef(null);
  
  const handleVideoClick = () => {
    if (clickTimeout.current) {
      // Double click!
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      toggleFullscreen();
    } else {
      // Single click (delayed)
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250); // Adjusted to 250ms for realistic human double clicks
    }
  };

  const handleLoadedMetadata = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    if (playerRef.current) {
      playerRef.current.currentTime = parseFloat(e.target.value)
      setCurrentTime(parseFloat(e.target.value))
    }
  }

  const handleVolumeChange = (e) => {
    if (playerRef.current) {
      const newVolume = parseFloat(e.target.value)
      playerRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
      triggerVolumeToast()
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch(err => {
        console.log("Error attempting to enable full-screen mode:", err.message)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00"
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="flex flex-col gap-5 text-white pb-10 max-w-[854px] mx-auto w-full">
      {!videoData ? (
        <img
          src={courseEntireData.thumbnail}
          alt="Preview"
          className="w-full aspect-video rounded-md object-cover"
        />
      ) : (
        <div 
          ref={playerContainerRef}
          className={`relative group w-full aspect-video max-h-[480px] mt-4 bg-black rounded-md overflow-hidden shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3)] flex justify-center items-center ${showControls ? '' : 'cursor-none'}`}
        >
          <video
            ref={playerRef}
            src={videoData?.videoUrl}
            autoPlay
            onEnded={handleOnEnded}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={handleVideoClick}
            className={`w-full h-full object-contain ${showControls ? 'cursor-pointer' : 'cursor-none'}`}
          />

          {/* Large Central Play Button when Paused */}
          {!isPlaying && !videoEnded && (
            <div className={`absolute inset-0 grid place-content-center pointer-events-none transition-opacity duration-1000 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <button className="bg-richblack-800 border-[1px] border-yellow-50 text-yellow-50 rounded-full p-4 hover:scale-110 transition-transform pointer-events-auto shadow-xl" onClick={togglePlay}>
                <MdPlayArrow size={60} />
              </button>
            </div>
          )}

          {/* Volume Toast */}
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-richblack-800 border-[1px] border-yellow-50 text-yellow-50 px-4 py-2 rounded-md font-semibold text-lg transition-opacity duration-300 z-50 pointer-events-none shadow-lg ${showVolumeToast ? 'opacity-100' : 'opacity-0'}`}>
            Volume: {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
          </div>

          {/* Custom Controls Bar */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-3 px-4 transition-opacity duration-1000 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Progress Bar */}
            <div className="flex items-center gap-3 mb-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.01"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-richblack-600 rounded-lg appearance-none cursor-pointer accent-yellow-50"
                style={{
                  backgroundSize: `${(currentTime / (duration || 1)) * 100}% 100%`,
                  backgroundImage: 'linear-gradient(to right, #FFD60A, #FFD60A)',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>

            {/* Bottom Tools */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="hover:text-yellow-50 transition">
                  {isPlaying ? <MdPause size={28} /> : <MdPlayArrow size={28} />}
                </button>

                {/* Prev / Next */}
                <div className="flex items-center gap-2 text-richblack-100">
                  <button onClick={goToPrevVideo} disabled={isFirstVideo()} className={`hover:text-yellow-50 transition ${isFirstVideo() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <MdSkipPrevious size={24} />
                  </button>
                  <button onClick={goToNextVideo} disabled={isLastVideo()} className={`hover:text-yellow-50 transition ${isLastVideo() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <MdSkipNext size={24} />
                  </button>
                </div>

                {/* Volume & Time Group */}
                <div className="flex items-center group/volume relative">
                  <button onClick={toggleMute} className="hover:text-yellow-50 transition z-10">
                    {isMuted || volume === 0 ? <MdVolumeOff size={24} /> : <MdVolumeUp size={24} />}
                  </button>
                  <div className="flex items-center overflow-hidden w-0 group-hover/volume:w-20 transition-all duration-300 ease-in-out">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-richblack-600 rounded-lg appearance-none cursor-pointer accent-yellow-50 min-w-[5rem] ml-2"
                      style={{
                        backgroundSize: `${(isMuted ? 0 : volume) * 100}% 100%`,
                        backgroundImage: 'linear-gradient(to right, #FFD60A, #FFD60A)',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                  {/* Time */}
                  <div className="text-sm font-medium ml-4">
                    {formatTime(currentTime)} <span className="text-richblack-300">/ {formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={toggleFullscreen} className="hover:text-yellow-50 transition">
                  <MdFullscreen size={28} />
                </button>
              </div>
            </div>
          </div>

          {/* Video Completed Overlay */}
          {videoEnded && (
            <div className="absolute inset-0 z-[100] grid place-content-center bg-black/80 backdrop-blur-sm transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl font-semibold text-richblack-5">Video Completed</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setVideoEnded(false);
                        setCountdown(7);
                        setTimeout(() => {
                          if (playerRef.current) {
                              playerRef.current.currentTime = 0;
                              playerRef.current.play().catch(e => console.log("Play failed", e));
                          }
                        }, 50);
                    }}
                    className="flex items-center gap-2 rounded-md bg-richblack-800 px-6 py-3 hover:bg-richblack-700 transition font-semibold shadow-lg"
                  >
                    Replay
                  </button>
                  {!isLastVideo() && (
                    <button
                      onClick={goToNextVideo}
                      className="flex items-center gap-2 rounded-md bg-yellow-50 px-6 py-3 font-bold text-richblack-900 hover:bg-yellow-100 transition shadow-lg"
                    >
                      Next Video ({countdown}s)
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <h1 className="mt-8 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6 text-richblack-200">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
