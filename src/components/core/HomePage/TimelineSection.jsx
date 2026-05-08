// import React from 'react'
// import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
// import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
// import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
// import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
// import timelineImage from "../../../assets/Images/TimelineImage.png"
// const timeline = [
//     {
//         Logo: logo1,
//         heading: 'Leadership',
//         Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
//     },
//     {
//         Logo: logo2,
//         heading: 'Leadership',
//         Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
//     },
//     {
//         Logo: logo3,
//         heading: 'Leadership',
//         Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
//     },
//     {
//         Logo: logo4,
//         heading: 'Leadership',
//         Description: 'Abhi tak samajh nhi aa raha kya karna hai!!!!'
//     }
// ]
// const TimelineSection = () => {
//     return (
//         <div>
//             <div className='flex flex-row items-center'>


//                 <div className='flex flex-col gap-5'>
//                     {
//                         timeline.map((element, index) => {
//                             return (
//                                 <div className='flex flex-row w-11/12' key={index}>
//                                     <div className='flex items-center'> <img src={element.Logo} />
//                                     </div>

//                                     <div>
//                                         <h2 className='text-[18px]'>{element.heading}</h2>
//                                         <p className=''>{element.Description}</p>
//                                     </div>
//                                 </div>
//                             )
//                         }
//                         )
//                     }
//                 </div>

//                 <div className='relative'>
//                     <img src={timelineImage} className='shadow-white object-cover h-fit'alt='timelineImage'/>

//                 </div>
//                 <div className='absolute bg-caribbeangreen-800 flex flex-row text-white uppercase py-10'>
//                     <div className='flex flex-row gap-5 items-center border-r'>
//                         <h1>100</h1>
//                         <p>Years of Experience</p>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default TimelineSection








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
            <div className='flex flex-row items-center justify-center gap-16 w-11/12 max-w-maxContent mx-auto py-16'>

                <div className='flex flex-col gap-10 w-[45%]'>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-6 w-full' key={index}>
                                    <div className='flex items-start mt-1'>
                                        <img src={element.Logo} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-[18px] font-semibold'>{element.heading}</h2>
                                        <p className='text-sm text-pure-greys-500'>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='relative w-[45%] mb-10'>
                    <img src={timelineImage} className='shadow-white object-cover w-full h-fit' alt='timelineImage' />
                    <div className='absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[70%] bg-caribbeangreen-800 flex flex-row text-white uppercase py-4'>
                        <div className='flex flex-row gap-3 items-center border-r border-caribbeangreen-300 px-6 w-1/2 justify-center'>
                            <h1 className='text-2xl font-bold'>100</h1>
                            <p className='text-pure-greys-400 text-[10px] tracking-wider'>Years of Experience</p>
                        </div>
                        <div className='flex flex-row gap-3 items-center px-6 w-1/2 justify-center'>
                            <h1 className='text-2xl font-bold'>200M+</h1>
                            <p className='text-pure-greys-400 text-[10px] tracking-wider'>Hours Of Course Videos</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-caribbeangreen-800 py-3' />
        </div>
    )
}

export default TimelineSection