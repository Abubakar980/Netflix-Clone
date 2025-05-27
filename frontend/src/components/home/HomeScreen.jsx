import React from "react";
import { useAuthStore } from "../store/authUser";

const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[url('hero.png')] bg-cover min-h-screen text-white p-4">
  <h1>Welcome to HomeScreen</h1>
  <button onClick={handleLogout}>Logout</button>
</div>

  );
};

export default HomeScreen;
