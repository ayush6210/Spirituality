import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import MainApp from "./MainApp";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        {/* Main App Route */}
        <Route path="/home" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default App;
