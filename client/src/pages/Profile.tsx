import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../app/userStore";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GoBackIcon,
  CalendarIcon,
  LocationIcon,
  LinkIcon,
} from "../components/icons";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile, getProfile } = useStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const date = new Date(user.registrationDate);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("/api/profile/user", { username });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
    getProfile();
  }, [username, getProfile]);

  // New function to handle follow/unfollow
  const handleFollow = async () => {
    try {
      await axios.post(`/api/toggleFollow/${profile.id}/${user._id}`);
      const response = await axios.post("/api/profile/user", { username });
      setUser(response.data);
      getProfile();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col font-rubik">
      <div className="flex items-center gap-9 px-4 h-14">
        <div onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-[#0F1319] font-semibold text-l">
            {user.name} {user.lastName}
          </span>
          <span className="text-[#546471] text-xxs">
            {user?.posts?.length} {t("posts")}
          </span>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(http://localhost:6060${user.coverPic})`,
        }}
        className="bg-[#CFD9DE] w-screen h-32 ceter bg-no-repeat bg-center"
      ></div>
      <div className="px-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white -mt-10 flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:6060${user.profilePic}`}
            />
          </div>
          {profile.username === username ? (
            <button
              onClick={() => navigate("/settings/profile")}
              className="border border-[#CFD9DE] rounded-2xl text-[#0F1319] font-semibold px-3 mt-3 py-[0.625rem] max-h-9 flex items-center text-basicFont"
            >
              {t("editProf")}
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`border rounded-3xl font-medium px-4 py-2 mt-3 max-h-9 flex items-center text-basicFont ${
                profile.following?.includes(user._id)
                  ? "border-[#CFD9DE] bg-transparent text-[#0F1319]"
                  : "border-[#0F1319] bg-[#0F1319] text-white"
              }`}
            >
              {profile.following?.includes(user._id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div>
          <h2 className="text-[#0F1419] text-xl font-bold">
            {user.name} {user.lastName}
          </h2>
          <span className="text-[#536471] text-basicFont">
            @{user.username}
          </span>
        </div>
        {user.bio ||
          user.website ||
          (user.location && (
            <>
              {user.bio && (
                <div className="text-[#536471] text-basicFont">{user.bio}</div>
              )}
              <div className="flex gap-2 items-center">
                {user.location && (
                  <div className="flex gap-1 text-[#536471] text-basicFont items-center">
                    <LocationIcon /> {user.location}
                  </div>
                )}
                {user.website && (
                  <div className="flex gap-1 items-center">
                    <LinkIcon />{" "}
                    <a
                      className="text-[#1D98F0] text-basicFont max-w-[13rem] truncate"
                      href={user.website}
                      target="_blank"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
              </div>
            </>
          ))}
        <div className="flex gap-1">
          <CalendarIcon />
          <span className="text-[#536471] text-basicFont ">
            Joined {month} {year}
          </span>
        </div>
        <div className="flex gap-3 text-[#536471] text-sm">
          <span>
            <b className="text-black">{user.following?.length}</b>{" "}
            {t("following")}
          </span>
          <span>
            <b className="text-black">{user.followers?.length}</b>{" "}
            {t("follower")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
