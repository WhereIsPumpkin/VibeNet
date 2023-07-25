import {
  CloseIcon,
  ProfileIcon,
  ShareIcon,
  LogOutIcon,
  LangIcon,
} from "./icons";
import { useStore } from "../app/userStore";
import { useNavigate } from "react-router-dom";
import i18n from "../i18";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import defaultProfile from "../assets/blank-profile-picture-973460_960_720.webp";
import axios from "axios";

interface SideBarProps {
  profPic: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const backendURL = "https://vibenetapi.up.railway.app";

const SideBar: React.FC<SideBarProps> = ({ dialogRef }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useStore();
  const [language, setLanguage] = useState(i18n.language);
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col justify-between px-4 py-4">
      <div>
        <header className="flex max-w-[280px] items-center justify-between">
          <h1 className="f text-l font-medium">{t("accInfo")}</h1>
          <div
            className="md:cursor-pointer"
            onClick={() => {
              dialogRef.current ? dialogRef.current.close() : null;
            }}
          >
            <CloseIcon color={"currentColor"} />
          </div>
        </header>

        <div>
          <img
            onClick={() => navigate(profile.username)}
            src={
              (profile.profilePic && `${backendURL}${profile.profilePic}`) ||
              defaultProfile
            }
            alt="prof pic"
            className="mt-6 h-10 w-10 rounded-full object-cover md:cursor-pointer"
          />
          <h2 className="mt-1 font-semibold">
            {profile.name} {profile.lastName}
          </h2>
          <span className="text-basicFont font-normal text-[#536471]">
            @{profile.username}
          </span>
          <div className="mt-2 flex items-center gap-4">
            <span className="text-sm font-light text-[#536471]">
              <b className="font-semibold text-[#0F1419]">
                {profile?.following?.length || 0}
              </b>{" "}
              {t("following")}
            </span>
            <span className="text-sm font-light text-[#536471]">
              <b className="font-semibold text-[#0F1419]">
                {profile?.followers?.length || 0}
              </b>{" "}
              {t("follower")}
            </span>
          </div>
        </div>

        <div>
          <div
            onClick={() => navigate(`/${profile.username}`)}
            className="mt-8 flex items-center gap-6 md:cursor-pointer"
          >
            <ProfileIcon />
            <span className="text-xl font-medium"> {t("profile")}</span>
          </div>

          <div
            onClick={() => navigate(`/saved`)}
            className="mt-8 flex flex-grow items-center gap-6 md:cursor-pointer"
          >
            <ShareIcon fill={"none"} stroke={"currentColor"} />
            <span className="text-xl font-medium"> {t("savedd")}</span>
          </div>

          <div className="items-centers mt-8 flex gap-5 ">
            <LangIcon />
            <select
              value={language}
              onChange={handleLanguageChange}
              id="language"
              className=" w-32 rounded-md border-gray-300 text-xl  font-medium focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 md:cursor-pointer"
            >
              <option value="" disabled>
                {t("lang")}
              </option>
              <option value="eng">{t("eng")}</option>
              <option value="geo">{t("geo")}</option>
            </select>
          </div>
        </div>
      </div>

      <div
        onClick={async () => {
          await axios.post("/logout");

          window.location.reload();
        }}
        className="flex items-center justify-center gap-1 pb-4 font-semibold md:cursor-pointer"
      >
        <LogOutIcon />
        <span className="text-[#ff0000]">{t("logOut")}</span>
      </div>
    </div>
  );
};

export default SideBar;
