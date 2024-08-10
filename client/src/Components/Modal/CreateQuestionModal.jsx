import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showCreateQuestionModal } from '../../action';
import SelectCorrectOption from './SelectCorrectOption';
import SelectQuestion from './SelectQuestion';

const CreateQuestion = () => {
    const [statement, setStatement]= useState("");
    const [name, setName]= useState("");
    const [option, setOption]=useState("");
    const [options, setOptions]= useState([]);
    const [correctOption, setCorrectOption]= useState("");

    const exam_id= useSelector(e=> e.manageExamId);
    const dispatch= useDispatch();

    const handleAddQuestion = () => {

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
        }).then(e=>e.json()).then(e=>{
            setOptions([]);
            setName('');
            setStatement('');
            setOption('');

        });
    }

  return (
    <>
    <div className="modal-wrapper" onClick={() => dispatch(showCreateQuestionModal(false))}></div>
    <div className="modal-container">
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <label  className="form-element">
            Add Question Name:
            <input value={name} onChange={e=>setName(e.target.value)}/>
        </label>
        <label  className="form-element">
            Add Question Statement:
            <input value={statement} onChange={e=>setStatement(e.target.value)}/>
        </label>
        <label  className="form-element">
            Add Options:
            <input value={option} onChange={e=>setOption(e.target.value)}/>
            <button onClick={()=>{setOptions(e=>[...e,option]); setOption("");}}> Add option</button>
        </label>
        <label  className="form-element">
            Select Correct Option:
            <SelectCorrectOption options={options} setCorrectOption={setCorrectOption}/>
        </label>
        <button onClick={handleAddQuestion}>Add question</button>
    </div>
    <div style={{width: '2px', height: '100%', backgroundColor: 'black', margin: '0 20px'}}></div>
    <SelectQuestion/>
    </div>
    </div>
    </>
  )
}

export default CreateQuestion