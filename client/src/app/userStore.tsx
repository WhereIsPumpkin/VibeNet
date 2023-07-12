import { create } from "zustand";
import axios from "axios";

interface userState {
  profile: {
    name: string;
    lastName: string;
    gender: string;
    username: string;
    location: string;
    website: string;
    bio: string;
    registrationDate: string;
    profilePic: string;
    coverPic: string;
  };
  getProfile: () => void;
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  updateName: (name: string) => void;
  updateLastName: (lastName: string) => void;
  updateWebsite: (website: string) => void;
  updateBio: (bio: string) => void;
  updateLocation: (location: string) => void;
}

export const useStore = create<userState>((set) => ({
  profile: {
    name: "",
    lastName: "",
    username: "",
    gender: "",
    location: "",
    website: "",
    bio: "",
    registrationDate: "",
    profilePic: "",
    coverPic: "",
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
  updateName: (name) =>
    set((state) => ({ profile: { ...state.profile, name } })),
  updateLastName: (lastName) =>
    set((state) => ({ profile: { ...state.profile, lastName } })),
  updateWebsite: (website) =>
    set((state) => ({ profile: { ...state.profile, website } })),
  updateBio: (bio) => set((state) => ({ profile: { ...state.profile, bio } })),
  updateLocation: (location) =>
    set((state) => ({ profile: { ...state.profile, location } })),
}));
