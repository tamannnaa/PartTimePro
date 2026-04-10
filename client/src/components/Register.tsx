// Register.tsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import { API_ENDPOINTS } from "../config";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"job_seeker" | "employer">("job_seeker");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.message || "Failed to register. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length >= 8 ? "good" : password.length >= 4 ? "fair" : "weak";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              PartTimePro
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Join Us Today! 🎉</h1>
          <p className="text-slate-400">Start your journey to flexible work opportunities</p>
        </div>

        <Card className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-xl text-white">
              <UserPlus size={24} className="text-blue-400" />
              Create Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={48} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome to PartTimePro! ✨</h3>
                <p className="text-slate-400 mb-4">Your account has been created successfully.</p>
                <p className="text-sm text-slate-500">Redirecting to login page...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <Input
                      type="text"
                      placeholder="john_doe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      required
                      minLength={3}
                    />
                  </div>
                  <p className="text-xs text-slate-500">Min. 3 characters, alphanumeric</p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Min. 8 characters</p>
                    <div className="flex gap-1">
                      <div className={`h-1 w-6 rounded-full transition-colors ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'fair' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("job_seeker")}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        role === "job_seeker"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">Job Seeker</p>
                      <p className="text-xs text-slate-400">Find & apply for jobs</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("employer")}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        role === "employer"
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">Employer</p>
                      <p className="text-xs text-slate-400">Post & hire workers</p>
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    required
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 accent-indigo-600 cursor-pointer"
                  />
                  <p className="text-xs text-slate-400">
                    I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
                  </p>
                </div>

                {/* Register Button */}
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>
            )}

            {!success && (
              <>
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-500">or</span>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-slate-400 mb-3">
                    Already have an account? 👤
                  </p>
                  <Link 
                    to="/login" 
                    className="inline-block w-full"
                  >
                    <Button className="w-full bg-slate-700/50 hover:bg-slate-700 text-blue-400 border border-slate-600 font-semibold transition-all">
                      Log In Instead
                    </Button>
                  </Link>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-center text-xs text-slate-500">
                    🔒 Your data is secure and encrypted
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Back to Home */}
        {!success && (
          <div className="text-center mt-6">
            <Link to="/" className="text-slate-400 hover:text-white transition text-sm">
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;