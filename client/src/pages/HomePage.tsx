import { useStore } from "../app/userStore";

const HomePage = () => {
  const { profile } = useStore();
  return (
    <h1>
      Hello {profile.name} {profile.lastName} From HomePage as i know you are{" "}
      {profile.gender}
    </h1>
  );
};

export default HomePage;
