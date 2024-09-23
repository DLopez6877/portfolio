import React from 'react';
import './GlowingButton.css';

const GlowingButton = ({ onClick, hoverText, icon }) => {
    return (
        <button
            className="glowing-button cursor-pointer"
            onClick={onClick}
            aria-label={hoverText}
        >
            <div className='glowing-button-border'></div>
            <div className='glowing-button-border bottom'></div>
            <div className='hover-text'>{hoverText}</div>
            {icon}
        </button>
    );
};

export default GlowingButton;
