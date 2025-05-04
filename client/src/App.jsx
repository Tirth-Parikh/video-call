import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from './pages/Login';
import Room from "./pages/Room";

// Create a functional component to check the current path
function App() {
  const location = useLocation();

  // Check if the current route is `/room/:roomCode`
  const isRoomPage = location.pathname.includes('/room');

  return (
    <>
      {/* Conditionally render Navbar */}
      {!isRoomPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomCode" element={<Room />} />
        <Route path="login" element={<Login />} />

        
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
