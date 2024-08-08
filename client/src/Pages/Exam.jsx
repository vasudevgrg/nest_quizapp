import React, { useState } from 'react'
import QuestionCard from '../Components/QuestionCard';
import { useSelector } from 'react-redux';

const Exam = () => {
    const [attemptedQUestions, setAttemptedQuestions]= useState([]);
    const data= useSelector(e=> e.manageExamdata);
    console.log(data);
    const handleSubmitExam= () => {
        fetch('http://localhost:5002/exam/submitexam')
    }
    
  return (
   <>
   <h1>{data.name}</h1>
   <h2>All Questions:</h2>
   {
    data.questions.map((question, idx)=> (
        <div>
            <p>{idx}</p>
            <QuestionCard data={question} setAttemptedQuestions={setAttemptedQuestions}/>
            <button onClick={handleSubmitExam}>Submit Exam</button>
        </div>
    ))
   }
   </>
  )
}

export default Exam