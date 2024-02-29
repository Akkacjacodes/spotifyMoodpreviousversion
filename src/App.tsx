import "./App.css";
import PlaylistPage from "./pages/PlaylistPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlistpage" element={<PlaylistPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          {/* <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
