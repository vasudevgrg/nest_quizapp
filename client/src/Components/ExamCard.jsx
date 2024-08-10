import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { examdata, examId, showCreateQuestionModal, studentExamId } from '../action';

const ExamCard = ({data}) => {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    console.log(data.id);
const handleAttemptExam = () =>{
    fetch(`http://localhost:5002/exam/attemptexam/${data.id}`,{credentials:'include'}).then(e=>e.json()).then(e=>{
        console.log(e);
        dispatch(studentExamId(e));
        dispatch(examdata(data));
        navigate('/startexam')
    }).catch(error => console.log(error));
}

const handleAddQuestion= () => {
    dispatch(examId(data.id));
    dispatch(showCreateQuestionModal(true));
}

  return (
    <>
    <div style={{width:'100vw', display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', padding:'10px', border:'1px solid black'}}>
        <h2>{data.name}</h2>
        <p>No. of Questions: {data.questions.length}</p>
        <button onClick={handleAttemptExam}>Attempt Exam</button>
        <button onClick={handleAddQuestion}>Add Question:</button>
    </div>
    </>
  )
}

export default ExamCard