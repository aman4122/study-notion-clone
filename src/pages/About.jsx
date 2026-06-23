import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import Footer from '../components/core/HomePage/Footer'

const About = () => {
  return (
    <div className='flex flex-col w-full text-white'>
        <section className='bg-richblack-800 pb-20 pt-20'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center text-center gap-6'>
                <h1 className='text-4xl font-semibold text-richblack-5'>
                    Driving Innovation in Online Education for a <br/>
                    <HighlightText text={"Brighter Future"} />
                </h1>
                <p className='text-richblack-300 text-lg w-[70%]'>
                    StudyNotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </div>
        </section>

        <section className='py-20 border-b border-richblack-700'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row gap-10'>
                <div className='flex flex-col gap-6 md:w-1/2'>
                    <h2 className='text-3xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent'>
                        Our Founding Story
                    </h2>
                    <p className='text-richblack-300 text-base'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-richblack-300 text-base'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries.
                    </p>
                </div>
                <div className='flex flex-col gap-6 md:w-1/2'>
                    <h2 className='text-3xl font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'>
                        Our Vision
                    </h2>
                    <p className='text-richblack-300 text-base'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content.
                    </p>
                    <h2 className='text-3xl font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent mt-8'>
                        Our Mission
                    </h2>
                    <p className='text-richblack-300 text-base'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue.
                    </p>
                </div>
            </div>
        </section>

        <section className='bg-richblack-800 py-10'>
            <div className='w-11/12 max-w-maxContent mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10'>
                <div className='flex flex-col'>
                    <h1 className='text-4xl font-bold text-white'>5K</h1>
                    <p className='text-richblack-500 font-semibold text-lg'>Active Students</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-4xl font-bold text-white'>10+</h1>
                    <p className='text-richblack-500 font-semibold text-lg'>Mentors</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-4xl font-bold text-white'>200+</h1>
                    <p className='text-richblack-500 font-semibold text-lg'>Courses</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-4xl font-bold text-white'>50+</h1>
                    <p className='text-richblack-500 font-semibold text-lg'>Awards</p>
                </div>
            </div>
        </section>

        <Footer />
    </div>
  )
}

export default About
