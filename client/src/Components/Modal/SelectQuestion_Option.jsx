import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SelectQuestion_Option = ({ data, setQuestionId }) => {
  const [isRelated, setIsRelated] = useState(false);
  const exam_id = useSelector((e) => e.manageExamId);

  useEffect(() => {
    axios
      .post(
        "http://localhost:5002/question/examrelation",
        {
          question_id: data.id,
          exam_id: exam_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => setIsRelated(response.data))
      .catch((error) => {
        console.error("There was an error checking the relation:", error);
      });
  }, []);

  const handleClick = (id) => {
    !isRelated && setQuestionId(id);
  };
  return (
    <div>
      <div
        style={{ backgroundColor: "lightgray", border:'1px solid black', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}
        onClick={() => handleClick(data.id)}
      >
        {data.name}
        {isRelated && <p style={{fontStyle:'italic'}}>allready added</p>}
      </div>
      
    </div>
  );
};

export default SelectQuestion_Option;
