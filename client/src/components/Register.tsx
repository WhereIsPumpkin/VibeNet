import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorIcon } from "./icons.tsx";

const Register = ({ dialogRef }) => {
  const navigate = useNavigate();
  const [showCustomGender, setShowCustomGender] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    gender: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/register", data);
      console.log(response.data);

      navigate("/verification", { state: { email: data.email } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col font-rubik gap-4">
      <div className="flex justify-between border-b">
        <div className="flex flex-col gap-1  pb-3">
          <h1 className="text-3xl font-semibold text-[#1c1e21]">Sign Up</h1>
          <p className="text-base font-normal text-[#606770]">
            It's quick and easy.
          </p>
        </div>
        <svg
          onClick={() => (dialogRef.current ? dialogRef.current.close() : null)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-3 gap-y-3"
      >
        <div className="relative">
          <input
            {...register("name")}
            type="text"
            placeholder="First name"
            className={`row-start-1 row-end-2 col-start-1 col-end-2 p-3 h-10 bg-[#f0f2f5] rounded-md border ${
              errors.name ? "border-red-500" : "border-[#ccd0d5]"
            } focus:outline-none text-base`}
          />
          {errors.name && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ErrorIcon />
            </div>
          )}
        </div>
        <div className="relative">
          <input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
            className={`row-start-1 row-end-2 col-start-2 col-end-3 p-3 h-10 bg-[#f0f2f5] rounded-md border ${
              errors.lastName ? "border-red-500" : "border-[#ccd0d5]"
            } focus:outline-none text-base`}
          />
          {errors.lastName && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ErrorIcon />
            </div>
          )}
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-3 relative">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={` w-full p-3 h-10 bg-[#f0f2f5] rounded-md border ${
              errors.email ? "border-red-500" : "border-[#ccd0d5]"
            } focus:outline-none text-base`}
          />
          {errors.email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ErrorIcon />
            </div>
          )}
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-3 relative">
          <input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className={`w-full p-3 h-10 bg-[#f0f2f5] rounded-md border ${
              errors.password ? "border-red-500" : "border-[#ccd0d5]"
            } focus:outline-none text-base`}
          />
          {errors.password && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ErrorIcon />
            </div>
          )}
        </div>

        <div className="row-start-4 row-end-5 col-start-1 col-end-3">
          <label htmlFor="gender" className="text-[#606770] text-xs">
            Gender:
          </label>
          <div className="flex gap-x-4 w-full justify-between">
            <div
              className={`border ${
                errors.gender ? "border-red-500" : "border-[#ccd0d5]"
              } flex items-center w-32 h-9 rounded-md px-3 justify-between`}
            >
              <label htmlFor="female">Female</label>
              <input
                className="p-3"
                type="radio"
                id="female"
                value="female"
                {...register("gender")}
              />
            </div>

            <div
              className={`flex items-center w-32 h-9 rounded-md px-3 justify-between border ${
                errors.gender ? "border-red-500" : "border-[#ccd0d5]"
              }`}
            >
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                value="male"
                onClick={() => setShowCustomGender(false)}
                {...register("gender")}
              />
            </div>

            <div
              className={`flex items-center w-32 h-9 rounded-md px-3 justify-between border ${
                errors.gender ? "border-red-500" : "border-[#ccd0d5]"
              }`}
            >
              <label htmlFor="custom">Custom</label>
              <input
                type="radio"
                id="custom"
                value="custom"
                {...register("gender")}
                onChange={(e) => setShowCustomGender(e.target.checked)}
              />
            </div>
          </div>
        </div>

        {showCustomGender && (
          <input
            {...register("gender")}
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
