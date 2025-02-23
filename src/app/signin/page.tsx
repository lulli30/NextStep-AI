"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";

const SigninPage = () => {
  // State variables for form fields and messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle sign-in logic
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        setSuccessMessage("Login successful!");
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        const { message } = await response.json();
        setErrorMessage(message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            {/* Sign-in form container */}
            <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
              {/* Header */}
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Welcome Back!
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Please enter your login details.
              </p>

              {/* Success and Error Messages */}
              {successMessage && (
                <p className="mb-6 text-center text-green-500">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="mb-6 text-center text-red-500">{errorMessage}</p>
              )}

              {/* Sign-in Form */}
              <form onSubmit={handleSignIn} aria-live="polite">
                {/* Email Input */}
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-sm border-none bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:bg-[#2C303B]"
                    aria-required="true"
                  />
                </div>

                {/* Password Input with Visibility Toggle */}
                <div className="relative mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Your Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-sm border-none bg-[#f8f8f8] px-6 py-3 pr-10 text-base text-body-color outline-none focus:border-primary dark:bg-[#2C303B]"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 transition-transform duration-300 ease-in-out dark:text-gray-300"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Sign-in Button */}
                <div className="mb-6">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-9 py-4 text-base font-medium text-white hover:bg-primary/90"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>

              {/* Sign-up Redirect */}
              <p className="text-center text-base font-medium text-body-color">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
