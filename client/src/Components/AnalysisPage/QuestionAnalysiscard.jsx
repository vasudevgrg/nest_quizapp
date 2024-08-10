import React, { useState } from "react";
import OptionAnalysis from "./OptionAnalysis";

const QuestionAnalysiscard = ({ data, student_exam_id, idx }) => {
  const [option, setOption] = useState(-1);
  const [correct, setCorrect] = useState(false);
  const [notCorrect, setNotCorrect] = useState(false);
  const [unattempt, setUnattempt] = useState(false);
  const [status, setStatus]= useState('');

  React.useEffect(() => {
    fetch("http://localhost:5002/exam/getselectedoption", {
      method: "POST",
      body: JSON.stringify({
        question_id: data.id,
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
          return setUnattempt(true);

        }
        setOption(e);

        if (e == data.id) {
            setStatus('correct');
          setCorrect(true);
        } else {
            setStatus('notcorrect');
          setNotCorrect(true);
        }
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems:'center',
          padding: "10px",
        }}
      >
        <div style={{width:'80vw'}}>
          <p style={{display:'flex', flexDirection:'row', alignItems:'center'}}> 
            <p>Ques. {idx}   .</p>
            <h3>{data.statement}</h3>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {data.options.map((e, idx) => (
                <OptionAnalysis idx={idx+1} data={e} status={status} correct_option_id={data.correct_option_id} question_id={data.id} student_exam_id={student_exam_id} />
                
            ))}
          </div>
        </div>
        <div>
          {correct && <h1>Correct</h1>}
          {!correct && <h1>Not Correct</h1>}
          {unattempt && <h1>UnAttempted</h1>}
        </div>
      </div>
    </>
  );
};

export default QuestionAnalysiscard;
