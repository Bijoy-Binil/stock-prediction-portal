import './assets/css/style.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { Routes,Route } from "react-router"
import Register from './components/Register'
import Login from './components/Login'
function App() {


  return (
    <>
      <Header/>
      <Routes>
      <Route path='/' element={<Main/> } />
      <Route path='/register' element={<Register/> } />
      <Route path='/login' element={<Login/> } />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
