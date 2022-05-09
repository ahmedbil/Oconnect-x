import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import LoginWithEmail from './components/LoginWithEmail';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/login' element={<LoginWithEmail/>}/>
        <Route exact path='/reset-password' element={<LoginWithEmail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
