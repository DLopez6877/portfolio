import React from 'react';
import './Home.css';
import ZoomableImage from './ZoomableImage';
import Bio from './Bio';
import Form from './Form';
import Three from './Three';


const Home = () => {

    return (
        <div className='container'>
            <Three></Three>
            <div className='pwrapper'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eaque autem similique quam maxime nisi, officiis sed officia voluptatibus voluptate? Perspiciatis ullam, non temporibus necessitatibus doloremque magni officia sequi mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eaque autem similique quam maxime nisi, officiis sed officia voluptatibus voluptate? Perspiciatis ullam, non temporibus necessitatibus doloremque magni officia sequi mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eaque autem similique quam maxime nisi, officiis sed officia voluptatibus voluptate? Perspiciatis ullam, non temporibus necessitatibus doloremque magni officia sequi mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eaque autem similique quam maxime nisi, officiis sed officia voluptatibus voluptate? Perspiciatis ullam, non temporibus necessitatibus doloremque magni officia sequi mollitia.</p>
            </div>
            {/* <div className='grid-wrapper'>
                <div className='contact-info'>
                    <h1>Daniel Lopez</h1>
                    <Bio></Bio>
                </div>
                <div id="resume-container">
                    <h2>Resume</h2>
                    <div id="resume-images">
                        <ZoomableImage src="/resume-page-1.webp" alt="Resume Page 1" title="Page 1" />
                        <ZoomableImage src="/resume-page-2.webp" alt="Resume Page 2" title="Page 2" />
                    </div>
                    <button
                        id="download-button"
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = '/Resume DLopez.pdf';
                            link.download = 'Resume DLopez.pdf';
                            link.click();
                        }}
                    >
                        Download Resume PDF
                    </button>
                </div>
                <Form></Form>
            </div> */}
        </div>
    );
};

export default Home;
