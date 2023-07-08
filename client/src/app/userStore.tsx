import { create } from "zustand";
import axios from "axios";

interface userState {
  profile: {
    name: string;
    lastName: string;
    gender: string;
    username: string;
  };
  getProfile: () => void;
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export const useStore = create<userState>((set) => ({
  profile: {
    name: "",
    lastName: "",
    username: "",
    gender: "",
  },
  getProfile: async () => {
    try {
      const response = await axios.get("/api/profile");
      set({ profile: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
