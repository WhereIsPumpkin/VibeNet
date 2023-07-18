import { useState, useRef, useEffect } from "react";
import { CloseIcon, SendIcon } from "./icons";
import { useStore } from "../app/userStore";
import axios from "axios";
import { usePostStore } from "../app/postSotre";
import moment from "moment";

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
      },
    ];
    commentCount: number;
  };
  onCommentPost: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  commentDialogRef,
  post,
  onCommentPost,
}) => {
  const [text, setText] = useState("");
  const { profile } = useStore();
  const { fetchPosts } = usePostStore();
  const scroll = useRef<HTMLDivElement>(null);

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
    <div className="h-full flex flex-col">
      <header className="flex justify-between px-4  pt-4 ">
        <h1 className="font-medium ">Comments</h1>

        <div
          onClick={() => {
            commentDialogRef.current ? commentDialogRef.current.close() : null;
          }}
        >
          <CloseIcon color={"currentColor"} />
        </div>
      </header>

      <hr className="bg-[#65676B] h-[1px]  w-full mt-2" />

      <main className="flex flex-col !flex-grow max-h-[93.5%] justify-between">
        <div className="flex flex-col gap-3 p-4 pb-0 flex-grow overflow-y-scroll">
          {post.comments.map((comment, index) => (
            <div ref={scroll} className="flex gap-2 items-start " key={index}>
              <div
                className="bg-cover bg-no-repeat bg-center w-7 h-7 rounded-full min-w-7 min-h-7 flex-shrink-0"
                style={{
                  backgroundImage: `url(http://localhost:6060${comment.user.profilePic})`,
                }}
              ></div>

              <div className="flex flex-col max-w-[20.125rem] break-words	">
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
            src={`http://localhost:6060${profile.profilePic}`}
            alt="prof pic"
            className="w-10 h-10 rounded-full "
          />

          <form onSubmit={handleSubmit} className="w-full relative">
            <input
              className="w-full rounded-2xxl bg-[#F0F2F5] focus:outline-none pl-3 pr-11 py-2 resize-none overflow-hidden"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind, ${profile.name}? `}
            />
            <button
              type="submit"
              className="absolute  top-1/2 -translate-y-1/2 right-3"
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
