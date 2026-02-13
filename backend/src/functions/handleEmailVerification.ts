import { Response } from "express";
import { sendResetPwdEmail } from "./sendResetPwdEmail";
import { sendCreatePwdEmail } from "./sendCreatePwdEmail";

export const handleEmailVerification = async (
  email: string,
  id: string,
  role: string,
  isPasswordReset: boolean,
  res: Response,
) => {
  const message = isPasswordReset
    ? await sendResetPwdEmail(email, id, role)
    : await sendCreatePwdEmail(email, id, role);

  console.log(message);

  const responseMessage = isPasswordReset
    ? "Your account has been verified for password reset"
    : "An email has been sent to your account for verification";

  return res.status(200).json({ message: responseMessage });
};
