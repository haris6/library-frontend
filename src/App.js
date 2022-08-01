import './App.css';
import StudentsList from './components/students';
import BooksList from './components/books';
import Home from './components/home';
import StudentDetail from './components/studentdetail';
import BookDetail from './components/bookdetail';
import SelectStudent from './components/selectstudent';
import SetReturnDate from './components/setreturndate';
import { BrowserRouter,Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="books" element={<BooksList/>} />
        <Route path="students" element={<StudentsList/>} />
        <Route path="student_detail" element={<StudentDetail />}/>
        <Route path="book_detail" element={<BookDetail />}/>
        <Route path="select_student" element={<SelectStudent/>}/>
        <Route path="set_return_date" element={<SetReturnDate/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
