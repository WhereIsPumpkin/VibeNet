import { useEffect } from "react";
import { useStore } from "./app/userStore.tsx";
import Login from "./pages/Login.tsx";
import axios from "axios";
import HomePage from "./pages/HomePage.tsx";

const Routes = () => {
  const profile = useStore((state) => state.profile);
  const getProfile = useStore((state) => state.getProfile);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (profile.name) {
    return <HomePage />;
  }

  console.log("no");
  return <Login />;
};

export default Routes;
