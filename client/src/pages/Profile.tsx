import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../app/userStore";
import { useEffect } from "react";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile } = useStore();
  const getProfile = useStore((state) => state.getProfile);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (username !== profile.username) {
    navigate("/");
    return null;
  }

  return <h1>Hello from profile page</h1>;
};

export default Profile;
