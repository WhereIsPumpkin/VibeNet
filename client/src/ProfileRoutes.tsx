import { useEffect } from "react";
import { useStore } from "./app/userStore.tsx";
import { usePostStore } from "./app/postSotre.tsx";
import Login from "./pages/Login.tsx";

import HomePage from "./pages/HomePage.tsx";

const Routes = () => {
  const profile = useStore((state) => state.profile);
  const getProfile = useStore((state) => state.getProfile);

  const { fetchPosts } = usePostStore();

  useEffect(() => {
    getProfile();
    fetchPosts();
  }, [getProfile, fetchPosts]);

  if (profile.name) {
    return <HomePage />;
  }

  return <Login />;
};

export default Routes;
