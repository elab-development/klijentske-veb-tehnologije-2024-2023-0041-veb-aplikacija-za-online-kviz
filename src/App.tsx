import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { LogIn } from './components/LogIn';
import { Home } from './components/Home';
import { Quizzes } from './components/Quizzes';
import { MyProfile } from './components/MyProfile';
import { SingleQuestion } from './components/SingleQuestion';
import { SingleQuiz } from './components/SingleQuiz';
import { MyStats } from './components/MyStats';
import { Edit } from './components/Edit';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />}></Route>
          <Route path='/log-in' element={<LogIn />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/quizzes' element={< Quizzes />}></Route>
          <Route path='/my-profile' element={<MyProfile />}></Route>
          <Route path='/single-question' element={< SingleQuestion />}></Route>
          <Route path='/single-quiz' element={< SingleQuiz />}></Route>
          <Route path='/my-stats' element={< MyStats />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
