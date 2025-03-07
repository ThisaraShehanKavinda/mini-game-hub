import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import SignIn from "./components/SignIn";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/main" element={<MainScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
