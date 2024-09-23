import React, { useEffect, useRef } from 'react';
import './Home.css';
import ZoomableImage from './ZoomableImage';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import Bio from './Bio';
import Form from './Form';

const Home = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let camera, scene, renderer, controls, effect;
        let resolution = 28;
        let time = 0;
        const clock = new THREE.Clock();

        const init = () => {
            const container = containerRef.current;

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.set(-500, 500, 1500);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x2a2a2a);

            const light = new THREE.DirectionalLight(0xffffff, 3);
            light.position.set(0.5, 0.5, 1);
            scene.add(light);

            const pointLight = new THREE.PointLight(0xff7c00, 3, 0, 0);
            pointLight.position.set(0, 0, 100);
            scene.add(pointLight);

            const ambientLight = new THREE.AmbientLight(0x323232, 3);
            scene.add(ambientLight);

            const matteMaterial = new THREE.MeshPhongMaterial({ color: 0x9c0000, specular: 0x494949, shininess: 1 });
            effect = new MarchingCubes(resolution, matteMaterial, true, true, 100000);
            effect.position.set(0, 0, 0);
            effect.scale.set(700, 700, 700);
            effect.enableUvs = false;
            effect.enableColors = false;
            scene.add(effect);

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setAnimationLoop(animate);
            container.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 500;
            controls.maxDistance = 5000;

            window.addEventListener('resize', onWindowResize);
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const updateCubes = (time) => {
            effect.reset();
            const strength = 1.2;
            for (let i = 0; i < 10; i++) {
                const ballx = Math.sin(i + 1.26 * time) * 0.27 + 0.5;
                const bally = Math.abs(Math.cos(i + 1.12 * time)) * 0.77;
                const ballz = Math.cos(i + 1.32 * time) * 0.27 + 0.5;
                effect.addBall(ballx, bally, ballz, strength, 12);
            }
            effect.update();
        };

        const animate = () => {
            time += clock.getDelta() * 0.5;
            updateCubes(time);
            renderer.render(scene, camera);
        };

        init();

        return () => {
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);


    return (
        <div className='container'>
            <div className='three-wrapper'>
                <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>
            </div>
            <div className='grid-wrapper'>
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
            </div>
        </div>
    );
};

export default Home;
