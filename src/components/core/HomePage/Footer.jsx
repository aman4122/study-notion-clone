// import { Link } from "react-router-dom"
// import { FaGoogle   } from "react-icons/fa6";
// import { FaMeta,FaYoutube ,FaTwitter} from "react-icons/fa6";
// const footerData = [
//   {
//     title: "Company",
//     links: ["About", "Careers", "Affiliates"]
//   },
//   {
//     title: "Resources",
//     links: ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"]
//   },
//   {
//     title: "Plans",
//     links: ["Paid Memberships", "For Students", "Business Solutions"]
//   },
//   {
//     title: "Community",
//     links: ["Forums", "Chapters", "Events"]
//   },
//   {
//     title: "Support",
//     links: ["Help Center"]
//   },
//   {
//     title: "Subjects",
//     links: ["AI", "Cloud Computing", "Code Foundations", "Computer Science", "Cybersecurity", "Data Analytics", "Data Science", "Data Visualization", "Developer Tools", "DevOps", "Game Development", "IT", "Machine Learning", "Math", "Mobile Development", "Web Design", "Web Development"]
//   },
//   {
//     title: "Languages",
//     links: ["Bash", "C", "C++", "C#", "Go", "HTML & CSS", "Java", "JavaScript", "Kotlin", "PHP", "Python", "R", "Ruby", "SQL", "Swift"]
//   },
//   {
//     title: "Career Building",
//     links: ["Career Paths", "Career Services", "Interview Prep", "Professional Certification", "Full Catalog", "Beta Content"]
//   },
// ]
// const Footer = () => {
//   return (
//     <footer className='bg-richblack-800 text-richblack-400 w-full mt-20'>

//       {/* Top Section */}
//       <div className='mx-auto w-11/12 py-14 border-b border-richblack-600'>
//         <div className='flex flex-row flex-wrap justify-between gap-10'>

//           {/* Column 1 — Logo + Company + Socials */}
//           <div className='flex flex-col gap-4 min-w-[150px]'>
//             {/* Logo — dada dega 🙏 */}
//             <p className='text-richblack-50 font-bold text-2xl'>StudyNotion</p>

//             <div className='flex flex-col gap-3'>
//               <h3 className='text-richblack-50 font-semibold text-sm'>
//                 {footerData[0].title}
//               </h3>
//               {footerData[0].links.map((link) => (
//                 <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>
//                   {link}
//                 </Link>
//               ))}
//             </div>

//             {/* Social Icons — dada dega 🙏 */}

//             <div className='flex gap-3 mt-2'>
//               <div className='w-6 h-6 rounded-full bg-richblack-700' ><FaMeta /></div> {/* Facebook */}
//               <div className='w-6 h-6 rounded-full bg-richblack-700' ><FaGoogle />
// </div> {/* Google */}
//               <div className='w-6 h-6 rounded-full bg-richblack-700' ><FaTwitter /></div> {/* Twitter */}
//               <div className='w-6 h-6 rounded-full bg-richblack-700' ><FaYoutube /></div> {/* YouTube */}
//             </div>
//           </div>

//           {/* Divider 1 */}
//           <div className='hidden lg:block w-[1px] bg-richblack-600' />

//           {/* Column 2 — Resources + Plans + Community + Support */}
//           <div className='flex flex-row flex-wrap gap-10'>
//             {footerData.slice(1, 5).map((section) => (
//               <div key={section.title} className='flex flex-col gap-3 min-w-[120px]'>
//                 <h3 className='text-richblack-50 font-semibold text-sm'>
//                   {section.title}
//                 </h3>
//                 {section.links.map((link) => (
//                   <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>
//                     {link}
//                   </Link>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Divider 2 */}
//           <div className='hidden lg:block w-[1px] bg-richblack-600' />

//           {/* Column 3 — Subjects + Languages + Career Building */}
//           <div className='flex flex-row flex-wrap gap-10'>
//             {footerData.slice(5, 8).map((section) => (
//               <div key={section.title} className='flex flex-col gap-3 min-w-[130px]'>
//                 <h3 className='text-richblack-50 font-semibold text-sm'>
//                   {section.title}
//                 </h3>
//                 {section.links.map((link) => (
//                   <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>
//                     {link}
//                   </Link>
//                 ))}
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className='mx-auto w-11/12 py-6'>
//         <div className='flex flex-row justify-between items-center text-sm flex-wrap gap-4'>

//           <div className='flex gap-4 items-center'>
//             <Link to={"/"} className='hover:text-richblack-50 transition-all duration-200'>
//               Privacy Policy
//             </Link>
//             <span>|</span>
//             <Link to={"/"} className='hover:text-richblack-50 transition-all duration-200'>
//               Cookie Policy
//             </Link>
//             <span>|</span>
//             <Link to={"/"} className='hover:text-richblack-50 transition-all duration-200'>
//               Terms
//             </Link>
//           </div>

//           <p>Made with ❤️ CodeHelp © 2023 Studynotion</p>

//         </div>
//       </div>

//     </footer>
//   )
// }

// export default Footer












import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6";
import { FaMeta, FaYoutube, FaTwitter } from "react-icons/fa6";

const footerData = [
    {
        title: "Company",
        links: ["About", "Careers", "Affiliates"]
    },
    {
        title: "Resources",
        links: ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"]
    },
    {
        title: "Plans",
        links: ["Paid Memberships", "For Students", "Business Solutions"]
    },
    {
        title: "Community",
        links: ["Forums", "Chapters", "Events"]
    },
    {
        title: "Support",
        links: ["Help Center"]
    },
    {
        title: "Subjects",
        links: ["AI", "Cloud Computing", "Code Foundations", "Computer Science", "Cybersecurity", "Data Analytics", "Data Science", "Data Visualization", "Developer Tools", "DevOps", "Game Development", "IT", "Machine Learning", "Math", "Mobile Development", "Web Design", "Web Development"]
    },
    {
        title: "Languages",
        links: ["Bash", "C", "C++", "C#", "Go", "HTML & CSS", "Java", "JavaScript", "Kotlin", "PHP", "Python", "R", "Ruby", "SQL", "Swift"]
    },
    {
        title: "Career Building",
        links: ["Career Paths", "Career Services", "Interview Prep", "Professional Certification", "Full Catalog", "Beta Content"]
    },
]

const Footer = () => {
    return (
        <footer className='bg-richblack-800 text-richblack-400 w-full mt-20'>

            {/* Top Section */}
            <div className='mx-auto w-11/12 py-14 border-b border-richblack-600'>
                <div className='flex flex-row gap-10'>

                    {/* LEFT of Divider — Logo + Company + Socials + Resources + Plans + Community + Support */}
                    <div className='flex flex-row flex-wrap gap-10 flex-1'>

                        {/* Logo + Company + Socials */}
                        <div className='flex flex-col gap-4 min-w-[150px]'>
                            <p className='text-richblack-50 font-bold text-2xl'>StudyNotion</p>

                            <div className='flex flex-col gap-3'>
                                <h3 className='text-richblack-50 font-semibold text-sm'>
                                    {footerData[0].title}
                                </h3>
                                {footerData[0].links.map((link) => (
                                    <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>
                                        {link}
                                    </Link>
                                ))}
                            </div>

                            {/* Social Icons */}
                            <div className='flex gap-3 mt-2 items-center'>
                                <div className='w-7 h-7 rounded-full bg-richblack-700 flex items-center justify-center'><FaMeta /></div>
                                <div className='w-7 h-7 rounded-full bg-richblack-700 flex items-center justify-center'><FaGoogle /></div>
                                <div className='w-7 h-7 rounded-full bg-richblack-700 flex items-center justify-center'><FaTwitter /></div>
                                <div className='w-7 h-7 rounded-full bg-richblack-700 flex items-center justify-center'><FaYoutube /></div>
                            </div>
                        </div>

                        {/* Resources + Plans + Community + Support */}
                        <div className='grid grid-cols-2 gap-x-10 gap-y-10'>
                            {/* Col 1 — Resources then Community below */}
                            <div className='flex flex-col gap-3'>
                                <h3 className='text-richblack-50 font-semibold text-sm'>{footerData[1].title}</h3>
                                {footerData[1].links.map((link) => (
                                    <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>{link}</Link>
                                ))}
                            </div>

                            {/* Col 2 — Plans then Support below */}
                            <div className='flex flex-col gap-3'>
                                <h3 className='text-richblack-50 font-semibold text-sm'>{footerData[2].title}</h3>
                                {footerData[2].links.map((link) => (
                                    <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>{link}</Link>
                                ))}
                            </div>

                            {/* Community under Resources */}
                            <div className='flex flex-col gap-3'>
                                <h3 className='text-richblack-50 font-semibold text-sm'>{footerData[3].title}</h3>
                                {footerData[3].links.map((link) => (
                                    <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>{link}</Link>
                                ))}
                            </div>

                            {/* Support under Plans */}
                            <div className='flex flex-col gap-3'>
                                <h3 className='text-richblack-50 font-semibold text-sm'>{footerData[4].title}</h3>
                                {footerData[4].links.map((link) => (
                                    <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>{link}</Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ONE Divider */}
                    <div className='hidden lg:block w-[1px] bg-richblack-600' />

                    {/* RIGHT of Divider — Subjects + Languages + Career Building */}
                    <div className='flex flex-row flex-wrap gap-10 flex-1'>
                        {footerData.slice(5, 8).map((section) => (
                            <div key={section.title} className='flex flex-col gap-3 min-w-[130px]'>
                                <h3 className='text-richblack-50 font-semibold text-sm'>
                                    {section.title}
                                </h3>
                                {section.links.map((link) => (
                                    <Link key={link} to={"/"} className='text-sm hover:text-richblack-50 transition-all duration-200'>
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className='mx-auto w-11/12 py-6'>
                <div className='flex flex-row justify-between items-center text-sm flex-wrap gap-4'>

                    <div className='flex gap-4 items-center'>
                        <Link to={"/"} className='hover:text-richblack-50 transition-all duration-200'>
                            Privacy Policy
                        </Link>
                        <span>|</span>
                        <Link to={"/"} className='hover:text-richblack-50 transition-all duration-200'>
                            Cookie Policy
                        </Link>
                        <span>|</span>
                        <Link to={"/"} className='hover:text-richblack-50 transition-all duration-200'>
                            Terms
                        </Link>
                    </div>

                    <p>Made with ❤️ CodeHelp © 2023 Studynotion</p>

                </div>
            </div>

        </footer>
    )
}

export default Footer