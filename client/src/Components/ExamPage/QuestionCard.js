import React from 'react'

const QuestionCard = ({data, setAttemptedQuestions, idx}) => {

    const handleOptionClick = (optionId) => {
        setAttemptedQuestions(prev => {
          // Check if the question already exists in the array
          const existingIndex = prev.findIndex(q => q.question_id === data.id);
          
          if (existingIndex >= 0) {
            // Update the existing entry
            const updated = [...prev];
            updated[existingIndex] = { question_id: data.id, option_id: optionId };
            return updated;
          } else {
            // Add a new entry
            return [...prev, { question_id: data.id, option_id: optionId }];
          }
        });

        console.log(optionId);
      };

  return (
   <div style={{border:' 1px solid black', margin:'10px'}}>
 
    <div style={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
      <p>Ques.{idx+1}</p>
      <h3>  {data.statement} </h3>
    </div>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
    {
        data.options.map((option, idx)=> (
           <p> {idx+1}.  <button onClick={()=> handleOptionClick(option.id)}>{option.option}</button></p>
        ))
    }
    </div>
    <button>Remove Question</button>
    <button>Edit Question</button>
   </div>
  )
}

export default QuestionCard