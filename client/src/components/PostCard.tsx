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

  return (
    <div className="bg-[#F0F2F5] flex gap-4 flex-col-reverse pt-2 max-w-2xl md:shadow-customPost md:mx-auto md:min-w-[42rem] md:rounded-lg md:pt-0">
      {posts.map((post, index) => {
        if (!post.author) {
          // handle the case where post.author is undefined
          return null;
        }

        return (
          <div
            className="bg-white px-4 py-3 shadow-sm flex gap-3 font-rubik md:rounded-lg"
            key={index}
          >
            <img
              onClick={() => navigate(`/${post.author.username}`)}
              src={`http://localhost:6060${post.author.profilePic}`}
              alt="prof pic"
              className="w-10 h-10 rounded-full object-cover md:cursor-pointer"
            />

            <div className="flex flex-col w-[19.125rem] flex-grow">
              <div className="max-w-full flex gap-1 items-center ">
                <h2
                onClick={() => navigate(`/${post.author.username}`)}
                className=" text-[#0F1419] text-basicFont font-semibold max-w-[9rem] truncate md:cursor-pointer">
                  {post.author.name} {post.author.lastName}
                </h2>
                <span className="flex-grow truncate w-24">
                  <span className=" text-basicFont text-[#65676B] w-[7.5rem] truncate">
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
                <div className="flex items-center gap-1 flex-grow">
                  <span className="text-xxs text-[#65676B]">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <p
                className={`text-[#050505] break-words ${
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
              <div className="w-full flex items-center h-10 ">
                {post.likeCount > 0 && (
                  <span className="flex gap-1 items-center text-[#65676B] text-basicFont">
                    <LikeIcon stroke={"none"} fill={"#F91880"} />{" "}
                    {post.likeCount}
                  </span>
                )}
                <span className="flex gap-[0.625rem] items-center text-[#65676B] text-basicFont ml-auto">
                  <div
                  onClick={() => {
                    commentDialogRef.current
                      ? commentDialogRef.current.showModal()
                      : null;
                    setSelectedPost(post);
                  }}
                  className="flex gap-1 items-center md:cursor-pointer">
                    {post.commentCount} {t("comments")}
                  </div>
                  <div className="flex gap-1 items-center">
                    {post.saveCount} {t("saves")}
                  </div>
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
                  className={`flex gap-[0.3rem] font-medium items-center text-basicFont md:cursor-pointer transform active:scale-95 transition-transform ${
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
                  className="flex gap-[0.3rem] font-medium items-center text-[#65676B] text-basicFont md:cursor-pointer"
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
                  className={`flex gap-[0.3rem] md:cursor-pointer font-medium items-center text-[#65676B] `}
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
              className="min-w-full mt-auto mb-0 rounded-t-3xl shadow-lg p-0 focus:outline-none animate-fade-up animate-duration-100 animate-ease-linear overflow-y-hidden h-full max-w-4xl md:shadow-customPost md:rounded-lg md:mx-auto md:min-w-[56rem]"
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
