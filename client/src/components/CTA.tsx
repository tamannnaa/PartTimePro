// components/CTA.tsx
import React from "react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct path

const CTA = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="text-center mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Ready to Start Your Journey?
      </h2>
      <div className="flex gap-4 justify-center">
        {isLoggedIn ? (
          <h2>Take the next step in your career - apply for jobs or share opportunities today!</h2>
        ) : (
          // Show "Register" and "Login" buttons if not logged in
          <>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-indigo-300 hover:bg-indigo-500 border-indigo-950"
            >
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-indigo-300 hover:bg-indigo-500 border-indigo-950"
            >
              <Link to="/login">Log In</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CTA;
