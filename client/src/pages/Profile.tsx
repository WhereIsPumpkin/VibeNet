import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../app/userStore";
import { useEffect } from "react";
import {
  GoBackIcon,
  CalendarIcon,
  LocationIcon,
  LinkIcon,
} from "../components/icons";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile } = useStore();
  const getProfile = useStore((state) => state.getProfile);
  const date = new Date(profile.registrationDate);

  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (username !== profile.username) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col font-rubik">
      <div className="flex items-center gap-9 px-4 h-14">
        <div onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-[#0F1319] font-semibold text-l">
            {profile.name} {profile.lastName}
          </span>
          <span className="text-[#546471] text-xxs">0 Posts</span>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(http://localhost:6060${profile.coverPic})`,
        }}
        className="bg-[#CFD9DE] w-screen h-32 ceter bg-no-repeat bg-center"
      ></div>

      <div className="px-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white -mt-10 flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:6060${profile.profilePic}`}
            />
          </div>

          <button
            onClick={() => navigate("/settings/profile")}
            className="border border-[#CFD9DE] rounded-2xl text-[#0F1319] font-semibold px-3 mt-3 py-[0.625rem] max-h-9 flex items-center text-basicFont"
          >
            Edit profile
          </button>
        </div>

        <div>
          <h2 className="text-[#0F1419] text-xl font-bold">
            {profile.name} {profile.lastName}
          </h2>
          <span className="text-[#536471] text-basicFont">
            @{profile.username}
          </span>
        </div>

        {profile.bio ||
          profile.website ||
          (profile.location && (
            <>
              {profile.bio && (
                <div className="text-[#536471] text-basicFont">
                  {profile.bio}
                </div>
              )}

              <div className="flex gap-2 items-center">
                {profile.location && (
                  <div className="flex gap-1 text-[#536471] text-basicFont items-center">
                    <LocationIcon /> {profile.location}
                  </div>
                )}
                {profile.website && (
                  <div className="flex gap-1 items-center">
                    <LinkIcon />{" "}
                    <a
                      className="text-[#1D98F0] text-basicFont max-w-[13rem] truncate"
                      href={profile.website}
                      target="_blank"
                    >
                      {profile.website}
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
            <b className="text-black">0</b> Following
          </span>
          <span>
            <b className="text-black">0</b> Followers
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
