import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

export const sendResetPwdEmail = async (
  emailAddress: string,
  userId: string,
  role: string,
) => {
  try {
    let emailAPI = new TransactionalEmailsApi();

    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not defined");
    }

    (emailAPI as any).authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

    let message = new SendSmtpEmail();
    message.subject = "Reset Your Password's Account";
    message.htmlContent = `<html><head></head><body style="font-size: 16px;"><p>Your email has been successfully verified!</p><p>You can now reset your account's password.</p><p>Click this link to reset your password: <br></br> <a style="background-color: red; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;" href="${process.env.CLIENT_URL}/create-password?role=${role}&id=${userId}">Reset Password</a></p><p>If you didn't request this, please ignore this email.</p></body></html>`;
    message.sender = {
      name: "ESUT Lecturers' Evaluation App",
      email: "azuboguko@gmail.com",
    };
    message.to = [{ email: "azuboguko@gmail.com", name: "Kosiso Azubogu" }];
    // message.to = [{ email: emailAddress, name: "User" }];

    const response = await emailAPI.sendTransacEmail(message);

    if (response) {
      return "Email sent successfully!";
    }
  } catch (error) {
    console.log("Error sending email with PDF:", error);
    throw error;
  }
};
