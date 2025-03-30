import React, { useState } from 'react'
import styles from './ForgotPasswordPage.module.css'
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import ClockLoader from "react-spinners/ClockLoader";
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from "react-router-dom";
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setISSubmitted] = useState(false);
    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            await forgotPassword(email);
            alert("Check your email for password reset instructions.");
        } catch (error) {
            console.error("Forgot Password Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong.");
        }

        setISSubmitted(true);
    };



    return (
        <motion.div className={styles.forgotPasswordContainer} initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <motion.div className={styles.cardContainer}>
                <h2 className={styles.forgotTitle}>Forgot Password</h2>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <p className={styles.forgotSubtitle}>Enter your email address and we will send you a link to rest your password</p>
                        <div className={styles.inputContainer}>
                            <Mail size={20} color="#007bff" />
                            <input
                                className={styles.inputField}
                                type='email'
                                placeholder='email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>


                        <motion.button whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={styles.forgotButton}
                        >
                            {isLoading ? <ClockLoader size={22} color="#fff" /> : "Send Rest Link"}
                        </motion.button>
                    </form>
                ) : (
                    <div>
                        <motion.div initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                            <Mail />
                        </motion.div>
                        <p>
                            if your account exist for {email} you will  receive a password rest link shortly.
                        </p>
                    </div>
                )}


                <Link className={styles.backToLoginLink} to={"/login"}>
                    <ArrowLeft size={20} color="#007bff" />    Back to login
                </Link>


            </motion.div>
        </motion.div>
    )
}

export default ForgotPasswordPage