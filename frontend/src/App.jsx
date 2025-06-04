import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import HomePage from "./components/home/HomePage"
import Footer from "./components/Footer/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./components/store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./components/WatchPage/WatchPage"

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("Auth user is here: ", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  // Agar abhi auth check chal raha hai toh loading dikhayen
  if (isCheckingAuth) {
    return (
        <div className="h-screen">
          <div className="flex justify-center items-center bg-black h-full">
            <Loader className="animate-spin text-red-600 size-10"/>
          </div>
        </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/watch/:id" element={!user ? <Navigate to="/login" replace /> : <WatchPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
