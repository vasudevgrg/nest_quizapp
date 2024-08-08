import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateQuestions from './Pages/CreateQuestions';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Exam from './Pages/Exam';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<MainPage/>}/>
   <Route path='/createquestion' element={<CreateQuestions/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/startexam' element={<Exam/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
