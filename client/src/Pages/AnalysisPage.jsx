import React, { useEffect, useState } from 'react'
import AnalysisCard from '../Components/AnalysisPage/AnalysisCard';

const AnalysisPage = () => {
const [attemptedExamData, setAttemptedExamdata]= useState([]);
    useEffect(()=> {
        fetch('http://localhost:5002/user/getattemptedexams',{credentials:'include'}).then(e=>e.json()).then(
            e => {
                setAttemptedExamdata(e);
            }
        )
    },[]);
  return (
    <>
    {
        attemptedExamData.map((data) => (
            <AnalysisCard data={data}/>
        ))
    }
    </>
  )
}

export default AnalysisPage