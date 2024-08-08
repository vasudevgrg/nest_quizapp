import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { examdata } from '../action/examdata';

const ExamCard = ({data}) => {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    console.log(data.id);
const handleAttemptExam = () =>{
    fetch(`http://localhost:5002/exam/attemptexam/${data.id}`,{credentials:'include'}).then(e=>e.json()).then(e=>{
        console.log(e);
        dispatch(examdata(data));
        navigate('/startexam').catch((error)=> console.log(error));
    }).catch(error => console.log(error));
}

  return (
    <>
    <div style={{width:'100vw', display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', padding:'10px'}}>
        <h2>{data.name}</h2>
        <p>No. of Questions:</p>
        <button onClick={handleAttemptExam}>Attempt Exam</button>
    </div>
    </>
  )
}

export default ExamCard