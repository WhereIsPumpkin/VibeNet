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
import defaultProfile from "../assets/blank-profile-picture-973460_960_720.webp";

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
  const backendURL = "https://vibenetapi.up.railway.app";

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
      <div className="flex h-14 items-center gap-9 px-4">
        <div className="md:cursor-pointer" onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-l font-semibold text-[#0F1319]">
            {user.name} {user.lastName}
          </span>
          <span className="text-xxs text-[#546471]">
            {user?.posts?.length} {t("posts")}
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${backendURL}${user.coverPic})`,
        }}
        className="ceter h-32 w-screen bg-[#CFD9DE] bg-center bg-no-repeat  md:mx-auto md:min-w-[42rem] md:max-w-[42rem] md:rounded-lg md:rounded-b-none"
      ></div>

      <div className="flex flex-col gap-2 px-4 md:mx-auto md:min-w-[42rem] md:rounded-lg md:rounded-t-none md:shadow-customPost">
        <div className="flex items-center justify-between">
          <div className="-mt-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-white">
            <img
              className="h-full w-full object-cover"
              src={
                (user.profilePic && `${backendURL}${user.profilePic}`) ||
                defaultProfile
              }
            />
          </div>
          {profile.username === username ? (
            <button
              onClick={() => navigate("/settings/profile")}
              className="mt-3 flex max-h-9 items-center rounded-2xl border border-[#CFD9DE] px-3 py-[0.625rem] text-basicFont font-semibold text-[#0F1319]"
            >
              {t("editProf")}
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`mt-3 flex max-h-9 items-center rounded-3xl border px-4 py-2 text-basicFont font-medium ${
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
          <h2 className="text-xl font-bold text-[#0F1419]">
            {user.name} {user.lastName}
          </h2>
          <span className="text-basicFont text-[#536471]">
            @{user.username}
          </span>
        </div>
        {user.bio || user.website || user.location ? (
          <>
            {user.bio && (
              <div className="text-basicFont text-[#536471]">{user.bio} </div>
            )}
            <div className="flex items-center gap-2">
              {user.location && (
                <div className="flex items-center gap-1 text-basicFont text-[#536471]">
                  <LocationIcon /> {user.location}
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon />{" "}
                  <a
                    className="max-w-[13rem] truncate text-basicFont text-[#1D98F0]"
                    href={user.website}
                    target="_blank"
                  >
                    {user.website}
                  </a>
                </div>
              )}
            </div>
          </>
        ) : null}
        <div className="flex gap-1">
          <CalendarIcon />
          <span className="text-basicFont text-[#536471] ">
            Joined {month} {year}
          </span>
        </div>

        <div className="flex gap-3 text-sm text-[#536471]">
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
