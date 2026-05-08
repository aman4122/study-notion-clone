import React from 'react'
import HighlightText from "./HighlightText"
import CTAButton from "../HomePage/CTAButton"

import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"



const LearningLanguageSection = () => {
  return (
    <div className='mb-[32px]'>
      <div className='flex flex-col items-center'>

        <div className='text-4xl font-semibold text-center'>
          Your Brahmastra for 
          <HighlightText text={" earning a crust!!"}/>
        </div>
        <div>
          Your spin my head right round right round when you go down when you go down down!!!  
        </div>


        <div className='flex flex-row items-center justify-center'> 
          <img src={Know_your_progress} className='object-contain'/>
          <img src={Compare_with_others} className='object-contain'/>
          <img src={Plan_your_lessons} className='object-contain'/>

        </div>

        <div>
          <CTAButton active={true} linkto={"signup"}>
            <div>
              Learn More
            </div>
          </CTAButton>
        </div>

        



      </div>
      
    </div>
  )
}

export default LearningLanguageSection
