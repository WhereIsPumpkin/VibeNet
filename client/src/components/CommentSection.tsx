import { useRef, useState } from "react";
import { CloseIcon, SendIcon } from "./icons";
import { useStore } from "../app/userStore";
import axios from "axios";
import { usePostStore } from "../app/postSotre";

interface CommentSectionProps {
  commentDialogRef: React.RefObject<HTMLDialogElement>;
  post: {
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
      },
    ];
    commentCount: number;
  };
}

const CommentSection: React.FC<CommentSectionProps> = ({
  commentDialogRef,
  post,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const { profile } = useStore();
  const { fetchPosts } = usePostStore();

  if (!post) return null;

  return (
    <div className="flex justify-center flex-col pt-5 relativ h-full ">
      <h1 className="font-medium mx-auto">Comments</h1>
      <div
        className="absolute top-2 right-4"
        onClick={() => {
          commentDialogRef.current ? commentDialogRef.current.close() : null;
        }}
      >
        <CloseIcon color={"currentColor"} />
      </div>
      <hr className="bg-[#65676B] h-[1px]  w-full mt-2" />

      <div className="flex flex-col gap-3 p-4 max-h-[30rem] overflow-y-scroll">
        {post.comments.map((comment, index) => (
          <div className="flex gap-2 items-start " key={index}>
            <div
              className="bg-cover bg-no-repeat bg-center w-7 h-7 rounded-full min-w-7 min-h-7 flex-shrink-0"
              style={{
                backgroundImage: `url(http://localhost:6060${comment.user.profilePic})`,
              }}
            ></div>

            <div className="flex flex-col max-w-[20.125rem] break-words	">
              <span className="text-[0.7rem] text-[#65676B] ">
                {comment.user.username} • 2 days ago
              </span>

              <span className="text-basicFont text-[#050505]  ">
                {comment.content}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2  border-t border-[#E4E6EB] px-2 py-2">
        <img
          src={`http://localhost:6060${profile.profilePic}`}
          alt="prof pic"
          className="w-10 h-10 rounded-full "
        />

        <div className="w-full relative">
          <input
            className="w-full rounded-2xxl bg-[#F0F2F5] focus:outline-none pl-3 pr-11 py-2 resize-none overflow-hidden"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`What's on your mind, ${profile.name}? `}
            onClick={async () => {
              await axios.post(`/api/posts/comment/${post._id}/${profile.id}`, {
                content: text,
              });
              setText("");
              fetchPosts();
            }}
          />
          <div className="absolute  top-1/2 -translate-y-1/2 right-3">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
