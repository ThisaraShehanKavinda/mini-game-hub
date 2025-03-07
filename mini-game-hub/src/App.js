import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainFrame from "./components/MainScreen"; // Create this file later
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import WelcomeScreen from "./components/WelcomeScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainFrame />} />
      </Routes>
    </Router>
  );
};

export default App;
