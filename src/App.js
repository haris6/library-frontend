import './App.css';
import StudentsList from './components/students';
import BooksList from './components/books';
import Home from './components/home';
import { BrowserRouter,Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="books" element={<BooksList/>} />
        <Route path="students" element={<StudentsList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
