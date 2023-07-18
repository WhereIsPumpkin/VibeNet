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
import CommentSection from "../components/CommentSection";
import { Post } from "../app/postSotre";

const HomePage = () => {
  const { profile } = useStore();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { posts, fetchPosts } = usePostStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const commentDialogRef = useRef<HTMLDialogElement>(null);
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

  const handleCommentPost = (newComment: Comment) => {
    setSelectedPost((prevPost) => {
      if (!prevPost) {
        return null;
      } else {
        return {
          ...prevPost,
          comments: [...prevPost.comments, newComment],
        };
      }
    });
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

              <div className="flex flex-col w-[19.125rem]">
                <div className="max-w-full flex gap-1 items-center">
                  <h2 className=" text-[#0F1419] text-basicFont font-semibold max-w-[9rem] truncate">
                    {post.author.name} {post.author.lastName}
                  </h2>

                  <span className="flex-grow truncate w-24">
                    <span className=" text-basicFont text-[#65676B] w-[7.5rem] truncate">
                      @{post.author.username}
                    </span>
                  </span>

                  {post.author._id == profile.id && (
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
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1 flex-grow">
                    <span className="text-xxs text-[#65676B]">
                      {moment(post.createdAt).fromNow()}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-[#050505]  break-words ${
                    !post.postImage ? "mb-4" : null
                  }`}
                >
                  {post.content}
                </p>

                {post.postImage && (
                  <div className="mt-3 border border-[#CFD9DE] rounded-2xl overflow-hidden">
                    <img
                      src={`http://localhost:6060${post.postImage}`}
                      alt="post image"
                      className="w-full"
                    />
                  </div>
                )}

                <div className="w-full flex  items-center h-10 ">
                  {post.likeCount > 0 && (
                    <span className="flex gap-1 items-center text-[#65676B] text-basicFont">
                      <LikeIcon stroke={"none"} fill={"#F91880"} />
                      {post.likeCount}
                    </span>
                  )}
                  <span className="flex gap-[0.625rem] items-center text-[#65676B] text-basicFont ml-auto">
                    <div className="flex gap-1 items-center">
                      {post.commentCount} comments
                    </div>

                    <div className="flex gap-1 items-center">0 shares</div>
                  </span>
                </div>

                <hr />

                <div className="pt-[0.625rem] px-2 flex justify-between items-center">
                  <div
                    onClick={async () => {
                      const postId = post._id;
                      const userId = profile.id;
                      try {
                        await axios.post(`/api/posts/like/${postId}/${userId}`);
                        fetchPosts();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    className={`flex gap-[0.3rem]  font-medium items-center text-basicFont md:cursor-pointer transform active:scale-95 transition-transform ${
                      post.likes.includes(profile.id)
                        ? "text-[#F33E58]"
                        : "text-[#65676B]"
                    }`}
                  >
                    <LikeIcon
                      stroke={
                        post.likes.includes(profile.id) ? "none" : "#65676B"
                      }
                      fill={
                        post.likes.includes(profile.id) ? "#F91880" : "none"
                      }
                    />{" "}
                    Like
                  </div>

                  <div
                    className="flex gap-[0.3rem] font-medium items-center text-[#65676B] text-basicFont"
                    onClick={() => {
                      commentDialogRef.current
                        ? commentDialogRef.current.showModal()
                        : null;
                      setSelectedPost(post);
                    }}
                  >
                    <CommentIcon />
                    Comment
                  </div>

                  <div className="flex gap-[0.3rem]  font-medium items-center text-[#65676B]">
                    <ShareIcon />
                    Share
                  </div>
                </div>
              </div>
              <dialog
                className="min-w-full mt-auto mb-0 rounded-t-3xl shadow-lg p-0 focus:outline-none  animate-fade-up animate-duration-100 animate-ease-linear overflow-y-hidden h-full"
                ref={commentDialogRef}
              >
                {selectedPost && (
                  <CommentSection
                    commentDialogRef={commentDialogRef}
                    post={selectedPost}
                    onCommentPost={handleCommentPost}
                  />
                )}
              </dialog>
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
