const Login = () => {
  return (
    <div className="bg-[#f0f2f5] w-full h-screen flex items-center font-rubik">
      <div className="mr-auto ml-auto flex items-center">
        <div className="w-50 mr-20">
          <h1 className="text-[#1877F2] text-4xl font-bold">VibeNet</h1>
          <p className="text-xl w-[500px] font-normal">
            "Connect, vibe, and explore the world on VibeNet – your ultimate
            social destination!"
          </p>
        </div>

        <div className="bg-white p-5 w-96 rounded-lg shadow-custom">
          <form className="flex flex-col gap-4">
            <input
              className="py-3 px-4 rounded-md text-base border border-solid border-[#dddfe2]"
              placeholder="Email"
              type="email"
            />
            <input
              className="py-3 px-4 rounded-md text-base border border-solid border-[#dddfe2]"
              placeholder="Password"
              type="password"
            />
            <button
              type="submit"
              className="bg-[#1877f2] text-white text-xl h-12 rounded-md font-medium"
            >
              Log in
            </button>
            <a href="#" className="text-[#1877f2] mx-auto">
              Forgot password?
            </a>

            <hr />

            <button className="bg-[#42b72a] w-48 mx-auto rounded-md h-12 text-white font-medium">
              Create new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
