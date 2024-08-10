import React, { useEffect, useState } from 'react'
import ExamCard from './ExamCard';
import { useDispatch, useSelector } from 'react-redux';
import { examId, showCreateQuestionModal } from '../action';
import CreateQuestion from './Modal/CreateQuestionModal';

const CreateExam = () => {
    const [name, setName]= useState("");
    const dispatch= useDispatch();

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
            console.log(e);
            dispatch(examId(e.exam.id));
            dispatch(showCreateQuestionModal(true));
            
        })
    }

  return (
    <div>
    <label>
        Create New Exam:
        <input value={name} onChange={e=> setName(e.target.value)}/>
    </label>
    <button onClick={handleCreateExam}> Create Exam</button>
   </div>
  )
}

export default CreateExam