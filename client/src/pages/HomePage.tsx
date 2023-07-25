import { useStore } from "../app/userStore";
import { usePostStore } from "../app/postSotre";
import { useRef, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import profPic from "../assets/blank-profile-picture-973460_960_720.webp";
import { MenuIcon, CloseIcon, PhotoIcon } from "../components/icons";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useTranslation } from "react-i18next";
import defaultProfile from "../assets/blank-profile-picture-973460_960_720.webp";
import Cookies from "js-cookie";

const backendURL = "https://vibenetapi.up.railway.app";

const HomePage = () => {
  const { t } = useTranslation();
  const { profile } = useStore();
  const { posts, fetchPosts } = usePostStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const postImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "2.5rem";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setImage(imageURL);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (text) {
      formData.append("content", text);
    }
    if (postImageRef.current?.files && postImageRef.current.files[0]) {
      formData.append("postImage", postImageRef.current.files[0]);
    }
    formData.append("author", profile.id);

    try {
      await axios.post("/api/posts/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setText("");
      setImage("");
      fetchPosts();
      if (document.getElementById("upload-button")) {
        (document.getElementById("upload-button") as HTMLInputElement).value =
          "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(Cookies.get());

  return (
    <div className="relative font-rubik ">
      <div className="relative flex h-14 w-full items-center justify-between border-b border-[#BDC5CD] px-4">
        <div className="w-[150px] ">
          <div
            onClick={() =>
              dialogRef.current ? dialogRef.current.showModal() : null
            }
          >
            <MenuIcon />
          </div>
        </div>

        <h1 className="absolute left-2/4 -translate-x-1/2 text-xl font-bold text-[#1877F2]">
          VibeNet
        </h1>
      </div>

      <main className="flex h-full min-h-screen flex-col gap-4 bg-[#F0F2F5] py-5">
        <div className=" max-w-2xl  bg-white px-4 shadow-sm md:mx-auto md:min-w-[42rem] md:rounded-lg md:shadow-customPost">
          <div className="flex gap-2  border-b border-[#E4E6EB]  py-3">
            <img
              src={
                (profile.profilePic && `${backendURL}${profile.profilePic}`) ||
                defaultProfile
              }
              alt="defaultProfile"
              className="h-10 w-10 rounded-full object-cover"
            />

            <textarea
              ref={textAreaRef}
              className="w-full resize-none overflow-hidden rounded-2xxl bg-[#F0F2F5] px-3 py-2 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`${t("whatMind")}, ${profile.name}? `}
            />
          </div>

          {image && (
            <div className="relative">
              <img src={image} alt="Selected" style={{ width: "100%" }} />
              <div
                onClick={() => {
                  setImage("");
                  if (document.getElementById("upload-button")) {
                    (
                      document.getElementById(
                        "upload-button"
                      ) as HTMLInputElement
                    ).value = "";
                  }
                }}
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 md:cursor-pointer"
              >
                <CloseIcon color={"white"} />
              </div>
            </div>
          )}

          <div className=" flex items-center justify-center text-basicFont text-[#656768] ">
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center justify-evenly py-3  "
            >
              <input
                type="file"
                ref={postImageRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                id="upload-button"
              />
              <label
                htmlFor="upload-button"
                className="flex items-center gap-2 md:cursor-pointer"
              >
                <PhotoIcon />
                {t("addPhoto")}
              </label>

              <button
                key={text + image}
                disabled={!text && !image}
                type="submit"
                className={`${
                  !text && !image
                    ? "bg-gray-400"
                    : "bg-[#1877F2] hover:bg-blue-700"
                } rounded-full px-7 py-2 font-bold text-white md:cursor-pointer`}
              >
                Vibe
              </button>
            </form>
          </div>
        </div>

        <PostCard posts={posts} profile={profile} />
      </main>

      <dialog
        ref={dialogRef}
        className="m-0 min-h-screen min-w-[280px] animate-fade-right  p-0 animate-duration-100 animate-ease-linear focus:outline-none"
      >
        <SideBar profPic={profPic} dialogRef={dialogRef} />
      </dialog>
    </div>
  );
};

export default HomePage;
