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

interface SideBarProps {
  profPic: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

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
    <div className="flex flex-col justify-between h-screen px-4 py-4">
      <div>
        <header className="flex items-center justify-between max-w-[280px]">
          <h1 className="f font-medium text-l">{t("accInfo")}</h1>
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
            src={`http://localhost:6060${profile.profilePic}`}
            alt="prof pic"
            className="w-10 h-10 rounded-full object-cover mt-6"
          />
          <h2 className="font-semibold mt-1">
            {profile.name} {profile.lastName}
          </h2>
          <span className="text-[#536471] font-normal text-basicFont">
            @{profile.username}
          </span>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[#536471] font-light text-sm">
              <b className="text-[#0F1419] font-semibold">
                {profile?.following?.length || 0}
              </b>{" "}
              {t("following")}
            </span>
            <span className="text-[#536471] font-light text-sm">
              <b className="text-[#0F1419] font-semibold">
                {profile?.followers?.length || 0}
              </b>{" "}
              {t("follower")}
            </span>
          </div>
        </div>

        <div>
          <div
            onClick={() => navigate(`/${profile.username}`)}
            className="flex gap-6 items-center mt-8"
          >
            <ProfileIcon />
            <span className="text-xl font-medium"> {t("profile")}</span>
          </div>

          <div
            onClick={() => navigate(`/saved`)}
            className="flex gap-6 items-center mt-8 flex-grow"
          >
            <ShareIcon fill={"none"} stroke={"currentColor"} />
            <span className="text-xl font-medium"> {t("savedd")}</span>
          </div>

          <div className="flex items-centers gap-5 mt-8">
            <LangIcon />
            <select
              value={language}
              onChange={handleLanguageChange}
              id="language"
              className=" w-32 text-xl font-medium  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="" disabled selected>
                {t("lang")}
              </option>
              <option value="eng">{t("eng")}</option>
              <option value="geo">{t("geo")}</option>
            </select>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.reload();
        }}
        className="flex items-center gap-1 font-semibold pb-4 justify-center md:cursor-pointer"
      >
        <LogOutIcon />
        <span className="text-[#ff0000]">{t("logOut")}</span>
      </div>
    </div>
  );
};

export default SideBar;
