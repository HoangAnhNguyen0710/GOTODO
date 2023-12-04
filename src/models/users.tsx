import { validate } from "email-validator";

export interface IUserModel {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  nationality: string;
  point: number;
  image?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Validate function: return true if every thing is fine else return an error
export function validateUser(
  user: Omit<IUserModel, "id">,
  password: string,
  passwordConfirm: string
): Error | boolean {
  const minLength = 6;
  const maxLength = 18;
  if (
    user.fullname.length === 0 ||
    user.nationality.length === 0 ||
    user.username.length === 0
  ) {
    throw new Error("フィールドは空であってはなりません");
  }
  if (!/^\d+$/.test(user.phone)) {
    throw new Error("電話番号には数字のみを含める必要があります");
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
