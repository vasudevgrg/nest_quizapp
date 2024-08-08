import React from 'react'

const QuestionCard = ({data, setAttemptedQuestions}) => {

    const handleOptionClick = ({id}) => {
        setAttemptedQuestions(e=>[...e, {question_id: data.id, option_id: id}])
    }
  return (
   <>
 
    <div>
        {data.statement}
    </div>
    {
        data.options.map((option, idx)=> (
            <button onClick={()=> handleOptionClick({id: option.id})}>{option.option}</button>
        ))
    }
   </>
  )
}

export default QuestionCard