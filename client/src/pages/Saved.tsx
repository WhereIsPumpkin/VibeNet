import { GoBackIcon } from "../components/icons";
import { useStore } from "../app/userStore";
import { usePostStore } from "../app/postSotre";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useEffect } from "react";

const Saved = () => {
  const { profile, getProfile } = useStore();
  const { posts, fetchPosts } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    fetchPosts();
  }, [getProfile, fetchPosts]);

  const savedPosts = posts.filter((post) => post.saves.includes(profile.id));

  return (
    <>
      <div className="flex items-center gap-9 px-4 h-14 border-b border-[#BDC5CD] font-rubik">
        <div
        className="md:cursor-pointer"
        onClick={() => navigate(-1)}>
          <GoBackIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-[#0F1319] font-semibold text-l">
            {profile.name} {profile.lastName}
          </span>
          <span className="text-[#546471] text-xxs">
            {savedPosts.length} Saved
          </span>
        </div>
      </div>

      <PostCard posts={savedPosts} profile={profile} />
    </>
  );
};

export default Saved;
