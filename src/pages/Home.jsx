    import React from 'react'
    import { Link } from 'react-router-dom'
    import { FaArrowAltCircleRight } from "react-icons/fa";
    import HighlightText from '../components/core/HomePage/HighlightText';
    import CTAButton from '../components/core/HomePage/CTAButton';

    const Home = () => {
    return (
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
        {/* Section 1 */}
        
        <div>
            <Link to={"/signup" }>
            <div className='mt-16 m-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200'>
                <div className='flex flex-row'>
                    <p>Become Instructor</p>
                    <FaArrowAltCircleRight />
                </div>
                </div>
            </Link>
            <div className='text-4xl'>
                Empower growth with <HighlightText text={"Coding skills"} />
            </div>

            <div className='w-[90%] text-lg text-richblack-300'>With our online coding courses, you can get a high paying job
            </div>



            <div>
                <CTAButton>
                    Learn More
                </CTAButton>

                <CTAButton>
                    Book a Demo
                </CTAButton>
            </div>
            </div>      
        
        
        
        
        
        
        
        
        
        {/* Section 2 */}















        {/* Section 3 */}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        {/* Footer,Section 4 */}










        </div>
    )
    }

    export default Home;
