import { useState, useRef, useEffect } from "react";
import { CloseIcon, SendIcon } from "./icons";
import { useStore } from "../app/userStore";
import axios from "axios";
import { usePostStore } from "../app/postSotre";
import moment from "moment";
import { useTranslation } from "react-i18next";
import defaultProfile from "../assets/blank-profile-picture-973460_960_720.webp";

interface CommentSectionProps {
  commentDialogRef: React.RefObject<HTMLDialogElement>;
  post: {
    _id: string;
    comments: [
      {
        user: {
          _id: string;
          name: string;
          lastName: string;
          username: string;
          profilePic: string;
        };
        content: string;
        createdAt: Date;
      }
    ];
    commentCount: number;
  };
  onCommentPost: (comment: Comment) => void;
}

const backendURL = "https://vibenetapi.up.railway.app";

const CommentSection: React.FC<CommentSectionProps> = ({
  commentDialogRef,
  post,
  onCommentPost,
}) => {
  const [text, setText] = useState("");
  const { profile } = useStore();
  const { fetchPosts } = usePostStore();
  const scroll = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [onCommentPost]);

  if (!post) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.post(
      `/api/posts/comment/${post._id}/${profile.id}`,
      {
        content: text,
      }
    );
    setText("");
    fetchPosts();
    onCommentPost(res.data.comment);
  };

  return (
    <div className="flex h-full flex-col ">
      <header className="flex justify-between px-4  pt-4 ">
        <h1 className="font-medium ">{t("commentss")}</h1>

        <div
          className="md:cursor-pointer"
          onClick={() => {
            commentDialogRef.current ? commentDialogRef.current.close() : null;
          }}
        >
          <CloseIcon color={"currentColor"} />
        </div>
      </header>

      <hr className="mt-2 h-[1px]  w-full bg-[#65676B]" />

      <main className="flex max-h-[93.5%] !flex-grow flex-col justify-between">
        <div className="flex flex-grow flex-col gap-3 overflow-y-scroll p-4 pb-0">
          {post.comments.map((comment, index) => (
            <div ref={scroll} className="flex items-start gap-2 " key={index}>
              <div
                className="min-w-7 min-h-7 h-7 w-7 flex-shrink-0 rounded-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${backendURL}${comment.user.profilePic})`,
                }}
              ></div>

              <div className="flex max-w-[20.125rem] flex-col break-words	">
                <span className="text-[0.7rem] text-[#65676B] ">
                  @{comment.user.username} •{" "}
                  {moment(comment.createdAt).fromNow()}
                </span>

                <span className="text-basicFont text-[#050505]  ">
                  {comment.content}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 border-t border-[#E4E6EB] p-2 ">
          <img
            src={
              (profile.profilePic && `${backendURL}${profile.profilePic}`) ||
              defaultProfile
            }
            alt="prof pic"
            className="h-10 w-10 rounded-full object-cover"
          />

          <form onSubmit={handleSubmit} className="relative w-full">
            <input
              className="w-full resize-none overflow-hidden rounded-2xxl bg-[#F0F2F5] py-2 pl-3 pr-11 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`${t("whatMind")}, ${profile.name}? `}
            />
            <button
              type="submit"
              className="absolute  right-3 top-1/2 -translate-y-1/2"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CommentSection;
