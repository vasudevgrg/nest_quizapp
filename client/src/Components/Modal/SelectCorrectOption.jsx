import React from 'react'

const SelectCorrectOption = ({setCorrectOption, options}) => {
    console.log(options);
  return (
    <select onChange={e=> setCorrectOption(e.target.value)}>
        <option>Select Correct Option</option>
    {
        options.map(option=> (
            <option value={option}>{option}</option>
        ))
    }
</select>
  )
}

export default SelectCorrectOption