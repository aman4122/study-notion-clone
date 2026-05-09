import React from 'react'
import HighlightText from "./HighlightText"
import CTAButton from "../HomePage/CTAButton"

import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"

const LearningLanguageSection = () => {
  return (
    <div className='mb-6 sm:mb-8'>
      <div className='flex flex-col items-center gap-6 sm:gap-8'>

        {/* Heading */}
        <div className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-center px-4'>
          Your Brahmastra for
          <HighlightText text={" earning a crust!!"} />
        </div>

        {/* Subtext */}
        <div className='text-sm sm:text-base text-richblack-300 text-center px-4 max-w-xs sm:max-w-lg'>
          Your spin my head right round right round when you go down when you go down down!!!
        </div>

        {/* Images — stack on mobile, row on md+ */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full'>
          <img src={Know_your_progress}  alt="Know your progress"  className='object-contain w-[80%] sm:w-[60%] md:w-auto' />
          <img src={Compare_with_others} alt="Compare with others" className='object-contain w-[80%] sm:w-[60%] md:w-auto' />
          <img src={Plan_your_lessons}   alt="Plan your lessons"   className='object-contain w-[80%] sm:w-[60%] md:w-auto' />
        </div>

        {/* CTA */}
        <CTAButton active={true} linkto={"/signup"}>
          <div>Learn More</div>
        </CTAButton>

      </div>
    </div>
  )
}

export default LearningLanguageSection