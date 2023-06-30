import './App.css';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Flashcards from './pages/Flashcards';
import Dictionary from './pages/Dictionary';
import Layout from './components/Layout';
import {Home} from './pages/Home';
import { Test } from './pages/Test';
import { Awards } from './components/Awards';
import { PersistLogin } from './components/PersistLogin';
function App() {
  return (
    <>
      <Routes>
          <Route path='login' element={<Login/>}/>
          {/* PROTECTED ROUTES */}
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth/>}>
              <Route path='home' element={<Home/>}/>
              <Route path='study' element={<Flashcards/>}/>
              <Route path='test'  element={<Test/>}/>
              <Route path='dictionary' element={<Dictionary/>}/>
              <Route path='awards' element={<Awards/>}/>
              <Route path='/' element={<Home/>}>
              <Route path='*' element={<Home/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
