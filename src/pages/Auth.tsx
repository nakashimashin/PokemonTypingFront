import React from "react";
import "./Auth.css";
import { useForm } from "react-hook-form";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="body">
      <div className="form-container">
        <h1>ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "名前は必須です" })}
          />
          <p>{errors.name?.message as React.ReactNode}</p>
          <label htmlFor="mail">Mail</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Emailは必須です" })}
          />
          <p>{errors.email?.message as React.ReactNode}</p>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "パスワードは必須です",
              minLength: { value: 8, message: "8文字以上で入力してください" },
            })}
          />
          <p>{errors.password?.message as React.ReactNode}</p>

          <button className="login-button" type="submit">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
