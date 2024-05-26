import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { signUpSchema, signInSchema } from "../utils/validationSchema";
import { authStore } from "../store/authStore";

interface LoginForm {
  name?: string;
  email: string;
  password: string;
}

export const Auth = () => {
  const navigate = useNavigate();
  const setIsAuth = authStore((state) => state.setIsAuth);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
  });


  const onSubmit = async (data: LoginForm) => {
    setError(null);
    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: data.name,
        });
        console.log('User signed up:', user);
        setIsAuth(true);
        navigate("/home");
      } catch (err) {
        setError((err as Error).message);
        console.error('Error signing up:', err);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        console.log('User signed in:', user);
        setIsAuth(true);
        navigate("/home");
      } catch (err) {
        setError((err as Error).message);
        console.error('Error signing in:', err);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-[30px] rounded-lg shadow-md w-full max-w-[400px] h-1/2 max-h-[400px]">
        <h1 className="text-[30px] text-center font-bold">{isSignUp ? 'サインアップ' : 'サインイン'}</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
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
          )}
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
        <div className="h-[50px] mt-7 text-center cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'サインイン' : 'サインアップ'}
        </div>
      </div>
    </div>
  );
};
