import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // Firebase configuration file
import "../styles/signup.css";

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    setLoading(true);
    setError(""); // Clear previous error message
    
    try {
      // Firebase SignUp
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("Signed up with:", data);
      navigate("/signin"); // Navigate to sign-in after successful sign-up
    } catch (error) {
      setError("Error signing up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="signup-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 
        className="signup-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        📝 Sign Up
      </motion.h2>

      {error && <p className="error">{error}</p>}

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required", minLength: 6 })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              validate: (value) => value === watch("password") || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>

        <motion.button 
          type="submit"
          className="signup-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </motion.button>
      </form>

      <motion.p 
        className="signin-link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Already have an account? <span onClick={() => navigate("/signin")}>Sign In</span>
      </motion.p>
    </motion.div>
  );
};

export default SignUp;
