import React from 'react'
import styles from './input.module.css';
function Input({ icon: Icon, ...props }) {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <Icon className={styles.icon} />
            </div>
            <input
                {...props}
                className={styles.input}
            />
        </div>
    )
}

export default Input