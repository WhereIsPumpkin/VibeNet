import axios from "axios";
import Verification from "./pages/Verification";
import { Route, Routes } from "react-router-dom";
import ProfileRoutes from "./ProfileRoutes.tsx";
import Profile from "./pages/Profile.tsx";
import SettingsProfile from "./pages/SettingsProfile.tsx";

function App() {
  axios.defaults.baseURL = "http://localhost:6060";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<ProfileRoutes />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/settings/profile" element={<SettingsProfile />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
}

export default App;
