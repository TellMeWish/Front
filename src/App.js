import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signUp" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
