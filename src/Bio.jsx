import React from 'react';
import { motion } from 'framer-motion';
import './Bio.css';

const Bio = () => {
    return (
        <div className="bio-container">
            <img
                src="/headshot.png"
                alt="Your headshot"
                className="bio-headshot"
            />
            <motion.div
                className="bio-details"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <p>
                    I am a full-stack senior software engineer with over 7 years of experience, specializing in web development, front-end engineering, and UX/UI design. With a deep passion for creating visually engaging and user-friendly interfaces, I combine technical expertise with a strong sense of design to deliver high-quality digital experiences. I'm currently seeking new opportunities in related fields and am open to remote positions or roles based in Las Vegas. Whether you're looking for contract work or full-time and part-time employment, I'm excited to bring my skills and creativity to your next project.
                </p>
                <p>
                    Connect with me on{' '}
                    <a href="https://www.linkedin.com/in/dlopez6877/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Bio;
