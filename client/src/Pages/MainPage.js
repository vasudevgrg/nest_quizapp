import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CreateQuestions from './CreateQuestions';
import ExamCard from '../Components/ExamCard';

const MainPage = () => {
    const [name, setName]= useState("");
    const navigate= useNavigate();
    const [showCreateQuestion, setShowCreateQuestion]= useState(false);
    const [examId, setExamId]= useState(0);
    const [exams, setExams]= useState([]);

    useEffect(()=> {
        fetch("http://localhost:5002/exam/getexams",{
            credentials:'include'
        }).then(e=>e.json()).then(e=>{
            console.log(e);
            setExams(e);
        })
    },[]);

    const handleCreateExam = ()=> {
        fetch("http://localhost:5002/exam/createexam",{
            method:'POST',
            body: JSON.stringify({
                name
            }),
            headers : {
                "Content-Type": "application/json"
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>{
            console.log(e.exam.id);
            setExamId(e.exam.id);
            setShowCreateQuestion(true);
        })
    }

  return (
   <>
   <h1>
    Welcome to Quiz Webssite
   </h1>
   <div>
    <label>
        Create New Exam:
        <input value={name} onChange={e=> setName(e.target.value)}/>
    </label>
    <button onClick={handleCreateExam}> Create Exam</button>
   </div>
   {
    showCreateQuestion && <CreateQuestions exam_id={examId}/>
   }
   {
    exams.map(e=> (
        <ExamCard data={e}/>
    ))
   }
   </>
  )
}

export default MainPage