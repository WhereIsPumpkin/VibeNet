import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorIcon } from "./icons.tsx";

interface RegisterProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
}

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  customGender?: string;
}

const Register: React.FC<RegisterProps> = ({ dialogRef }) => {
  const navigate = useNavigate();
  const [showCustomGender, setShowCustomGender] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    gender: yup.string().required(),
    username: yup.string().required(),
    customGender: yup.string().when("gender", {
      is: "custom",
      then: (schema) => schema.required(""),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/register", data);
      console.log(response.data);

      navigate("/verification", { state: { email: data.email } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 font-rubik">
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
          className="h-6 w-6 cursor-pointer"
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
        className="grid grid-cols-2 gap-x-3 gap-y-3 mobile:max-xl:flex mobile:max-xl:flex-col "
      >
        <div className="relative">
          <input
            {...register("name")}
            type="text"
            placeholder="First name"
            autoComplete="name"
            className={`col-start-1 col-end-2 row-start-1 row-end-2 h-10 rounded-md border bg-[#f0f2f5] p-3 mobile:max-xl:w-full ${
              errors.name ? "border-red-500" : "border-[#ccd0d5]"
            } text-base focus:outline-none`}
          />
          {errors.name && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
              <ErrorIcon />
            </div>
          )}
        </div>
        <div className="relative">
          <input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
            className={`col-start-2 col-end-3 row-start-1  row-end-2 h-10 rounded-md border bg-[#f0f2f5] p-3 mobile:max-xl:w-full ${
              errors.lastName ? "border-red-500" : "border-[#ccd0d5]"
            } text-base focus:outline-none`}
          />
          {errors.lastName && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
              <ErrorIcon />
            </div>
          )}
        </div>

        <div className="relative col-start-1 col-end-3 row-start-2 row-end-3">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            autoComplete="email"
            className={` h-10 w-full rounded-md border bg-[#f0f2f5] p-3 ${
              errors.email ? "border-red-500" : "border-[#ccd0d5]"
            } text-base focus:outline-none`}
          />
          {errors.email && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
              <ErrorIcon />
            </div>
          )}
        </div>
        <div className="relative col-start-1 col-end-3 row-start-3 row-end-4">
          <input
            {...register("username")}
            type="text"
            autoComplete="username"
            placeholder="Username"
            className={` h-10 w-full rounded-md border bg-[#f0f2f5] p-3 ${
              errors.username ? "border-red-500" : "border-[#ccd0d5]"
            } text-base focus:outline-none`}
          />
          {errors.username && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
              <ErrorIcon />
            </div>
          )}
        </div>
        <div className="relative col-start-1 col-end-3 row-start-4 row-end-5">
          <input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className={`h-10 w-full rounded-md border bg-[#f0f2f5] p-3 ${
              errors.password ? "border-red-500" : "border-[#ccd0d5]"
            } text-base focus:outline-none`}
          />
          {errors.password && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
              <ErrorIcon />
            </div>
          )}
        </div>

        <div className="col-start-1 col-end-3 row-start-5 row-end-6">
          <label htmlFor="female" className="text-xs text-[#606770]">
            Gender:
          </label>

          <div className="flex w-full justify-between gap-x-4">
            <label
              htmlFor="female"
              className={`border ${
                errors.gender ? "border-red-500" : "border-[#ccd0d5]"
              } flex h-9 w-32 items-center justify-between rounded-md px-3`}
            >
              Female
              <input
                className="p-3"
                type="radio"
                id="female"
                value="female"
                {...register("gender")}
                onChange={() => setShowCustomGender(false)}
              />
            </label>

            <label
              htmlFor="male"
              className={`flex h-9 w-32 items-center justify-between rounded-md border px-3 ${
                errors.gender ? "border-red-500" : "border-[#ccd0d5]"
              }`}
            >
              Male
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender")}
                onChange={() => setShowCustomGender(false)}
              />
            </label>

            <label
              htmlFor="custom"
              className={`flex h-9 w-32 items-center justify-between rounded-md border px-3 ${
                errors.gender ? "border-red-500" : "border-[#ccd0d5]"
              }`}
            >
              Custom
              <input
                value="custom"
                type="radio"
                id="custom"
                {...register("gender")}
                onChange={(e) => setShowCustomGender(e.target.checked)}
                checked={showCustomGender}
              />
            </label>
          </div>
        </div>

        {showCustomGender && (
          <input
            {...register("customGender")}
            type="text"
            placeholder="Gender (optional)"
            className="col-start-1 col-end-3 row-start-6 row-end-7 h-10 rounded-md border border-[#ccd0d5] bg-[#f0f2f5] p-3 text-base focus:outline-none"
          />
        )}

        <button className="row-end-8 col-start-1 col-end-3 row-start-7 mx-auto mt-4 h-9 w-48 rounded-md bg-[#00a400] font-semibold text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
