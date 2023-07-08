import { CloseIcon, ProfileIcon } from "./icons";
import { useStore } from "../app/userStore";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  profPic: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const SideBar: React.FC<SideBarProps> = ({ profPic, dialogRef }) => {
  const navigate = useNavigate();
  const { profile } = useStore();
  return (
    <div className="px-4 py-4 ">
      <div className="flex items-center justify-between min-w-[280px]">
        <h1 className="font-semibold">Account info</h1>
        <div
          onClick={() => {
            dialogRef.current ? dialogRef.current.close() : null;
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <div>
        <img
          src={profPic}
          alt="prof pic"
          className="w-10 h-10 rounded-full mt-6"
        />
        <h2 className="font-semibold mt-1">
          {profile.name} {profile.lastName}
        </h2>
        <span className="text-[#536471] font-normal text-basicFont">
          @{profile.username}
        </span>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[#536471] font-light text-sm">
            <b className="text-[#0F1419] font-semibold">0</b> Following
          </span>
          <span className="text-[#536471] font-light text-sm">
            <b className="text-[#0F1419] font-semibold">0</b> Followers
          </span>
        </div>
      </div>
      <div
        onClick={() => navigate(`/${profile.username}`)}
        className="flex gap-6 items-center mt-8"
      >
        <ProfileIcon />
        <span className="text-xl font-medium">Profile</span>
      </div>
    </div>
  );
};

export default SideBar;
