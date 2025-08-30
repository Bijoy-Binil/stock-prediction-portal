import './assets/css/style.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { Routes,Route } from "react-router"
import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './AuthProvider'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'





function App() {


  return (
    <>
    <AuthProvider>
      <Header/>
      <Routes>
      <Route path='/' element={<Main/> } />
      <Route path='/register' element={<PublicRoute><Register/></PublicRoute> } />
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute> } />
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  )
}

export default App
