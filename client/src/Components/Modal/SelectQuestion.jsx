import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SelectQuestion_Option from './SelectQuestion_Option';

const SelectQuestion = () => {
    const [questionSearch, setQuestionSearch] = useState('');
    const [questions, setQuestions]= useState([]);
    const [questionId, setQuestionId] = useState(-1);

    const exam_id= useSelector(e=>e.manageExamId);

    useEffect(()=> {
        fetch('http://localhost:5002/question/searchquestions',{
            method:'POST',
            body: JSON.stringify({
                question_name: questionSearch
            }),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(e=> e.json()).then(e=>{ setQuestions(e); console.log(e);});
    },[questionSearch]);

    const handleAddQuestion = () => {
        axios.post('http://localhost:5002/exam/addquestion',{
            question_id: questionId,
            exam_id: exam_id
        },{
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          }).then(e=>e.json()).then(e => {
            setQuestionSearch('');
            questions([]);
        })
    }
  return (
    <div style={{display:'flex', flexDirection:'column' , justifyContent:'space-around', alignItems:'center'}}>
        <h2>Add From Existing Questions:</h2>
        <div>
        <label>
            Search Question:
            <input  onChange={(e)=> setQuestionSearch(e.target.value)}/>
        </label>
        <div>
            {
              questionSearch!= '' &&  questions.map((question) => (
                    <SelectQuestion_Option data={question} setQuestionId={setQuestionId}/>
                ))
            }
        </div>
        </div>
        <button>Add Question</button>
    </div>
  )
}

export default SelectQuestion