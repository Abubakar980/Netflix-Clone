import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import HomePage from "./components/home/HomePage"
import Footer from "./components/Footer/Footer"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
