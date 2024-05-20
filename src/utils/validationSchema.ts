import { z } from "zod";

// export const validationSchema = z.object({
//   name: z.string().min(1, "名前は必須です"),
//   email: z
//     .string()
//     .min(1, "メールアドレスは必須です")
//     .email("正しい形式で入力してください"),
//   password: z.string().min(8, "パスワードは8文字以上で入力してください"),
// });

export const signUpSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("正しい形式で入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("正しい形式で入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});
