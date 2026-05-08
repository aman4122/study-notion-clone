import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowAltCircleRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            <img src={Instructor} alt="instructordadi" className='shadow-white' />

        <div className='w-[50%] flex flex-col gap-10'>
            <div className='text-white w-[50%] text-4xl font -semibold'>
                Become an <HighlightText text={"Instructor [padhaane wala]"}/> 
            </div>

            <p className='font-medium text-[16px] w-[90%] text-richblack-300'>
                Instructors from around the galaxy come here to teach you the <HighlightText text={"things that entire world is already learning"} />
            </p>

            <div className='w-fit'>

            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex gap-[4px] object-fit items-center flex-row'>
                    Start Learning Today
                    <FaArrowAltCircleRight/>
                </div> 
            </CTAButton>
            </div>
        </div>
      
        </div>
    </div>
  )
}

export default InstructorSection 
