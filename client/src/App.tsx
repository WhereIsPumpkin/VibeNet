import axios from "axios";
import Verification from "./pages/Verification";
import { Route, Routes } from "react-router-dom";
import ProfileRoutes from "./ProfileRoutes.tsx";

function App() {
  axios.defaults.baseURL = "http://localhost:6060";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<ProfileRoutes />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
}

export default App;
