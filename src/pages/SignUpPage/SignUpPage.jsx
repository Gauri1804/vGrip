import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import styles from './SignUpPage.module.css'
import { toast, ToastContainer } from "react-toastify";
import ClockLoader from "react-spinners/ClockLoader";
import img from '../../assets/logo.png'
const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setCPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const { signup, error, isLoading } = useAuthStore();

    const navigate = useNavigate();

    const handleVisible = (e) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible)

    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("password are not same...");
            return;
        }
        try {
            const response = await signup(email, password, name);
            console.log(`signUp Successfully.. ${response}`);
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.signupContainer}
        >
            <ToastContainer />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.signupBox}
            >

                <img src={img} alt="logo" height={50} width={120} />

                <h2 className={styles.signupTitle}>
                    Create Account
                </h2>
                <p className={styles.signupSubtitle}>
                    Please enter your details to continue.
                </p>
                <form onSubmit={handleSignUp} className={styles.signupForm}>
                    <div className={styles.inputContainer}>
                        <FaUser size={20} color="#007bff" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
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
                    <div className={styles.inputContainer}>
                        <RiLockPasswordFill size={20} color="#007bff" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <RiLockPasswordFill size={20} color="#007bff" />
                        <input
                            type={isPasswordVisible ? "password" : "text"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                        <div onClick={handleVisible}>
                            {isPasswordVisible ? <FaEye size={18} color="#007bff" /> : <FaEyeSlash size={18} color="#007bff" />}
                        </div>

                    </div>


                    {error && <p style={{ color: "#ff6b6b", fontSize: "14px", marginTop: "10px" }}>{error}</p>}

                    <motion.button
                        type="submit"
                        className={styles.signupButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? <ClockLoader size={22} color="#fff" /> : "SignUp"}
                    </motion.button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <p className={styles.loginText}>Already have an account?</p>
                    <Link to="/login" className={styles.loginLink}>
                        Log In
                    </Link>
                </div>
            </motion.div>

        </motion.div >
    );
};

export default SignUpPage;
