import React, { useEffect, useState } from 'react';

const OptionAnalysis = ({ idx, data, correct_option_id , question_id, student_exam_id}) => {
    const [color, setColor] = useState(''); 
    const [status, setStatus]= useState('');

    React.useEffect(() => {
        fetch("http://localhost:5002/exam/getselectedoption", {
          method: "POST",
          body: JSON.stringify({
            question_id: question_id,
            student_exam_id: student_exam_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((e) => e.json())
          .then((e) => {
            
            if (e === -1) {
                setStatus('unattempt');
            }  
            if (e == data.id) {
                setStatus('correct');
            } else {
                setStatus('notcorrect');
            }
          }).then(()=>{
            console.log(correct_option_id, data.id, status);
            if (status=='correct' && data.id==correct_option_id) {
                console.log("inside correct");
                setColor('green');
            } 
            if(status=='notcorrect'){
                setColor('red')
            }
          });
      }, []);

    // useEffect(() => {
    //     console.log(correct_option_id, data.id, status);
    //     if (status=='correct' && data.id==correct_option_id) {
    //         console.log("inside correct");
    //         setColor('green');
    //     } 
    //     if(status=='notcorrect'){
    //         setColor('red')
    //     }
    // }, []); 

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: color }}>
                <p>{idx}.</p>
                <p>{data.option}</p>
            </div>
        </>
    );
};

export default OptionAnalysis;
