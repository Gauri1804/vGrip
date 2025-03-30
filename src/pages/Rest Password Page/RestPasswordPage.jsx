import React, { useState } from 'react'
import styles from './RestPasswordPage.module.css'
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from "react-router-dom";
import Input from '../../components/input/input';
import { toast } from 'react-toastify';
import ClockLoader from "react-spinners/ClockLoader";
const RestPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { restPassword, error, isLoading, message } = useAuthStore()
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };


    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div>
                <h2>Rest Password</h2>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />


                    <motion.button whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <ClockLoader size={22} color="#fff" /> : "Send New Password"}
                    </motion.button>

                </form>

            </div>
        </motion.div>
    )
}

export default RestPasswordPage