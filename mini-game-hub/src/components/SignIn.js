import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/backgroundVideo.mp4";
import { auth } from "../firebase/config"; // Firebase configuration file
import "../styles/signin.css";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(""); // Clear any previous error

    try {
      // Firebase SignIn
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Signed in with:", data);
      navigate("/main"); // Navigate to the main game hub after successful sign-in
    } catch (error) {
      setError("Error signing in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="signin-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >


 {/* Background video element */}
      <div className="background-video">
        <motion.video
          src={backgroundVideo} // Replace with your own video URL
          autoPlay
          loop
          muted
          className="background-video-element"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </div>

      <motion.h2 
        className="signin-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Sign In
      </motion.h2>

      {error && <p className="error">{error}</p>}

      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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

        <motion.button 
          type="submit"
          className="signin-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>
      </form>

      <motion.p 
        className="signup-link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
      </motion.p>
    </motion.div>
  );
};

export default SignIn;
