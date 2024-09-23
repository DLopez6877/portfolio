import React, { useState } from 'react';
import './Form.css';



const Form = () => {
    const [emailData, setEmailData] = useState({
        email: '',
        message: '',
    });
    const [emailError, setEmailError] = useState('');
    const [isTouched, setIsTouched] = useState({
        email: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmailData({
            ...emailData,
            [name]: value,
        });

        if (name === 'email') {
            const isValidEmail = validateEmail(value);
            setIsFormValid(isValidEmail && emailData.message !== '');
        }

        if (name === 'message') {
            const isValidEmail = validateEmail(emailData.message);
            setIsFormValid(isValidEmail && emailData.message !== '');
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setIsTouched({
            ...isTouched,
            [name]: true,
        });
    };

    return (
        <div className='form-wrapper'>
            <h2>Contact Me</h2>
            <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                action="/thank-you"
            >
                <input type="hidden" name="form-name" value="contact" />

                <div className='form-field'>
                    <label>
                        Your Email:
                        <input
                            type="email"
                            name="email"
                            value={emailData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            className={emailError && isTouched.email ? 'errored' : ''}
                        />
                    </label>
                    {emailError && isTouched.email && (
                        <p className='error-message'>{emailError}</p>
                    )}
                </div>
                <div className='form-field'>
                    <label>
                        Message:
                        <textarea
                            name="message"
                            value={emailData.message}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={!isFormValid}>Send Email</button>
            </form>
            <p className='email'>DLopez6877@gmail.com</p>
        </div>
    );
};

export default Form;