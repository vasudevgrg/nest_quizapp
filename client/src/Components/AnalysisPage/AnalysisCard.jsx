import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { examAnalysis } from '../../action';

const AnalysisCard = ({data}) => {
    const {id, student_id, exam_id, score}= data;
    const [examDetails, setExamDetails]= useState({});
    const dispatch= useDispatch();
    const navigate= useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:5002/exam/getexamdetails/${exam_id}`,{
            credentials:'include'
        }).then(e=>e.json()).then(e=> {
            console.log(e);
            setExamDetails(e);
        })
    },[]);

    const handleAnalysisPage= () => {
       
        dispatch(examAnalysis({exam_id: exam_id, student_exam_id: id}));
        navigate("/examanalysis")
    }

  return (
   <>
   <div style={{display:'flex', flexDirection:'row', border:'2px solid black', justifyContent:'space-evenly', alignItems:'center', margin:'20px'}}>
    <h2>{examDetails.name}</h2>
    <h3>Score: {score}</h3>
    <button onClick={handleAnalysisPage}>See Full Analysis   </button>
   </div>
   </>
  )
}

export default AnalysisCard