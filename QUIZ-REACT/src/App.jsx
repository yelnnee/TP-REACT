import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <>
      <Navbar />  {/* ← La navbar s'affiche sur toutes les pages */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </>
  );
}

export default App;
