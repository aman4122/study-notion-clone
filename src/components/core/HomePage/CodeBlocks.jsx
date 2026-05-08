// import React from 'react'
// import CTAButton from './CTAButton'
// import { FaArrowAltCircleRight } from "react-icons/fa";
// import { TypeAnimation } from 'react-type-animation';

// const CodeBlocks = (
//   { position, heading, subheading, ctabtn1 = {}, ctabtn2 = {}, codeblock, backgroundGradient, codeColor }
// ) => {
//   return (
//     <div className={`flex ${position} my-20 justify-between gap-10`}>


//       <div className='w-[50%] flex flex-col gap-8'>
//         {heading}
//         <div className='text-richblack-300 text-base font-medium'>{subheading}</div>
//         <div className='flex gap-6 mt-2'>
//           <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
//             <div className='flex items-center gap-2'>
//               {ctabtn1.btnText}
//               <FaArrowAltCircleRight />
//             </div>
//           </CTAButton>

//           <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
//             {ctabtn2.btnText}
//           </CTAButton>
//         </div>
//       </div>

//       <div className='h-fit flex flex-row text-[14px] w-[100%] py-4 lg:w-[500px]'>
//         {/* HW: BG-GRADIENT */}
//         <div className='relative flex items-center justify-center'>
//           <div className='absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] opacity-20 blur-3xl' />
//           <p className='relative z-10 text-4xl font-bold text-white'>

//           </p>
//         </div>
//         <div className='text-center flex flex-col w-[10%] text-richblack-400 font-mono font-bold select-none'>
//           <p>1</p>
//           <p>2</p>
//           <p>3</p>
//           <p>4</p>
//           <p>5</p>
//           <p>6</p>
//           <p>7</p>
//           <p>8</p>
//           <p>9</p>
//           <p>10</p>
//           <p>11</p>
//           <p>12</p>
//           <p>13</p>

//         </div>
//         <div className='relative flex items-center justify-center'>
//           <div className={`relative z-10 w-[90%] flex flex-col font-bold font-mono gap-2 ${codeColor} pr-2 text-left`}>

//             <div className={`w-[90%] flex flex-col font-bold font-mono gap-2  ${codeColor} pr-2 text-left`}>
//               <TypeAnimation
//                 sequence={[codeblock, 1000, ""]}
//                 repeat={Infinity}
//                 cursor={true}
//                 style={
//                   {
//                     whiteSpace: "pre-line",
//                     display: "block"
//                   }
//                 }
//                 omitDeletionAnimation={true}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default CodeBlocks











import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = (
  { position, heading, subheading, ctabtn1 = {}, ctabtn2 = {}, codeblock, backgroundGradient, codeColor }
) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

      <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 text-base font-medium'>{subheading}</div>
        <div className='flex gap-6 mt-2'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex items-center gap-2'>
              {ctabtn1.btnText}
              <FaArrowAltCircleRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Code Block Container */}
      <div className='relative h-fit flex flex-row text-[14px] w-[100%] py-4 lg:w-[500px]'>
        
        {/* BG GRADIENT CIRCLE — absolute inside this container */}
        <div className='absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] opacity-20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />

        {/* Line Numbers */}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-mono font-bold select-none'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
        </div>

        {/* Type Animation */}
        <div className={`w-[90%] flex flex-col font-bold font-mono gap-2 ${codeColor} pr-2 text-left`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
             speed={69} 
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block"
            }}
            omitDeletionAnimation={true}
          />
        </div>

      </div>

    </div>
  )
}

export default CodeBlocks