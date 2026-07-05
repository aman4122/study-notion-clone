import React from 'react'
import {Chart,registerables} from "chart.js"
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { courseEndpoints } from '../../../../services/apis';
// import courses



Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart,setCurrChart] = useState("students");


    //function to generate random colors
    const getRandomColors = (numColors) =>{
        const colors = [];
        for (let i=0;i<numColors;i++){
            const color= `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }


    //create data  for chart displaying student info 
    const chartDataForStudents = {
        labels:courses.map((course,index)=>course.courseName
        ),
        datasets:[
            {
                data: courses.map((course)=>course.studentsEnrolled?.length || 0),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }



    // data for chart for income onfo

    const chartDataForIncome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data: courses.map((course)=>(course.price || 0) * (course.studentsEnrolled?.length || 0)),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }



    // create options
    const options= {

    };




  return (
    <div>
      <p className="flex gap-15 text-xl font-bold text-richblack-5 m-4 ml-0">Visualise</p>
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setCurrChart("students")}
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${currChart === 'students' ? 'bg-yellow-50 text-richblack-900' : 'bg-richblack-800 text-yellow-50 hover:bg-richblack-700'}`}
        >
            Student
        </button>

        <button 
          onClick={() => setCurrChart("income")}
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${currChart === 'income' ? 'bg-yellow-50 text-richblack-900' : 'bg-richblack-800 text-yellow-50 hover:bg-richblack-700'}`}
        >
            Income
        </button>
      </div>
      <div className='gap-5 w-[500px] h-[500px]'>
        <Pie
        data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
        options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
