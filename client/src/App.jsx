import React from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup></Signup>}/>
        <Route path="/login" element={<Login></Login>}/>

      </Routes>
    </Router>

    
    
  )
}

export default App
