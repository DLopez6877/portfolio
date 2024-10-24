import React, { useEffect, useRef } from 'react';
import './three.css';
import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';

const Three = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);

    useEffect(() => {
        let camera, scene, effect;
        let resolution = 28;
        let time = 0;
        const clock = new THREE.Clock();

        const init = () => {
            const container = containerRef.current;

            // Clear any existing canvas
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            if (rendererRef.current) {
                return;
            }

            // Set camera to match container's aspect ratio
            camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 10000);
            camera.position.set(-500, 500, 2500);

            scene = new THREE.Scene();
            scene.background = null;

            // Lighting setup...
            const light = new THREE.DirectionalLight(0xffffff, 3);
            light.position.set(0.5, 0.5, 1);
            scene.add(light);

            // MarchingCubes setup...
            const matteMaterial = new THREE.MeshPhongMaterial({ color: 0xffa61e, specular: 0x494949, shininess: 1 });
            effect = new MarchingCubes(resolution, matteMaterial, true, true, 100000);
            effect.position.set(0, 0, 0);
            effect.scale.set(700, 700, 700);
            scene.add(effect);

            // Renderer setup
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setAnimationLoop(animate);
            container.appendChild(renderer.domElement);

            rendererRef.current = renderer;

            window.addEventListener('resize', onWindowResize);
        };

        const onWindowResize = () => {
            const container = containerRef.current;
            const renderer = rendererRef.current;

            if (container && renderer) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
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
            rendererRef.current.render(scene, camera); // Use the stored renderer
        };

        init();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
        };
    }, []);

    return (
        <div className='three-container'>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default Three;
