import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordComponent = () => {
  const [email, setEmail] = useState('');  
  const handleEmailSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Reset link sent to:', email);
    // In a real app, this would send a reset link to the email
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm">
        <div className="p-6 sm:p-8">
              <div className="border-b-2 border-gray-300 pb-4 mb-6">                  
                  <h1 className="text-xl sm:text-2xl font-normal text-gray-800">
                    Reset Password
                  </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Enter your email to receive a password reset link
                </p>
              </div>

              <form onSubmit={handleEmailSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      <span className="text-red-500">*</span> Email Address:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">
                      Reset Process:
                    </h3>
                    <ol className="text-xs text-blue-800 space-y-1.5 list-decimal list-inside">
                      <li>Enter your registered email address</li>
                      <li>Check your inbox for the reset link</li>
                      <li>Click the link to reset your password</li>
                      <li>Create a new password</li>
                    </ol>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link
                    to="/login"
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
}

export default ResetPasswordComponent;