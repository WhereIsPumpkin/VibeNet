import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../app/userStore";
import { useEffect } from "react";
import { GoBackIcon } from "../components/icons";
import profPic from "../assets/blank-profile-picture-973460_960_720.webp";

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

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-9 px-4 h-14">
        <div onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-[#0F1319] font-semibold text-l">
            {profile.name} {profile.lastName}
          </span>
          <span className="text-[#546471] text-xxs">0 Tweets</span>
        </div>
      </div>
      <div className="bg-[#CFD9DE] w-screen h-32"></div>
      <div className="px-4">
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-white -mt-10">
            <img src={profPic} />
          </div>
          <button
            onClick={() => navigate("/settings/profile")}
            className="border border-[#CFD9DE] rounded-2xl text-[#0F1319] font-semibold px-3 mt-3 py-[0.625rem] max-h-9 flex items-center"
          >
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
