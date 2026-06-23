import React from 'react'
import Footer from '../components/core/HomePage/Footer'
import * as Icon1 from 'react-icons/bi'
import * as Icon2 from 'react-icons/io5'
import * as Icon3 from 'react-icons/hi2'

const ContactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const Contact = () => {
  return (
    <div className='flex flex-col w-full text-white'>
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row gap-10 mt-20 mb-20 justify-center items-start'>
            
            {/* Contact Details Panel */}
            <div className='lg:w-[40%] flex flex-col gap-6 rounded-xl bg-richblack-800 p-8'>
                {ContactDetails.map((ele, i) => {
                    let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
                    return (
                        <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' key={i}>
                            <div className='flex flex-row items-center gap-3'>
                                {Icon && <Icon size={25} />}
                                <h1 className='text-lg font-semibold text-richblack-5'>{ele.heading}</h1>
                            </div>
                            <p className='font-medium'>{ele.description}</p>
                            <p className='font-semibold'>{ele.details}</p>
                        </div>
                    )
                })}
            </div>

            {/* Contact Form Panel */}
            <div className='lg:w-[60%] border border-richblack-600 text-richblack-300 rounded-xl p-8 lg:p-14 flex gap-3 flex-col'>
                <h1 className='text-4xl leading-10 font-semibold text-richblack-5'>
                    Got a Idea? We've got the skills. Let's team up
                </h1>
                <p className='text-richblack-300 mt-3'>
                    Tell us more about yourself and what you're got in mind.
                </p>

                <form className='flex flex-col gap-7 mt-7'>
                    <div className='flex flex-col gap-5 lg:flex-row'>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='firstname' className='text-sm text-richblack-5'>First Name</label>
                            <input type='text' name='firstname' id='firstname' placeholder='Enter first name' className='rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 outline-none w-full border-none focus:bg-richblack-700' />
                        </div>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='lastname' className='text-sm text-richblack-5'>Last Name</label>
                            <input type='text' name='lastname' id='lastname' placeholder='Enter last name' className='rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 outline-none w-full border-none focus:bg-richblack-700' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-sm text-richblack-5'>Email Address</label>
                        <input type='email' name='email' id='email' placeholder='Enter email address' className='rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 outline-none w-full border-none focus:bg-richblack-700' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='phonenumber' className='text-sm text-richblack-5'>Phone Number</label>
                        <div className='flex flex-row gap-5'>
                            <select name='countrycode' id='countrycode' className='w-[80px] rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 outline-none border-none focus:bg-richblack-700'>
                                <option value='+91'>+91</option>
                                <option value='+1'>+1</option>
                                <option value='+44'>+44</option>
                                <option value='+61'>+61</option>
                            </select>
                            <input type='tel' name='phonenumber' id='phonenumber' placeholder='12345 67890' className='rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 outline-none w-[calc(100%-100px)] border-none focus:bg-richblack-700' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='message' className='text-sm text-richblack-5'>Message</label>
                        <textarea name='message' id='message' cols='30' rows='7' placeholder='Enter your message here' className='rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 outline-none w-full border-none focus:bg-richblack-700' />
                    </div>

                    <button type='button' className='rounded-md bg-yellow-50 px-6 py-3 text-center text-[16px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:scale-95 transition-all duration-200 hover:shadow-none'>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
        
        <Footer />
    </div>
  )
}

export default Contact
