import { create } from "zustand";
import axios from "axios";

export interface Post {
  _id: string;
  content: string;
  postImage: string;
  author: {
    _id: string;
    name: string;
    lastName: string;
    username: string;
    profilePic: string;
    coverPic: string;
  };
  createdAt: string;
  likes: string[];
  likeCount: number;
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
  saves: string[];
  saveCount: number;
}

interface PostState {
  posts: Post[];
  fetchPosts: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const response = await axios.get("/api/posts/getPosts");
      const postData: Post[] = response.data.posts;
      set({ posts: postData });
    } catch (error) {
      console.error(error);
    }
  },
}));
