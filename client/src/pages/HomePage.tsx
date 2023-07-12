import { useStore } from "../app/userStore";
import { useRef } from "react";
import SideBar from "../components/SideBar";
import profPic from "../assets/blank-profile-picture-973460_960_720.webp";

const HomePage = () => {
  const { profile } = useStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="relative font-rubik">
      <div className="w-full flex px-4 h-14 items-center justify-between border-b border-[#BDC5CD] relative">
        <div className="w-[150px]">
          <img
            src={`http://localhost:6060${profile.profilePic}`}
            alt="profile pic"
            className="w-8 h-8 rounded-full"
            onClick={() =>
              dialogRef.current ? dialogRef.current.showModal() : null
            }
          />
        </div>
        <h1 className="text-[#1877F2] text-xl font-bold absolute left-2/4 -translate-x-1/2">
          VibeNet
        </h1>
      </div>
      <dialog
        ref={dialogRef}
        className="m-0 p-0 min-h-screen focus:outline-none  animate-fade-right animate-duration-100 animate-ease-linear min-w-[280px]"
      >
        <SideBar profPic={profPic} dialogRef={dialogRef} />
      </dialog>
    </div>
  );
};

export default HomePage;
