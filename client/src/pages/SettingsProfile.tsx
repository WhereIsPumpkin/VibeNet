import { AddImageIcon, GoBackIcon } from "../components/icons";
import { useStore } from "../app/userStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import profPic from "../assets/blank-profile-picture-973460_960_720.webp";

const SettingsProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { profile, updateName } = useStore();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleProfileFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  console.log(profile.name);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-9 px-4 h-14">
        <div onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>

        <span className="text-[#0F1319] font-semibold text-l">
          Edit Profile
        </span>

        <div className="flex-grow"></div>

        <button className="m min-h-[2rem] bg-[#0F1319] rounded-2xl px-4 text-white font-semibold">
          Save
        </button>
      </div>

      <div
        className="bg-[#CFD2DE] w-screen h-32 grid items-center justify-center bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="bg-black/50 w-11 h-11 flex items-center justify-center rounded-full">
          <button onClick={() => fileInputRef.current?.click()}>
            <AddImageIcon />
          </button>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="px-4 -mt-12 relative">
        <img
          src={profileImage || profPic}
          alt="profile img"
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <button
          onClick={() => profileFileInputRef.current?.click()}
          className=" bg-black/50 w-11 h-11 absolute left-16 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
        >
          <AddImageIcon />
        </button>
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          ref={profileFileInputRef}
          onChange={handleProfileFileChange}
        />
      </div>

      <form className="px-4 mt-3 relative group">
        <div className="relative">
          <label
            htmlFor="name"
            className={`absolute text-[#536471] text-[0.8125rem] top-1 left-2 ${
              !profile.name ? "top-0 left-0" : null
            }`}
          >
            Name
          </label>

          <input
            value={profile.name}
            onChange={(event) => updateName(event.target.value)}
            id="name"
            type="text"
            className="border border-[#ccd0d5] w-full px-2 h-14 rounded-[4px] pt-4 focus:outline-none text-[17px]"
          />
        </div>
        <textarea
          placeholder="Bio"
          className="w-full h-24 mt-6 focus:outline-none rounded-md border border-[#ccd0d5] px-2 pt-2 resize-none"
        ></textarea>
      </form>
    </div>
  );
};

export default SettingsProfile;
