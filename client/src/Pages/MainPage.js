import React, { useEffect, useState } from 'react'
import ExamCard from '../Components/ExamCard';
import { useDispatch, useSelector } from 'react-redux';
import { examId, showCreateQuestionModal, showPopup } from '../action';
import CreateQuestion from '../Components/Modal/CreateQuestionModal';
import CreateExam from '../Components/CreateExam';
import Cookies from 'js-cookie';

const MainPage = () => {
    const [isAdmin, setIsAdmin]= useState(false);
    const [exams, setExams]= useState([]);
    const showModal = useSelector(e=> e.manageShowCreateQuestionModal);
    const dispatch= useDispatch();

    useEffect(() => {
        fetch("http://localhost:5002/exam/getexams", {
          credentials: 'include'
        })
          .then(async (response) => {
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "Failed to fetch exams");
            }
            return response.json(); 
          })
          .then((data) => {
            console.log(data); 
            setExams(data); 
          })
          .catch((error) => {
            dispatch(showPopup({ visible: 'true', message: error.message })); 
          });
        const role = Cookies.get('role');
        if (role === 'admin') {
          setIsAdmin(true);
        }
      }, [dispatch]); 
      

  return (
   <>
   <h1>
    Welcome to Quiz Webssite
   </h1>
  {
   isAdmin && <CreateExam/>
  }
   {
    exams.map(e=> (
        <ExamCard data={e}/>
    ))
   }
   {
    showModal && <CreateQuestion/>
   }
   </>
  )
}

export default MainPage