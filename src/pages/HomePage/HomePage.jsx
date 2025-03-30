import React from "react";
import { useAuthStore } from "../../store/authStore";
import { formatDate } from "../../components/utils/date";
import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import CoursesPage from "../Courses/CoursesPage";

const HomePage = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => logout();

    return (
        <motion.div style={styles.container}>
            <Header />
            <HeroSection />
            <CoursesPage />

            <motion.div style={styles.profileCard}>
                <h3 style={styles.sectionTitle}>Profile Information</h3>
                {user ? (
                    <>
                        <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>{user.name}</p>
                        <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>{user.email}</p>
                    </>
                ) : (
                    <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>Loading user data...</p>
                )}

                <motion.div style={styles.accountActivity}>
                    <h3 style={styles.activityTitle}>Account Activity</h3>
                    <p>
                        <strong>Joined: </strong>
                        {user ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) : "Loading..."}
                    </p>
                    <p>
                        <strong>Last Login: </strong>
                        {user?.lastLogin ? formatDate(user.lastLogin) : "You just signed up..."}
                    </p>
                </motion.div>
                <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={styles.logoutButton}
                >
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

const styles = {
    container: {
        margin: 0,
        color: "#333",

    },
    header: {
        textAlign: "center",
        color: "#007BFF",
        fontSize: "24px",
        marginBottom: "15px",
    },
    profileCard: {
        maxWidth: "400px",
        margin: "20px auto",
        marginTop: '100px',
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
        borderBottom: "2px solid #007BFF",
        paddingBottom: "5px",
        marginBottom: "10px",
        fontSize: "18px",
    },
    userName: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    userEmail: {
        fontSize: "14px",
        color: "#555",
        marginBottom: "10px",
    },
    accountActivity: {
        marginTop: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: "#fff",
    },
    activityTitle: {
        color: "#28A745",
        marginBottom: "5px",
        fontSize: "16px",
    },
    logoutButton: {
        display: "block",
        width: "100%",
        marginTop: "15px",
        padding: "10px",
        background: "#007BFF",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s ease",
    },
};

export default HomePage;