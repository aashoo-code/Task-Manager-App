
import { Route } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import { Routes,Navigate } from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
