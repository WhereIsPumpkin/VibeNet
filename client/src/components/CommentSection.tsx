import { CloseIcon } from "./icons";

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
  return (
    <div className="flex justify-center flex-col pt-5 relative">
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

      <div className="flex flex-col gap-3 p-4">
        {post.comments.map((comment, index) => (
          <div className="flex gap-2 items-start" key={index}>
            <div
              className="bg-cover bg-no-repeat bg-center w-7 h-7 rounded-full min-w-7 min-h-7"
              style={{
                backgroundImage: `url(http://localhost:6060${comment.user.profilePic})`,
              }}
            ></div>

            <div className="flex flex-col">
              <span className="text-[0.7rem] text-[#65676B] ">
                {comment.user.username} • 2 days ago
              </span>

              <span className="text-basicFont text-[#050505]">
                {comment.content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
