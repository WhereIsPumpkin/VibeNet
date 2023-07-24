import axios from "axios";
import Verification from "./pages/Verification";
import { Route, Routes } from "react-router-dom";
import ProfileRoutes from "./ProfileRoutes.tsx";
import Profile from "./pages/Profile.tsx";
import SettingsProfile from "./pages/SettingsProfile.tsx";
import Saved from "./pages/Saved.tsx";
import i18n from "./i18.ts";
import { I18nextProvider } from "react-i18next";


function App() {
  axios.defaults.baseURL = "http://localhost:6060";
  axios.defaults.withCredentials = true;

  return (
    <I18nextProvider i18n={i18n}>
      <>
        <Routes>
          <Route path="/" element={<ProfileRoutes />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings/profile" element={<SettingsProfile />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </>
    </I18nextProvider>
  );
}

export default App;
