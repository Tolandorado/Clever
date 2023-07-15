import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main/main.jsx';
import { Posts } from './components/Posts/posts.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <HashRouter>
        |<Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/posts' element={<Posts />}></Route>
        </Routes>
       </HashRouter>
      </header>
    </div>
  );
}

export default App;
