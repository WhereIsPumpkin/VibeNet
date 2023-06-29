import { useState } from "react";

const Register = () => {
  const [showCustomGender, setShowCustomGender] = useState(false);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCustomGender(event.target.value === "custom");
  };

  return (
    <div className="flex flex-col font-rubik gap-4">
      <div className="flex flex-col gap-1 border-b pb-3">
        <h1 className="text-3xl font-semibold text-[#1c1e21]">Sign Up</h1>
        <p className="text-base font-normal text-[#606770]">
          It's quick and easy.
        </p>
      </div>

      <form className="grid grid-cols-2 gap-x-3 gap-y-3">
        <input
          type="text"
          placeholder="First name"
          className="row-start-1 row-end-2 col-start-1 col-end-2 p-3 h-10 bg-[#f0f2f5] rounded-md border border-[#ccd0d5] focus:outline-none text-base"
        />
        <input
          type="text"
          placeholder="Last name"
          className="row-start-1 row-end-2 col-start-2 col-end-3 p-3 h-10 bg-[#f0f2f5] rounded-md border border-[#ccd0d5] focus:outline-none text-base"
        />
        <input
          type="email"
          placeholder="Email"
          className="row-start-2 row-end-3 col-start-1 col-end-3 p-3 h-10 bg-[#f0f2f5] rounded-md border border-[#ccd0d5] focus:outline-none text-base"
        />
        <input
          type="password"
          placeholder="New Password"
          className="row-start-3 row-end-4 col-start-1 col-end-3 p-3 h-10 bg-[#f0f2f5] rounded-md border border-[#ccd0d5] focus:outline-none text-base"
        />

        <div className="row-start-4 row-end-5 col-start-1 col-end-3">
          <label htmlFor="gender" className="text-[#606770] text-xs">
            Gender:
          </label>
          <div className="flex gap-x-4 w-full justify-between">
            <div className="flex items-center w-32 h-9 border border-[#ccd0d5] rounded-md px-3 justify-between">
              <label htmlFor="female">Female</label>
              <input
                className="p-3"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleGenderChange}
                required
              />
            </div>

            <div className="flex items-center w-32 h-9 border border-[#ccd0d5] rounded-md px-3 justify-between">
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={handleGenderChange}
                required
              />
            </div>

            <div className="flex items-center w-32 h-9 border border-[#ccd0d5] rounded-md px-3 justify-between">
              <label htmlFor="custom">Custom</label>
              <input
                type="radio"
                name="gender"
                id="custom"
                value="custom"
                onChange={handleGenderChange}
                required
              />
            </div>
          </div>
        </div>

        {showCustomGender && (
          <input
            type="text"
            placeholder="Gender (optional)"
            className="row-start-5 row-end-5 col-start-1 col-end-3 p-3 h-10 bg-[#f0f2f5] rounded-md border border-[#ccd0d5] focus:outline-none text-base"
          />
        )}

        <button className="row-start-6 row-end-6 col-start-1 col-end-3 bg-[#00a400] text-white w-48 h-9 font-semibold rounded-md mx-auto mt-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
