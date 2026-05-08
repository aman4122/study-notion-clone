    import React from 'react'
    import { Link } from 'react-router-dom'
    import { FaArrowAltCircleRight } from "react-icons/fa";
    import HighlightText from '../components/core/HomePage/HighlightText';
    import CTAButton from '../components/core/HomePage/CTAButton';
    import banner from "../assets/Images/banner.mp4"
    import CodeBlocks from '../components/core/HomePage/CodeBlocks';
    import Footer from '../components/core/HomePage/Footer';
    import TimelineSection from '../components/core/HomePage/TimelineSection';
    import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
    import InstructorSection from '../components/core/HomePage/InstructorSection';
    import ExploreMore from '../components/core/HomePage/ExploreMore';






    const Home = () => {
        return (
            <div className='flex flex-col w-full overflow-x-hidden'>

                {/* Main Content */}
                <div className='mx-auto flex flex-col w-11/12 items-center text-white'>

                    {/* Section 1 */}
                    <div className='flex flex-col items-center text-center gap-6'>
                        <Link to={"/signup"}>
                            <div className='mt-16 m-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 px-5 py-2 border border-richblack-600 hover:scale-95 transition-all duration-200 cursor-pointer'>
                                <div className='flex flex-row items-center gap-2'>
                                    <p>Become Instructor</p>
                                    <FaArrowAltCircleRight />
                                </div>
                            </div>
                        </Link>

                        <div className='text-4xl font-semibold mt-2 leading-snug'>
                            404: Career Not Found.<HighlightText text={" We Fix That!"} />
                        </div>

                        <div className='w-[90%] text-lg text-richblack-300 text-center leading-relaxed'>
                            With our online coding courses, you can get a high paying job
                        </div>

                        <div className='flex flex-row gap-6 mt-2'>
                            <CTAButton active={true}>
                                Learn More
                            </CTAButton>
                            <CTAButton>
                                Book a Demo
                            </CTAButton>
                        </div>

                        <div className='shadow-blue-200 mx-4 mt-8 rounded-xl overflow-hidden border border-richblack-700'>
                            <video muted loop autoPlay>
                                <source src={banner} type="video/mp4" />
                            </video>
                        </div>

                        {/* Code Section 1 */}
                        <div>
                            <CodeBlocks
                                position={"lg:flex-row"}
                                heading={
                                    <div className='text-4xl font-semibold'>
                                        Buy our course <HighlightText text={"to get a job!"} />
                                    </div>
                                }
                                subheading={
                                    "We can't guarantee a job. But your parents can't either. So trust us."
                                }
                                ctabtn1={{
                                    active: true,
                                    btnText: "Try now",
                                    linkto: "/signup",
                                }}
                                ctabtn2={{
                                    active: false,
                                    btnText: "Learn more",
                                    linkto: "/login",
                                }}
                                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>My Life Before StudyNotion</title>\n</head>\n<body>\n<h1>Unemployed</h1>\n<p>Mom asks about job daily.</p>\n<p>I said I am learning.</p>\n<!-- year 3 of learning -->\n</body>\n</html>`}
                                codeColor={"text-yellow-25"}
                            />
                        </div>

                        {/* Code Section 2 */}
                        <div>
                            <CodeBlocks
                                position={"lg:flex-row-reverse"}
                                heading={
                                    <div className='text-4xl font-semibold'>
                                        Start coding <HighlightText text={"but not in seconds!"} />
                                    </div>
                                }
                                subheading={
                                    "Warning: may cause sleep deprivation, existential crisis, and accidental employment."
                                }
                                ctabtn1={{
                                    active: true,
                                    btnText: "Try now",
                                    linkto: "/signup",
                                }}
                                ctabtn2={{
                                    active: false,
                                    btnText: "Learn more",
                                    linkto: "/login",
                                }}
                                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Day 1 of Coding</title>\n</head>\n<body>\n<h1>Hello World</h1>\n<p>Took me 4 hours.</p>\n<p>Cried twice.</p>\n<p>Googled everything.</p>\n<!-- still don't know what I did -->\n</body>\n</html>`}
                                codeColor={"text-caribbeangreen-500"}
                            />
                        </div>



                        <div>
                            <ExploreMore />
                        </div>
                    </div>

                </div>


                {/* Section 2 — full width */}
                <div className='w-full bg-pure-greys-5'>
                    <div className='homepage_bg h-[433px] flex items-center justify-center'>
                        <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-center'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-2'>
                                    Explore Full Catalog
                                    <FaArrowAltCircleRight />
                                </div>
                            </CTAButton>




                            <CTAButton active={false} linkto={"/login"}>
                                <div className='flex items-center text-white gap-2'>
                                    Want to learn
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>



                <div className='mx-auto  flex flex-col homepage_bg w-full bg-pure-greys-5'>
                    <div className='flex flex-row'>
                        <div className=''>
                            Get The Skills you will need for a <HighlightText text={"Job on demand  in the market"} />
                        </div>
                        <div className='flex flex-col items-start'>
                            <div className='text-[16px] '>
                                Modern StudyNotion Website
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>Learn More</div>
                            </CTAButton>
                        </div>
                    </div>



                
                
                
                
                
                <TimelineSection/>


                <LearningLanguageSection/>
                </div>





                {/* Section 3 */}
                <div className='w-11/12 ,max-w-max flex flex-col justify-between bg-richblack-900'>



                <InstructorSection/>
                                
                
                <h2 className='text-4xl text-white mt-10 font-semibold'>Reviews from other learners</h2>
                </div>

                {/* Footer — full width */}
                <Footer />

            </div>
        )
    }

    export default Home;