import { useStore } from "../app/userStore";
import { useRef } from "react";
import SideBar from "../components/SideBar";
import profPic from "../assets/blank-profile-picture-973460_960_720.webp";
import photoIcon from "../assets/PhotoIcon.png";
import { MenuIcon } from "../components/icons";

const HomePage = () => {
  const { profile } = useStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="relative font-rubik ">
      <div className="w-full flex px-4 h-14 items-center justify-between border-b border-[#BDC5CD] relative">
        <div className="w-[150px] ">
          <div
            onClick={() =>
              dialogRef.current ? dialogRef.current.showModal() : null
            }
          >
            <MenuIcon />
          </div>
        </div>

        <h1 className="text-[#1877F2] text-xl font-bold absolute left-2/4 -translate-x-1/2">
          VibeNet
        </h1>
      </div>

      <main className="bg-[#F0F2F5] h-screen py-5">
        <div className=" bg-white  px-4">
          <div className="flex items-center gap-2  border-b border-[#E4E6EB]  py-3">
            <img
              src={`http://localhost:6060${profile.profilePic}`}
              alt="prof pic"
              className="w-10 h-10 rounded-full "
            />

            <input
              className="w-full rounded-2xxl bg-[#F0F2F5] focus:outline-none px-3 py-2"
              type="text"
              placeholder={`What's on your mind, ${profile.name}? `}
            />
          </div>

          <div className=" text-basicFont text-[#656768] flex items-center justify-center h-">
            <div className="flex items-center justify-center gap-2 py-3 md:cursor-pointer">
              <img src={photoIcon} alt="photoIcon" /> Upload Photo
            </div>
          </div>
        </div>
      </main>

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
