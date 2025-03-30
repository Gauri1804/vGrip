import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import styles from './LoginPage.module.css'
import ClockLoader from "react-spinners/ClockLoader";
import img from '../../assets/logo.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useAuthStore();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const navigate = useNavigate();


    const handleVisible = (e) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible)

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            console.log(`Login Successfully.. ${response}`);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.loginContainer}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.loginBox}
            >
                <img src={img} alt="logo" height={50} width={120} />

                <h2 className={styles.loginTitle}>Welcome Back 👋</h2>
                <p className={styles.loginSubtitle}>
                    Please enter your login details to continue.
                </p>

                <form onSubmit={handleLogin} className={styles.loginForm}>
                    {/* Email Input */}
                    <div className={styles.inputContainer}>
                        <MdEmail size={20} color="#007bff" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    {/* Password Input */}
                    <div className={styles.inputContainer}>
                        <RiLockPasswordFill size={20} color="#007bff" />
                        <input
                            type={isPasswordVisible ? "password" : "text"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                        <div onClick={handleVisible}>
                            {isPasswordVisible ? <FaEye size={18} color="#007bff" /> : <FaEyeSlash size={18} color="#007bff" />}
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <Link to="/forgot-password" className={styles.forgotPassword}>
                        Forgot password?
                    </Link>

                    {/* Error Message */}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.loginButton}
                    >
                        {isLoading ? <ClockLoader size={22} color="#fff" /> : "Login"}
                    </motion.button>
                </form>

                {/* Sign Up Link */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <p className={styles.signUpText}>Don't have an account?</p>
                    <Link to="/signup" className={styles.signUpLink}>
                        Sign Up
                    </Link>
                </div>
            </motion.div>
        </motion.div>

    );
};

export default LoginPage;
