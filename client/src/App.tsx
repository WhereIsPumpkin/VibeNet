import axios from "axios";
import Verification from "./pages/Verification";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  axios.defaults.baseURL = "http://localhost:6060";
  axios.defaults.withCredentials = false;

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
}

export default App;
