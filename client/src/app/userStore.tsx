import { create } from "zustand";
import axios from "axios";

interface userState {
  profile: {
    id: string;
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
    id: "",
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
      const data = response.data;
      set((state) => ({
        profile: {
          ...state.profile,
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          username: data.username,
          gender: data.gender,
          location: data.location,
          website: data.website,
          bio: data.bio,
          registrationDate: data.registrationDate,
          profilePic: data.profilePic,
          coverPic: data.coverPic,
        },
      }));
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
