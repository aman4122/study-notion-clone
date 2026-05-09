import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowAltCircleRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-10 sm:mt-16'>

        {/* Stack on mobile, side-by-side on lg+ */}
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 items-center'>

            {/* Image — full width on mobile, natural on desktop */}
            <img
                src={Instructor}
                alt="instructordadi"
                className='shadow-white w-full max-w-[400px] lg:max-w-none lg:w-auto'
            />

            {/* Text block */}
            <div className='w-full lg:w-[50%] flex flex-col gap-6 lg:gap-10'>

                {/* Heading — full width on mobile, 50% only on lg */}
                <div className='text-white w-full lg:w-[50%] text-3xl sm:text-4xl font-semibold'>
                    Become an <HighlightText text={"Instructor [padhaane wala]"} />
                </div>

                <p className='font-medium text-sm sm:text-base w-full sm:w-[90%] text-richblack-300'>
                    Instructors from around the galaxy come here to teach you the{' '}
                    <HighlightText text={"things that entire world is already learning"} />
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-1 items-center flex-row'>
                            Start Learning Today
                            <FaArrowAltCircleRight />
                        </div>
                    </CTAButton>
                </div>

            </div>

        </div>
    </div>
  )
}

export default InstructorSection