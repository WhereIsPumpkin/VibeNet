import { useRef, useState } from "react";
import axios from "axios";
import Register from "../components/Register";

const Login = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/api/login", { email, password });
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center bg-[#f0f2f5] font-rubik">
      <div className="ml-auto mr-auto flex h-full items-center overflow-y-hidden mobile:max-xl:flex-col mobile:max-xl:gap-32 mobile:max-xl:px-4 mobile:max-xl:py-8">
        <div className="w-50 mr-20 mobile:max-xl:mr-0 ">
          <h1 className="mb-4 text-4xl font-bold text-[#1877F2] mobile:max-xl:mb-0">
            VibeNet
          </h1>
          <p className="w-[500px] text-xl font-normal mobile:max-xl:hidden">
            "Connect, vibe, and explore the world on VibeNet – your ultimate
            social destination!"
          </p>
        </div>

        <div className="w-96 rounded-lg bg-white p-5 shadow-custom mobile:max-xl:max-w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              id="email"
              name="email"
              className="rounded-md border border-solid border-[#dddfe2] px-4 py-3 text-base focus:border-[#1877f2] focus:outline-none"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
            <input
              id="password"
              name="password"
              className="rounded-md border border-solid border-[#dddfe2] px-4 py-3 text-base focus:border-[#1877f2] focus:outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button
              type="submit"
              className="h-12 rounded-md bg-[#1877f2] text-xl font-medium text-white"
            >
              Log in
            </button>

            <hr />

            <button
              type="button"
              onClick={() =>
                dialogRef.current ? dialogRef.current.showModal() : null
              }
              className="mx-auto h-12 w-48 rounded-md bg-[#42b72a] font-medium text-white"
            >
              Create new account
            </button>
          </form>

          <dialog ref={dialogRef} className="rounded-md">
            <Register dialogRef={dialogRef} />
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Login;
