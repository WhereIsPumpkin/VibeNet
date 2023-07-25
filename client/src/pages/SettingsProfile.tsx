import { AddImageIcon, GoBackIcon } from "../components/icons";
import { useStore } from "../app/userStore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import defaultProfile from "../assets/blank-profile-picture-973460_960_720.webp";

const SettingsProfile = () => {
  const backendURL = "https://vibenetapi.up.railway.app";
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {
    profile,
    getProfile,
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
    for (const entry of formData.entries()) {
      console.log(entry);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="flex flex-col font-rubik">
      <div className="flex h-14 items-center gap-9 px-4 ">
        <div className="md:cursor-pointer" onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>

        <span className="text-l font-semibold text-[#0F1319] ">
          {t("editProf")}
        </span>

        <div className="flex-grow"></div>

        <button
          type="submit"
          form="updateForm"
          className="m min-h-[2rem] rounded-2xl bg-[#0F1319] px-4 font-semibold text-white"
        >
          {t("save")}
        </button>
      </div>

      <div
        className="grid h-32 w-screen items-center justify-center bg-[#CFD2DE] bg-center bg-no-repeat md:mx-auto md:min-w-[42rem] md:max-w-[42rem] md:rounded-lg md:rounded-b-none"
        style={{ backgroundImage: `url(${coverImage || profile.coverPic} )` }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50">
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

      <div className="relative -mt-12 px-4 md:mx-auto md:min-w-[42rem] md:max-w-[42rem] md:rounded-lg md:rounded-b-none">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white">
          <img
            src={
              profileImage ||
              (profile.profilePic && `${backendURL}${profile.profilePic}`) ||
              defaultProfile
            }
            alt="profile img"
            className="h-full w-full object-cover brightness-75 filter"
          />
        </div>

        <button
          onClick={() => profileFileInputRef.current?.click()}
          className=" absolute left-16 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50"
        >
          <AddImageIcon />
        </button>
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          ref={profileFileInputRef}
          onChange={handleProfileFileChange}
        />
      </div>

      <form
        id="updateForm"
        onSubmit={handlesubmit}
        className="group relative mt-3 flex flex-col gap-4 px-4 md:mx-auto md:min-w-[42rem] md:max-w-[42rem] md:rounded-lg md:rounded-b-none"
      >
        <div className="relative">
          <label
            htmlFor="name"
            className={`absolute left-2 top-1 text-[0.8125rem] text-[#536471] ${
              !profile.name ? "left-0 top-0" : null
            }`}
          >
            {t("name")}
          </label>
          <input
            value={profile.name}
            onChange={(event) => updateName(event.target.value)}
            id="name"
            type="text"
            className="h-14 w-full rounded-[4px] border border-[#ccd0d5] px-2 pt-4 text-[17px] focus:outline-none"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="lastName"
            className={`absolute left-2 top-1 text-[0.8125rem] text-[#536471] ${
              !profile.lastName ? "left-0 top-0" : null
            }`}
          >
            {t("lastName")}
          </label>
          <input
            value={profile.lastName}
            onChange={(event) => updateLastName(event.target.value)}
            id="lastName"
            type="text"
            className="h-14 w-full rounded-[4px] border border-[#ccd0d5] px-2 pt-4 text-[17px] focus:outline-none"
          />
        </div>

        <textarea
          placeholder="Bio"
          value={profile.bio}
          onChange={(event) => updateBio(event.target.value)}
          className="h-24 w-full resize-none rounded-md border border-[#ccd0d5] px-2 pt-2 focus:outline-none"
        ></textarea>

        <div className="relative">
          <label
            htmlFor="website"
            className={`absolute left-2 top-1 text-[0.8125rem] text-[#536471] ${
              !profile.website ? "left-0 top-0" : null
            }`}
          >
            {t("webSite")}
          </label>
          <input
            value={profile.website}
            onChange={(event) => updateWebsite(event.target.value)}
            id="website"
            type="url"
            className="h-14 w-full rounded-[4px] border border-[#ccd0d5] px-2 pt-4 text-[17px] focus:outline-none"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="location"
            className={`absolute left-2 top-1 text-[0.8125rem] text-[#536471] ${
              !profile.location ? "left-0 top-0" : null
            }`}
          >
            {t("location")}
          </label>
          <input
            value={profile.location}
            onChange={(event) => updateLocation(event.target.value)}
            id="location"
            type="text"
            className="h-14 w-full rounded-[4px] border border-[#ccd0d5] px-2 pt-4 text-[17px] focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsProfile;
