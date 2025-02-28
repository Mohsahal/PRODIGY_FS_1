import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Componet/Home';
import SignUp from './Componet/SignUp';
import Login from './Componet/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
     
      </Routes>
    </Router>
  );



};



export default App;