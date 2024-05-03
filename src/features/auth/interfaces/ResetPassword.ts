export interface ResetPassword {
  email: string;
  token: string;
  password: string;
}

export type ResetPasswordGenerateToken = Pick<ResetPassword, 'email'>;

export type ResetPasswordValidateToken = Pick<ResetPassword, 'email' | 'token'>;
