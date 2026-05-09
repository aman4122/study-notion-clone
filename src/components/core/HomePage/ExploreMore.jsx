// import React, { useState } from 'react'
// import { HomePageExplore } from "../../../data/homepage-explore"
// import HighlightText from './HighlightText';

// const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"]

// const ExploreMore = () => {

//     const [currentTab, setCurrentTab] = useState(tabsName[0]);
//     const [courses, setCourses] = useState(HomePageExplore[0].courses)
//     const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
//     const [currentCardDescription, setCurrentCardDescription] = useState(HomePageExplore[0].courses[0].description)

//     const setMyCards = (value) => {
//         setCurrentTab(value);
//         const result = HomePageExplore.filter((course) => course.tag === value);
//         setCourses(result[0].courses);
//         setCurrentCard(result[0].courses[0].heading)
//         setCurrentCardDescription(result[0].courses[0].description)
//     }

//     return (
//         <div className='flex flex-col items-center w-full gap-10 py-12'>

//             <div className='text-4xl font-semibold text-center max-w-md'>
//                 <HighlightText text={"Push your machine to its limits"} />
//             </div>

//             <p className='text-center text-richblack-300 text-base max-w-sm'>
//                 Learn to build something you can't even imagine in your dreams
//             </p>

//             <div className='flex flex-row bg-richblack-800 rounded-full border border-richblack-700 p-1 gap-1'>
//                 {
//                     tabsName.map((element, index) => (
//                         <div
//                             key={index}
//                             onClick={() => setMyCards(element)}
//                             className={`flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
//                             ${currentTab === element
//                                     ? "bg-richblack-900 text-richblack-50 shadow-md"
//                                     : "text-richblack-200 hover:bg-richblack-700 hover:text-richblack-50"
//                                 }`}
//                         >
//                             {element}
//                         </div>
//                     ))
//                 }
//             </div>

//             <div className='flex flex-row gap-10 w-full justify-center mt-6 mb-20'>
//                 {
//                     courses.map((course, index) => (
//                         <div
//                             key={index}
//                             onClick={() => {
//                                 setCurrentCard(course.heading);
//                                 setCurrentCardDescription(course.description);
//                             }}
//                             className={`flex flex-col justify-between gap-6 w-[25%] min-w-[220px] p-6 cursor-pointer transition-all duration-200
//                             ${currentCard === course.heading
//                                     ? "bg-white text-richblack-900 shadow-[16px_16px_0px_0px_#FFD60A] translate-y-[-10px]"
//                                     : "bg-richblack-800 text-richblack-100 hover:translate-y-[-4px]"
//                                 }`}
//                         >
//                             <div className='flex flex-col gap-3 flex-grow'>
//                                 <h3 className='text-lg font-semibold leading-snug'>
//                                     {course.heading}
//                                 </h3>
//                                 <p className={`text-sm leading-relaxed
//                                     ${currentCard === course.heading ? "text-richblack-500" : "text-richblack-400"}`}>
//                                     {currentCard === course.heading ? currentCardDescription : course.description}
//                                 </p>
//                             </div>

//                             <div className={`border-t ${currentCard === course.heading ? "border-richblack-200" : "border-richblack-600"}`} />

//                             <div className={`flex flex-row justify-between text-sm font-medium
//                                 ${currentCard === course.heading ? "text-blue-500" : "text-richblack-300"}`}>
//                                 <p>{course.level}</p>
//                                 <p>{course.lessionNumber} Lessons</p>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>

//         </div>
//     )
// }

// export default ExploreMore



import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from './HighlightText';

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
    const [currentCardDescription, setCurrentCardDescription] = useState(HomePageExplore[0].courses[0].description)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
        setCurrentCardDescription(result[0].courses[0].description)
    }

    return (
        <div className='flex flex-col items-center w-full gap-6 sm:gap-10 py-8 sm:py-12'>

            {/* Heading */}
            <div className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-center max-w-xs sm:max-w-md'>
                <HighlightText text={"Push your machine to its limits"} />
            </div>

            <p className='text-center text-richblack-300 text-sm sm:text-base max-w-xs sm:max-w-sm'>
                Learn to build something you can't even imagine in your dreams
            </p>

            {/* Tabs — scroll horizontally on mobile instead of wrapping ugly */}
            <div className='flex flex-row bg-richblack-800 rounded-full border border-richblack-700 p-1 gap-1
                            overflow-x-auto max-w-full scrollbar-hide'>
                {
                    tabsName.map((element, index) => (
                        <div
                            key={index}
                            onClick={() => setMyCards(element)}
                            className={`flex items-center justify-center whitespace-nowrap
                                        px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium
                                        transition-all duration-200 cursor-pointer flex-shrink-0
                                        ${currentTab === element
                                    ? "bg-richblack-900 text-richblack-50 shadow-md"
                                    : "text-richblack-200 hover:bg-richblack-700 hover:text-richblack-50"
                                }`}
                        >
                            {element}
                        </div>
                    ))
                }
            </div>

            {/* Cards — 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center mt-4 mb-12 sm:mb-20'>
                {
                    courses.map((course, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setCurrentCard(course.heading);
                                setCurrentCardDescription(course.description);
                            }}
                            className={`flex flex-col justify-between gap-6 w-full max-w-[320px] p-6
                                        cursor-pointer transition-all duration-200
                                        ${currentCard === course.heading
                                    ? "bg-white text-richblack-900 shadow-[12px_12px_0px_0px_#FFD60A] sm:shadow-[16px_16px_0px_0px_#FFD60A] translate-y-[-6px] sm:translate-y-[-10px]"
                                    : "bg-richblack-800 text-richblack-100 hover:translate-y-[-4px]"
                                }`}
                        >
                            <div className='flex flex-col gap-3 flex-grow'>
                                <h3 className='text-base sm:text-lg font-semibold leading-snug'>
                                    {course.heading}
                                </h3>
                                <p className={`text-sm leading-relaxed
                                    ${currentCard === course.heading ? "text-richblack-500" : "text-richblack-400"}`}>
                                    {currentCard === course.heading ? currentCardDescription : course.description}
                                </p>
                            </div>

                            <div className={`border-t ${currentCard === course.heading ? "border-richblack-200" : "border-richblack-600"}`} />

                            <div className={`flex flex-row justify-between text-xs sm:text-sm font-medium
                                ${currentCard === course.heading ? "text-blue-500" : "text-richblack-300"}`}>
                                <p>{course.level}</p>
                                <p>{course.lessionNumber} Lessons</p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ExploreMore