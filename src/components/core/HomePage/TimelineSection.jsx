import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: logo1,
        heading: 'Leadership',
        Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
    },
    {
        Logo: logo2,
        heading: 'Leadership',
        Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
    },
    {
        Logo: logo3,
        heading: 'Leadership',
        Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
    },
    {
        Logo: logo4,
        heading: 'Leadership',
        Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
    }
]

const TimelineSection = () => {
    return (
        <div className='flex flex-col items-center'>

            {/* Main row — stack on mobile, side by side on lg+ */}
            <div className='flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16
                            w-11/12 max-w-maxContent mx-auto py-10 lg:py-16'>

                {/* Timeline list */}
                <div className='flex flex-col gap-8 lg:gap-10 w-full lg:w-[45%]'>
                    {
                        timeline.map((element, index) => (
                            <div className='flex flex-row gap-4 sm:gap-6 w-full' key={index}>
                                <div className='flex items-start mt-1 flex-shrink-0'>
                                    <img src={element.Logo} alt={element.heading} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-base sm:text-[18px] font-semibold'>{element.heading}</h2>
                                    <p className='text-sm text-pure-greys-500'>{element.Description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Image + stats badge */}
                <div className='relative w-full sm:w-[80%] lg:w-[45%] mb-16 lg:mb-10'>
                    <img
                        src={timelineImage}
                        className='shadow-white object-cover w-full h-fit'
                        alt='timelineImage'
                    />

                    {/* Stats badge — responsive padding and font */}
                    <div className='absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2
                                    w-[85%] sm:w-[75%] lg:w-[70%]
                                    bg-caribbeangreen-800 flex flex-row text-white uppercase py-3 sm:py-4'>

                        <div className='flex flex-row gap-2 sm:gap-3 items-center border-r border-caribbeangreen-300
                                        px-3 sm:px-6 w-1/2 justify-center'>
                            <h1 className='text-lg sm:text-2xl font-bold'>100</h1>
                            <p className='text-pure-greys-400 text-[9px] sm:text-[10px] tracking-wider'>
                                Years of Experience
                            </p>
                        </div>

                        <div className='flex flex-row gap-2 sm:gap-3 items-center px-3 sm:px-6 w-1/2 justify-center'>
                            <h1 className='text-lg sm:text-2xl font-bold'>200M+</h1>
                            <p className='text-pure-greys-400 text-[9px] sm:text-[10px] tracking-wider'>
                                Hours Of Course Videos
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <div className='w-full bg-caribbeangreen-800 py-3' />
        </div>
    )
}

export default TimelineSection