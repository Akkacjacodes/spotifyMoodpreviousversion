import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import FindSimilar from './pages/FindSimilar'; 
import NewPopular from './pages/NewPopular'; 
import YearFiltered from './pages/YearFiltered';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/findsimilar" element={<FindSimilar />} />
        <Route path="/newpopular" element={<NewPopular />} />
        <Route path="/yearfiltered" element={<YearFiltered />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
