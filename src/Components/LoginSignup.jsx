import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign In");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    console.log("Attempting login with:", { username, password: "***" });

    try {
      const response = await fetch("https://posapi-django.onrender.com/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }

      // Note: localStorage won't work in Claude.ai artifacts, but will work in your app
      try {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      } catch {
        console.log("Storage blocked in sandbox, but tokens received:", {
          access: data.access?.substring(0, 20) + "...",
          refresh: data.refresh?.substring(0, 20) + "..."
        });
      }
      
      setSuccess(`Login successful! 
Access Token: ${data.access?.substring(0, 30)}...
Refresh Token: ${data.refresh?.substring(0, 30)}...`);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("https://posapi-django.onrender.com/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = typeof data === 'object' 
          ? Object.values(data).flat().join(", ")
          : "Registration failed";
        throw new Error(errorMsg);
      }

      setSuccess("Registration successful! Please sign in.");
      setAction("Sign In");
      setPassword("");

    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("https://posapi-django.onrender.com/api/password-reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      setSuccess("Password reset email sent! Check your inbox.");
      
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (action === "Sign In") {
      handleLogin(e);
    } else if (action === "Sign Up") {
      handleSignup(e);
    } else if (action === "Forgot Password") {
      handleForgotPassword(e);
    }
  };

  const switchAction = (newAction) => {
    setAction(newAction);
    setError("");
    setSuccess("");
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 rounded-full p-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {action}
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {action !== "Forgot Password" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              />
            </div>
          )}

          {(action === "Sign Up" || action === "Forgot Password") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              />
            </div>
          )}

          {action !== "Forgot Password" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              action
            )}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm">
          {action === "Sign In" && (
            <>
              <button
                type="button"
                onClick={() => switchAction("Forgot Password")}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => switchAction("Sign Up")}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
          
          {(action === "Sign Up" || action === "Forgot Password") && (
            <button
              type="button"
              onClick={() => switchAction("Sign In")}
              className="text-blue-600 hover:underline mx-auto"
            >
              Already have an account? Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;