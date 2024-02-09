import React from "react";
import "./Auth.css";
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
    <div className="body">
      <div className="form-container">
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register("name")} />
          <p>{errors.name?.message as React.ReactNode}</p>
          <label htmlFor="mail">Mail</label>
          <input id="email" type="email" {...register("email")} />
          <p>{errors.email?.message as React.ReactNode}</p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          <p>{errors.password?.message as React.ReactNode}</p>

          <button className="login-button" type="submit">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
