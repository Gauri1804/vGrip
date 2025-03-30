
import React, { useContext, useState } from 'react';
import styles from './Header.module.css';
import { IoClose } from "react-icons/io5";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GiSun } from "react-icons/gi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useAuthStore } from '../../store/authStore';
const Header = ({ showMenu, handleMenuToggle }) => {

    const { user, logout } = useAuthStore();

    const handleLogout = () => logout();


    return (
        <header className={styles.container} >
            <section>
                <h4>vGrip</h4>
            </section>

            <nav className={`${showMenu ? styles.mobileContainer || styles.show : styles.linkContainer} `}>
                <a>
                    <Link to="home" spy={true} smooth={true} offset={0} duration={500} onClick={showMenu ? handleMenuToggle : null}>Home</Link>
                </a>
                <a>
                    <Link to="about" spy={true} smooth={true} offset={-100} duration={500} onClick={showMenu ? handleMenuToggle : null}>About</Link>
                </a>
                <a>
                    <Link to="projects" spy={true} smooth={true} offset={-100} duration={500} onClick={showMenu ? handleMenuToggle : null}>Courses</Link>
                </a>


                <a onClick={handleLogout}>
                    <Link to="contact" spy={true} smooth={true} offset={-100} duration={500} onClick={showMenu ? handleMenuToggle : null}>Logout</Link>
                </a>

                {/* <a onClick={toggleTheme}>{theme === "light" ? <GiSun size={25} color="#FFA500" /> : <BsFillMoonStarsFill color="#A9A9A9" size={25} />}</a> */}

            </nav>

            <div className={styles.hamMenu} onClick={handleMenuToggle}>
                {showMenu ? (
                    <IoClose className={styles.menuIcon} />
                ) : (
                    <MdOutlineMenuOpen className={styles.menuIcon} />
                )}
            </div>
        </header >
    );
};


export default Header;
