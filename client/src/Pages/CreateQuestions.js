import React, { useEffect, useState } from 'react'
import QuestionCard from '../Components/ExamPage/QuestionCard';
import SelectCorrectOption from '../Components/Modal/SelectCorrectOption';

const CreateQuestions = ({exam_id}) => {
    const [statement, setStatement]= useState("");
    const [name, setName]= useState("");
    const [option, setOption]=useState("");
    const [options, setOptions]= useState([]);
    const [correctOption, setCorrectOption]= useState("");

    const [questions, setQuestions]= useState([]);

    React.useEffect(()=>{
        console.log(exam_id);
        fetch(`http://localhost:5002/exam/getquestions/${exam_id}`).then(e=>e.json()).then(e=>console.log(e));
    },[]);

    const handleAddQuestion = () => {
        console.log(exam_id);
        fetch("http://localhost:5002/question/createquestion", {
            method:'POST',
            body: JSON.stringify({
                statement: statement,
                name: name,
                options: options,
                exam_id: exam_id,
                correct_option: correctOption
            }),
            headers :{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>console.log(e));
    }
  return (
    <>
    <div>
        <label>
            Add Question Name:
            <input onChange={e=>setName(e.target.value)}/>
        </label>
        <label>
            Add Question Statement:
            <input onChange={e=>setStatement(e.target.value)}/>
        </label>
        <label>
            Add Options:
            <input value={option} onChange={e=>setOption(e.target.value)}/>
            <button onClick={()=>{setOptions(e=>[...e,option]); setOption("");}}> Add option</button>
        </label>
        <label>
            Select Correct Option:
            <SelectCorrectOption options={options} setCorrectOption={setCorrectOption}/>
        </label>
        <button onClick={handleAddQuestion}>Add question</button>
    </div>
    <div>
        {
            questions.map(question => {
                <QuestionCard data={question}/>
            })
        }
    </div>
    </>
  )
}

export default CreateQuestions