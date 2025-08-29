import './assets/css/style.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { Routes,Route } from "react-router"
import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './AuthProvider'
import Dashboard from './components/dashboard/Dashboard'




function App() {


  return (
    <>
    <AuthProvider>
      <Header/>
      <Routes>
      <Route path='/' element={<Main/> } />
      <Route path='/register' element={<Register/> } />
      <Route path='/login' element={<Login/> } />
      <Route path='/dashboard' element={<Dashboard/> } />
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  )
}

export default App
