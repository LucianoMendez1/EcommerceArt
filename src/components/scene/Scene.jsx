import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import textureImg from './textures/texture1.jpg';

const Scene = () => {
  const canvasRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 9000);
    camera.position.z = 100;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio * 2);

    // Object
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load(textureImg);
    const geometry = new THREE.SphereGeometry(32, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      map: planetTexture,
      side: THREE.BackSide,
    });
    materialRef.current = material; // Store the material reference
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.minDistance = 50;
    controls.maxDistance = 62;
    controls.update();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      mesh.rotation.y += 0.001;

      // Update material texture
      materialRef.current.map = planetTexture;
      materialRef.current.needsUpdate = true;

      // Render
      renderer.render(scene, camera);

      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas className="webgl" ref={canvasRef}></canvas>;
};

export default Scene;
