import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "../src/pages/Books";
import Add from "../src/pages/Add";
import Update from "../src/pages/Update";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
