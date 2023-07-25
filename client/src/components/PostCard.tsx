import { DeleteIcon, LikeIcon, CommentIcon, ShareIcon } from "./icons";
import moment from "moment";
import axios from "axios";
import { usePostStore } from "../app/postSotre";
import CommentSection from "./CommentSection";
import { useRef, useState } from "react";
import { Post } from "../app/postSotre";
import { Profile, useStore } from "../app/userStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PostCardProps {
  posts: Post[];
  profile: Profile;
}

const PostCard = ({ posts, profile }: PostCardProps) => {
  const { t } = useTranslation();
  const getProfile = useStore((state) => state.getProfile);
  const navigate = useNavigate();
  const { fetchPosts } = usePostStore();
  const commentDialogRef = useRef<HTMLDialogElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const handleCommentPost = (newComment: Comment) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedPost((prevPost: { comments: any }) => {
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

  const backendURL = "https://vibenetapi.up.railway.app";

  return (
    <div className="flex max-w-2xl flex-col-reverse gap-4 bg-[#F0F2F5] pt-2 md:mx-auto md:min-w-[42rem] md:rounded-lg md:pt-0 md:shadow-customPost">
      {posts.map((post, index) => {
        if (!post.author) {
          // handle the case where post.author is undefined
          return null;
        }

        return (
          <div
            className="flex gap-3 bg-white px-4 py-3 font-rubik shadow-sm md:rounded-lg"
            key={index}
          >
            <img
              onClick={() => navigate(`/${post.author.username}`)}
              src={`${backendURL}${post.author.profilePic}`}
              alt="prof pic"
              className="h-10 w-10 rounded-full object-cover md:cursor-pointer"
            />

            <div className="flex w-[19.125rem] flex-grow flex-col">
              <div className="flex max-w-full items-center gap-1 ">
                <h2
                  onClick={() => navigate(`/${post.author.username}`)}
                  className=" max-w-[9rem] truncate text-basicFont font-semibold text-[#0F1419] md:cursor-pointer"
                >
                  {post.author.name} {post.author.lastName}
                </h2>
                <span className="w-24 flex-grow truncate">
                  <span className=" w-[7.5rem] truncate text-basicFont text-[#65676B]">
                    @{post.author.username}
                  </span>
                </span>
                {post.author._id == profile.id && (
                  <div
                    className="md:cursor-pointer"
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
                <div className="flex flex-grow items-center gap-1">
                  <span className="text-xxs text-[#65676B]">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <p
                className={`break-words text-[#050505] ${
                  !post.postImage ? "mb-4" : null
                }`}
              >
                {post.content}
              </p>
              {post.postImage && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-[#CFD9DE]">
                  <img
                    src={`${backendURL}${post.postImage}`}
                    alt="post image"
                    className="w-full"
                  />
                </div>
              )}
              <div className="flex h-10 w-full items-center ">
                {post.likeCount > 0 && (
                  <span className="flex items-center gap-1 text-basicFont text-[#65676B]">
                    <LikeIcon stroke={"none"} fill={"#F91880"} />{" "}
                    {post.likeCount}
                  </span>
                )}
                <span className="ml-auto flex items-center gap-[0.625rem] text-basicFont text-[#65676B]">
                  <div
                    onClick={() => {
                      commentDialogRef.current
                        ? commentDialogRef.current.showModal()
                        : null;
                      setSelectedPost(post);
                    }}
                    className="flex items-center gap-1 md:cursor-pointer"
                  >
                    {post.commentCount} {t("comments")}
                  </div>
                  <div className="flex items-center gap-1">
                    {post.saveCount} {t("saves")}
                  </div>
                </span>
              </div>
              <hr />
              <div className="flex items-center justify-between px-2 pt-[0.625rem]">
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
                  className={`flex transform items-center gap-[0.3rem] text-basicFont font-medium transition-transform active:scale-95 md:cursor-pointer ${
                    post.likes.includes(profile.id)
                      ? "text-[#F33E58]"
                      : "text-[#65676B]"
                  }`}
                >
                  <LikeIcon
                    stroke={
                      post.likes.includes(profile.id) ? "none" : "#65676B"
                    }
                    fill={post.likes.includes(profile.id) ? "#F91880" : "none"}
                  />{" "}
                  {t("like")}
                </div>
                <div
                  className="flex items-center gap-[0.3rem] text-basicFont font-medium text-[#65676B] md:cursor-pointer"
                  onClick={() => {
                    commentDialogRef.current
                      ? commentDialogRef.current.showModal()
                      : null;
                    setSelectedPost(post);
                  }}
                >
                  <CommentIcon /> {t("comment")}
                </div>
                <div
                  onClick={async () => {
                    const postId = post._id;
                    const userId = profile.id;
                    try {
                      await axios.post(`/api/posts/save/${postId}/${userId}`);
                      getProfile();
                      fetchPosts();
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className={`flex items-center gap-[0.3rem] font-medium text-[#65676B] md:cursor-pointer `}
                >
                  <ShareIcon
                    stroke={
                      post.saves.includes(profile.id) ? "none" : "#65676B"
                    }
                    fill={post.saves.includes(profile.id) ? "#00BA7C" : "none"}
                  />{" "}
                  {post.saves.includes(profile.id) ? t("saved") : t("save")}
                </div>
              </div>
            </div>
            <dialog
              className="mb-0 mt-auto h-full min-w-full max-w-4xl animate-fade-up overflow-y-hidden rounded-t-3xl p-0 shadow-lg animate-duration-100 animate-ease-linear focus:outline-none md:mx-auto md:min-w-[56rem] md:rounded-lg md:shadow-customPost"
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
        );
      })}
    </div>
  );
};

export default PostCard;
