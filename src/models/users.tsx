import { validate } from "email-validator";

export interface User {
  id: string;
  username: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

// Validate function: return true if every thing is fine else return an error
export function validateUser(
  user: Omit<User, "id">,
  password: string,
  passwordConfirm: string
): Error | boolean {
  const minLength = 6;
  const maxLength = 18;
  if (
    user.username.length === 0
  ) {
    throw new Error("フィールドは空であってはなりません");
  }
  if (!validate(user.email)) {
    throw new Error(
      "電子メールが無効です。 別のメールアドレスを使用してください"
    );
  }
  if (password.length > maxLength || password.length < minLength) {
    throw new Error(
      "パスワードの長さが無効です。 パスワードは6～16文字にしてください"
    );
  }
  if (password !== passwordConfirm) {
    throw new Error("パスワードが一致しません! 再度確認してください");
  }
  return true;
}
