import React, { useState, useEffect } from 'react';
import GlowingButton from './GlowingButton';
import { FullscreenIcon, CloseIcon, MagnifyingGlassIcon } from './icons';
import './ZoomableImage.css';

const ZoomableImage = ({ src, alt, title }) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomStyles, setZoomStyles] = useState({
        transform: 'scale(1)',
        transformOrigin: 'center center',
    });

    const openOverlay = (event) => {
        event.preventDefault();
        setIsOverlayOpen(true);
        document.body.classList.add('no-scroll');
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
        document.body.classList.remove('no-scroll');

        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen(); // Firefox
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen(); // Chrome, Safari, Opera
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen(); // IE/Edge
            }
        }
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const xPercent = ((e.pageX - left) / width) * 100;
        const yPercent = ((e.pageY - top) / height) * 100;

        setZoomStyles({
            transform: 'scale(2)',
            transformOrigin: `${xPercent}% ${yPercent}%`,
        });
    };

    const handleMouseLeave = () => {
        setZoomStyles((prevStyles) => ({
            ...prevStyles,
            transform: 'scale(1)',
        }));
    };

    const enterFullscreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    useEffect(() => {
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreenActive =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement;

            setIsFullscreen(Boolean(isFullscreenActive));
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    return (
        <div className="zoomable-image-container">
            <div className="image-wrapper">
                <img
                    src={src}
                    alt={alt}
                    style={zoomStyles}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                />
                <button className="icon-button" onClick={openOverlay}>
                    <MagnifyingGlassIcon />
                </button>
            </div>

            {isOverlayOpen && (
                <div className="image-overlay">
                    <div className="overlay-content">
                        {!isFullscreen && (
                            <div className="overlay-buttons-container">
                                <GlowingButton
                                    onClick={enterFullscreen}
                                    hoverText="Fullscreen"
                                    icon={<FullscreenIcon />}
                                />
                                <GlowingButton
                                    onClick={closeOverlay}
                                    hoverText="Close "
                                    icon={<CloseIcon />}
                                />
                            </div>
                        )}

                        <img className="overlay-image" src={src} alt={alt} />
                        <h3 className="overlay-title">{title}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZoomableImage;
