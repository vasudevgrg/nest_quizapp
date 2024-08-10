import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateQuestions from './Pages/CreateQuestions';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Exam from './Pages/Exam';
import AnalysisPage from './Pages/AnalysisPage';
import ExamAnalysisPage from './Pages/ExamAnalysisPage';
import Navbar from './Components/Navbar';
import Popup from './Components/Popup';

function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/' element={<MainPage/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/startexam' element={<Exam/>}/>
   <Route path='/analysis' element={<AnalysisPage/>} />
   <Route path='/examanalysis' element={<ExamAnalysisPage/>} />
   </Routes>
   <Popup/>
   </BrowserRouter>
   </>
  );
}

export default App;
