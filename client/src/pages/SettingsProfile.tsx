import { AddImageIcon, GoBackIcon } from "../components/icons";
import { useStore } from "../app/userStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SettingsProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {
    profile,
    updateName,
    updateLastName,
    updateWebsite,
    updateBio,
    updateLocation,
  } = useStore();

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

  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("lastName", profile.lastName);
    formData.append("bio", profile.bio);
    formData.append("website", profile.website);
    formData.append("location", profile.location);

    if (
      profileFileInputRef.current?.files &&
      profileFileInputRef.current.files[0]
    ) {
      formData.append("profilePic", profileFileInputRef.current.files[0]);
    }

    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      formData.append("coverPic", fileInputRef.current.files[0]);
    }

    try {
      await axios.post("/api/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/${profile.username}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col font-rubik">
      <div className="flex items-center gap-9 px-4 h-14">
        <div onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>

        <span className="text-[#0F1319] font-semibold text-l">
          Edit Profile
        </span>

        <div className="flex-grow"></div>

        <button
          type="submit"
          form="updateForm"
          className="m min-h-[2rem] bg-[#0F1319] rounded-2xl px-4 text-white font-semibold"
        >
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
        <div className="rounded-full border-4 border-white overflow-hidden w-24 h-24 ">
          <img
            src={profileImage || `http://localhost:6060${profile.profilePic}`}
            alt="profile img"
            className="filter brightness-75"
          />
        </div>
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

      <form
        id="updateForm"
        onSubmit={handlesubmit}
        className="px-4 mt-3 relative group flex flex-col gap-4"
      >
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

        <div className="relative">
          <label
            htmlFor="lastName"
            className={`absolute text-[#536471] text-[0.8125rem] top-1 left-2 ${
              !profile.lastName ? "top-0 left-0" : null
            }`}
          >
            Last Name
          </label>
          <input
            value={profile.lastName}
            onChange={(event) => updateLastName(event.target.value)}
            id="lastName"
            type="text"
            className="border border-[#ccd0d5] w-full px-2 h-14 rounded-[4px] pt-4 focus:outline-none text-[17px]"
          />
        </div>

        <textarea
          placeholder="Bio"
          value={profile.bio}
          onChange={(event) => updateBio(event.target.value)}
          className="w-full h-24 focus:outline-none rounded-md border border-[#ccd0d5] px-2 pt-2 resize-none"
        ></textarea>

        <div className="relative">
          <label
            htmlFor="website"
            className={`absolute text-[#536471] text-[0.8125rem] top-1 left-2 ${
              !profile.website ? "top-0 left-0" : null
            }`}
          >
            Website
          </label>
          <input
            value={profile.website}
            onChange={(event) => updateWebsite(event.target.value)}
            id="website"
            type="url"
            className="border border-[#ccd0d5] w-full px-2 h-14 rounded-[4px] pt-4 focus:outline-none text-[17px]"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="location"
            className={`absolute text-[#536471] text-[0.8125rem] top-1 left-2 ${
              !profile.location ? "top-0 left-0" : null
            }`}
          >
            Location
          </label>
          <input
            value={profile.location}
            onChange={(event) => updateLocation(event.target.value)}
            id="location"
            type="text"
            className="border border-[#ccd0d5] w-full px-2 h-14 rounded-[4px] pt-4 focus:outline-none text-[17px]"
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsProfile;
