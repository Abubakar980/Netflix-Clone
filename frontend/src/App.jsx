import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import HomePage from "./components/home/HomePage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  )
}

export default App
