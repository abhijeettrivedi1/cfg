import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/Index'
import Layout from './Layout'
import axios from 'axios';
import RegisterPage from './pages/Register'
import LoginPage from './pages/LoginPage'
import { Usercontextprovider } from './usercontext'
import TestPage from './pages/TestPage'
import StudentPage from './pages/StudentsPage'
import CreateStudent from './pages/CreateStudent'
axios.defaults.baseURL="http://localhost:3000"
axios.defaults.withCredentials=true
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Usercontextprovider>
        <Routes   >
          <Route path="/" element={<IndexPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/test/:id" element={<TestPage/>} />
          <Route path="/students" element={<StudentPage/>} />
          <Route path="/createstudent" element={<CreateStudent/>} />
        </Routes>
    </Usercontextprovider>
      
    </>
  )
}

export default App
