import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import QuestionAnalysiscard from '../Components/AnalysisPage/QuestionAnalysiscard';

const ExamAnalysisPage = () => {
    const [questions, setQuestions]= useState([]);
    const examANalysisDetail= useSelector(e=> e.manageExamAnalysis);
    console.log(examANalysisDetail);
    const {exam_id, student_exam_id}= examANalysisDetail;

    useEffect(()=> {
        fetch(`http://localhost:5002/exam/getquestions/${exam_id}`,{
            credentials:'include'
        }).then(e=>e.json()).then(e=> {setQuestions(e); console.log(e)});
    },[]);
  return (
   <>
   {
    questions.map((question, idx) => (
        <QuestionAnalysiscard data={question} student_exam_id={student_exam_id} idx={idx} />
    ))
   }
   </>
  )
}

export default ExamAnalysisPage