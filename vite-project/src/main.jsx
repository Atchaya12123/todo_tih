import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {Login} from './Login.jsx'
import {Signup} from './Signup.jsx'
import PrivateRoute from './PrivateRoute.jsx'

function Main(){
  return(
  <BrowserRouter>
  <Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} />
    <Route path="/" element={<PrivateRoute><App/></PrivateRoute>} />
  </Routes>
  </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(

    <Main />
)
