import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";

const ResetPasswordComponentLecturer = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const data = await apiFetch(
        "/api/auth/verify?role=lecturer&forgotPassword=true",
        {
          method: "POST",
          body: { emailAddress },
        },
      );

      if (data) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setIsSubmitted(false);

    try {
      const data = await apiFetch(
        "/api/auth/verify?role=student&forgotPassword=true",
        {
          method: "POST",
          body: { emailAddress },
        },
      );

      if (data) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="border-b-2 border-gray-300 pb-4 mb-6">
            <h1 className="text-xl sm:text-2xl font-normal text-gray-800">
              Reset Lecturer Password
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Enter your email to receive a password reset link
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm text-gray-700 mb-2"
                  >
                    <span className="text-red-500">*</span> Lecturer Email
                    Address:
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    Password Reset Process:
                  </h3>
                  <ol className="text-xs text-blue-800 space-y-1.5 list-decimal list-inside">
                    <li>
                      Enter your email address and request the password reset
                      link
                    </li>
                    <li>Check your inbox for the passsword reset link</li>
                    <li>Click the link to create your password</li>
                    <li>Create your password to complete the process</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-2.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Sending Password Reset Link..."
                    : "Send Password Reset Link"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-green-900 mb-1">
                      Password Reset Link Sent!
                    </h3>
                    <p className="text-xs text-green-800">
                      We've sent a password reset link to{" "}
                      <span className="font-medium">{emailAddress}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Next Steps:
                </h3>
                <ol className="text-xs text-gray-700 space-y-1.5 list-decimal list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the password reset link in the email</li>
                  <li>You'll be redirected to create your password</li>
                  <li>Login with your new credentials</li>
                </ol>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs text-gray-600">
                  Didn't receive the email?
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Resend Password Reset Link
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/lecturer-login"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponentLecturer;
