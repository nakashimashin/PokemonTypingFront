import React from "react";
import { useForm } from "react-hook-form";
import { validationSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

export const Auth = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    navigate("/home");
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-[30px] rounded-lg shadow-md w-full max-w-[400px] h-1/2 max-h-[400px]">
        <h1 className="text-[30px] text-center font-bold">ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full border border-black rounded-md p-[3px]"
            />
            <p className="text-red-500">
              {errors.name?.message as React.ReactNode}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="mail">Mail</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full border border-black rounded-md p-[3px]"
            />
            <p className="text-red-500">
              {errors.email?.message as React.ReactNode}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full border border-black rounded-md p-[3px]"
            />
            <p className="text-red-500">
              {errors.password?.message as React.ReactNode}
            </p>
          </div>
          <button
            className="w-full h-[50px] bg-blue-500 hover:bg-blue-300 text-[16px] rounded text-white mt-[15px]"
            type="submit"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
