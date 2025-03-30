
// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import styles from "./EmailVerifyPage.module.css";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import { ToastContainer, toast } from "react-toastify";

// export const EmailVerifyPage = () => {
//     const [code, setCode] = useState(["", "", "", "", "", ""]);
//     const inputRefs = useRef(new Array(6).fill(null));
//     const navigate = useNavigate();

//     const { error, isLoading, verifyEmail } = useAuthStore();

//     const handleChange = (index, value) => {
//         const newCode = [...code];

//         if (value.length > 1) {
//             // Handling paste event
//             const pastedCode = value.slice(0, 6).split("");
//             for (let i = 0; i < 6; i++) {
//                 newCode[i] = pastedCode[i] || "";
//             }
//             setCode(newCode);

//             // Focus on the last filled input or last input box
//             const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
//             const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
//             inputRefs.current[focusIndex]?.focus();
//         } else {
//             // Normal input entry
//             newCode[index] = value;
//             setCode(newCode);

//             if (value !== "" && index < 5) {
//                 inputRefs.current[index + 1]?.focus();
//             }
//         }
//     };

//     const handleKeyDown = (index, e) => {
//         if (e.key === "Backspace" && !code[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const verificationCode = code.join("");

//         try {
//             await verifyEmail(verificationCode);
//             toast.success("Email verified successfully!");
//             navigate("/");
//         } catch (err) {
//             toast.warning(err?.message || "Verification failed.");
//         }
//     };

//     useEffect(() => {
//         if (code.every((digit) => digit !== "")) {
//             handleSubmit(new Event("submit"));
//         }
//     }, [code]); // Added dependency array to prevent infinite calls

//     return (
//         <div>
//             <ToastContainer />
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h2>Verify your email</h2>
//                 <p>Enter the 6-digit code sent to your email address</p>
//                 <form onSubmit={handleSubmit}>
//                     <div className={styles.inputContainer}>
//                         {code.map((digit, index) => (
//                             <input
//                                 key={index}
//                                 ref={(el) => (inputRefs.current[index] = el)}
//                                 type="text"
//                                 maxLength={1}
//                                 value={digit}
//                                 onChange={(e) => handleChange(index, e.target.value)}
//                                 onKeyDown={(e) => handleKeyDown(index, e)}
//                                 className={styles.inputBox}
//                             />
//                         ))}
//                     </div>

//                 </form>
//             </motion.div>
//         </div>
//     );
// };



import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import ClockLoader from "react-spinners/ClockLoader";
import styles from './EmailVerifyPage.module.css'
export const EmailVerifyPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef(new Array(6).fill(null));
    const navigate = useNavigate();

    const { isLoading, verifyEmail } = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length > 1) {
            // Handling paste event
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last filled input or last input box
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            // Normal input entry
            newCode[index] = value;
            setCode(newCode);

            if (value !== "" && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");

        try {
            await verifyEmail(verificationCode);
            toast.success("Email verified successfully!");
            navigate("/");
        } catch (err) {
            toast.warning(err?.message || "Verification failed.");
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]); // Added dependency array to prevent infinite calls

    return (
        <div className={styles.container}>
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: "inline-block",
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <h2 style={{ marginBottom: "10px", color: "#333" }}>Verify your email</h2>
                <p style={{ marginBottom: "20px", color: "#666" }}>
                    Enter the 6-digit code sent to your email address
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    textAlign: "center",
                                    fontSize: "18px",
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                    outline: "none",
                                    transition: "border-color 0.3s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                            />
                        ))}
                    </div>
                    <motion.button
                        type="submit"
                        style={{
                            background: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            fontSize: "16px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "background 0.3s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? <ClockLoader size={22} color="#fff" /> : "Submit Code"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};
