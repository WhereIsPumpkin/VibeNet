import { useStore } from "../app/userStore";
import { usePostStore } from "../app/postSotre";
import { useRef, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import profPic from "../assets/blank-profile-picture-973460_960_720.webp";
import {
  MenuIcon,
  CloseIcon,
  PhotoIcon,
  DeleteIcon,
  LikeIcon,
  CommentIcon,
  ShareIcon,
} from "../components/icons";
import axios from "axios";
import moment from "moment";

const HomePage = () => {
  const { profile } = useStore();
  const { posts, fetchPosts } = usePostStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const postImageRef = useRef<HTMLInputElement>(null);

  moment.fn.fromNow = function () {
    const duration = moment().diff(this, "hours");
    return duration + "h";
  };

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

  console.log();
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

      <main className="bg-[#F0F2F5] h-full min-h-screen py-5 flex flex-col gap-4">
        <div className=" bg-white  px-4 shadow-sm">
          <div className="flex gap-2  border-b border-[#E4E6EB]  py-3">
            <img
              src={`http://localhost:6060${profile.profilePic}`}
              alt="prof pic"
              className="w-10 h-10 rounded-full "
            />

            <textarea
              ref={textAreaRef}
              className="w-full rounded-2xxl bg-[#F0F2F5] focus:outline-none px-3 py-2 resize-none overflow-hidden"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind, ${profile.name}? `}
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
                className="absolute top-1 right-1 w-8 h-8 bg-black/75 rounded-full flex items-center justify-center md:cursor-pointer"
              >
                <CloseIcon color={"white"} />
              </div>
            </div>
          )}

          <div className=" text-basicFont text-[#656768] flex items-center justify-center ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-evenly py-3  "
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
                className="flex gap-2 items-center md:cursor-pointer"
              >
                <PhotoIcon />
                Add Photo
              </label>

              <button
                key={text + image}
                disabled={!text && !image}
                type="submit"
                className={`${
                  !text && !image
                    ? "bg-gray-400"
                    : "bg-[#1877F2] hover:bg-blue-700"
                } text-white font-bold py-2 px-7 rounded-full`}
              >
                Vibe
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#F0F2F5] flex gap-4 flex-col-reverse">
          {posts.map((post, index) => (
            <div
              className="bg-white px-4 py-3 shadow-sm flex gap-3"
              key={index}
            >
              <img
                src={`http://localhost:6060${post.author.profilePic}`}
                alt="prof pic"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col w-full">
                <div className="w-full flex gap-1 items-center">
                  <h2 className="flex-grow text-[#0F1419] text-basicFont font-semibold max-w-[7.8rem] truncate">
                    {post.author.name} {post.author.lastName}
                  </h2>

                  <span className="flex-grow text-basicFont text-[#65676B] max-w-[7.5rem] truncate">
                    @{post.author.username}
                  </span>

                  <div className="flex items-center gap-1 flex-grow">
                    <span className="text-[#65676B] text-[10px]">·</span>

                    <span className="text-basicFont text-[#65676B]">
                      {moment(post.createdAt).fromNow(true)}
                    </span>
                  </div>

                  <div
                    onClick={async () => {
                      try {
                        await axios.delete(`/api/posts/delete/${post._id}`);
                        fetchPosts();
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </div>

                <p
                  className={`text-[#050505] ${
                    !post.postImage ? "mb-4" : null
                  }`}
                >
                  {post.content}
                </p>

                {post.postImage && (
                  <div className="mt-3 border border-[#CFD9DE] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={`http://localhost:6060${post.postImage}`}
                      alt="post image"
                      className="w-full"
                    />
                  </div>
                )}

                <hr />

                <div className="pt-[0.625rem] px-2 flex justify-between items-center">
                  <div
                    onClick={async () => {
                      const postId = post._id;
                      const userId = profile.id;
                      try {
                        const resp = await axios.post(
                          `/api/posts/like/${postId}/${userId}`
                        );
                        console.log(resp);
                        fetchPosts()
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    className={`flex gap-[0.3rem] items-center text-basicFont ${
                      post.likes.includes(profile.id) ? "text-[#1877F2]" : "text-[#65676B]"
                    }`}
                    
                  >
                    <LikeIcon
                      color={
                        post.likes.includes(profile.id) ? "#1877F2" : "#65676B"
                      }
                    />{" "}
                    
                    Like
                  </div>

                  <div className="flex gap-[0.3rem] items-center text-[#65676B] text-basicFont">
                    <CommentIcon />
                    Comment
                  </div>

                  <div className="flex gap-[0.3rem] items-center text-[#65676B]">
                    <ShareIcon />
                    Share
                  </div>
                </div>
              </div>
            </div>
          ))}
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
