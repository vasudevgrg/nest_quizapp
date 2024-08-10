import React, { useState } from 'react'
import QuestionCard from '../Components/ExamPage/QuestionCard';
import { useSelector } from 'react-redux';

const Exam = () => {
    const [attemptedQUestions, setAttemptedQuestions]= useState([]);
    const data= useSelector(e=> e.manageExamdata);
    const studentExamId=useSelector(e=> e.manageStudentExamId);
    console.log(data);
    const handleSubmitExam= () => {
        console.log(attemptedQUestions);
        fetch(`http://localhost:5002/exam/submitexam/${studentExamId}`,{
            method:'POST',
            body: JSON.stringify({
                attemptedQuestions : attemptedQUestions
            }),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(e=> e.json()).then(e=> console.log(e));
    }
    
  return (
   <>
   <h1>{data.name}</h1>
   <h2>All Questions:</h2>
   {
    data.questions.map((question, idx)=> (
        <div>
           
            <QuestionCard data={question} idx={idx} setAttemptedQuestions={setAttemptedQuestions}/>
            
        </div>

    ))
   }

<button onClick={handleSubmitExam}>Submit Exam</button>
   </>
  )
}

export default Exam