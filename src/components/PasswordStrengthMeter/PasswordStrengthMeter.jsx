import { Check, X } from 'lucide-react';
import React from 'react'

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters ", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
    ];


    return (
        <div>
            {criteria.map((item, index) => (
                <div key={item.label}>
                    {item.met ? (
                        <Check />
                    ) :
                        <X />
                    }
                    <span >
                        {item.label}
                    </span>
                </div>
            ))}

        </div>
    )

}

const PasswordStrengthMeter = () => {
    return (
        <div>PasswordStrengthMeter</div>
    )
}

export default PasswordStrengthMeter