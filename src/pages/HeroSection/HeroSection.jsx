import React from "react";
import styles from "./HeroSection.module.css";
import { motion } from "framer-motion";
import img from '../../assets/logo.png'
import { useAuthStore } from "../../store/authStore";
function HeroSection() {
    const { user } = useAuthStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.container}
        >
            <div className={styles.content}>
                <img src={img} />
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.title}
                >

                    <span style={{ color: '#eab308' }}>{user ? user.name : "Explore"} </span>    the best courses tailored for you
                </motion.h1>
                <p className={styles.subtitle}>
                    Discover, Learn and Upskill with our wide range of courses
                </p>
                <form className={styles.searchForm}>
                    <input type="text" placeholder="Search for a course..." />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.searchBtn}
                    >
                        Search
                    </motion.button>
                </form>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.exploreBtn}
                >
                    Explore Courses
                </motion.button>
            </div>
        </motion.div>
    );
}

export default HeroSection;
