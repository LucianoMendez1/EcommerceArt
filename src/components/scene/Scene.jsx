import React, { useEffect, useRef, useState } from 'react';
import '../home/home.css';
import planetTexture from './textures/texture1.jpg';
import planetTexture2 from './textures/texture2.jpg';
import planetTexture3 from './textures/texture3.jpg';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Scene = () => {
  const canvas_scene = useRef(null);
  const textTitle = useRef(null);
  const glitchPass = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvas_scene.current;

    // SCENE

    const scene = new THREE.Scene();

    // RESIZE

    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const handleWindowResize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;

      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();

      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleWindowResize);

    //CAMERA

    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
    camera.position.z = 1;
    camera.position.x = -7;

    scene.add(camera);

    //RENDER

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false,
      /* alpha:true */
    });

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //LIGHTS

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    //TEXTURES

    const textureLoader = new THREE.TextureLoader();
    const planetMap = textureLoader.load(planetTexture);
    const planetMap2 = textureLoader.load(planetTexture2);
    const planetMap3 = textureLoader.load(planetTexture3);

    planetMap.minFilter = THREE.LinearFilter;
    planetMap.magFilter = THREE.LinearFilter;

    planetMap2.minFilter = THREE.LinearFilter;
    planetMap2.magFilter = THREE.LinearFilter;

    planetMap3.minFilter = THREE.LinearFilter;
    planetMap3.magFilter = THREE.LinearFilter;

    //PLANET

    const planetGeometry = new THREE.SphereGeometry(16, 32, 16);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetMap,
      side: THREE.BackSide,
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planetMesh);

    //POST-PROCESSING

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const adaptiveToneMappingPass = new AdaptiveToneMappingPass(true, 0.2);
    composer.addPass(adaptiveToneMappingPass);

    const shaderVignette = VignetteShader;

    const effectVignette = new ShaderPass(shaderVignette);
    effectVignette.uniforms['offset'].value = 0.3;
    effectVignette.uniforms['darkness'].value = 7;

    composer.addPass(effectVignette);

    //HOVER GLITCH PASS POST-PROCESSING

    const textTitleElement = textTitle.current;

    glitchPass.current = new GlitchPass();
    composer.addPass(glitchPass.current);
    glitchPass.current.enabled = false;

    let cursor = document.getElementById('circle_mouse');

    const handleHover = () => {
      glitchPass.current.enabled = true;

      document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + 'px';
        cursor.style.opacity = 1;
        cursor.style.top = y + 'px';
      });
    };

    const handleExitHover = () => {
      glitchPass.current.enabled = false;
      document.addEventListener('mousemove', function (e) {
        cursor.style.opacity = 0;
      });
    };

    const element = textTitleElement;
    element.addEventListener('mouseenter', handleHover);
    element.addEventListener('mouseleave', handleExitHover);

    //EFECTO CLICK SOSTENIDO
    let isMouseDown = false;
    let timeoutId;
    let textureIndex = 1; // Variable para mantener el índice de la textura actual

    const imgTextures = [planetMap, planetMap2, planetMap3];

    let isTextureChangeInProgress = false;

    const handleMouseDown = () => {
      if (isMouseDown) {
        return;
      }

      isMouseDown = true;
      glitchPass.current.enabled = true;
      glitchPass.current.goWild = true;

      setProgress(0);

      const intervalId = setInterval(() => {
        if (isMouseDown) {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + 1;
            if (newProgress >= 100 && !isTextureChangeInProgress) {
              isTextureChangeInProgress = true;
              clearInterval(intervalId);
              clearTimeout(timeoutId);

              const updatedMaterial = planetMaterial.clone();
              updatedMaterial.map = imgTextures[textureIndex];
              planetMesh.material = updatedMaterial;

              glitchPass.current.goWild = false;

              textureIndex++;

              if (textureIndex >= imgTextures.length) {
                textureIndex = 0;
              }

              console.log(textureIndex);

              setTimeout(() => {
                isTextureChangeInProgress = false;
              }, 1000);
            }
            return newProgress;
          });
        }
      }, 13);
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      clearTimeout(timeoutId);
      setProgress(0);
      glitchPass.current.enabled = false;
      glitchPass.current.goWild = false;
      cursor.style.borderColor = 'white';
    };

    const removeEventListeners = () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('touchstart', handleMouseDown);
      element.removeEventListener('touchend', handleMouseUp);
    };

    const addEventListeners = () => {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('touchstart', handleMouseDown);
      element.addEventListener('touchend', handleMouseUp);
    };

    addEventListeners();

    // ORBIT CONTROLS

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    // ANIMATE

    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const elapsedTime = time;

      planetMesh.rotation.y = elapsedTime / 30;

      controls.update();
      composer.render();
      window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      removeEventListeners();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="home-container">
      <canvas className="webgl opacity-100 !rounded-[70px] " ref={canvas_scene}></canvas>

      <div ref={textTitle} className="absolute top-[36.6rem] cursor-none select-none flex justify-center items-center flex-col ">
        <h1 className="text_title text-[17vw] text-[#ffffff] font-extrabold tracking-[-.4rem]"> Cambiar fondo </h1>
      </div>
      <div id="circle_mouse">
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            rotation: 0.25,
            // Colors
            pathColor: `rgba(255, 255, 255, ${progress / 100})`,
          })}
        />
      </div>

      {/* icons top */}
      <div className="rec flex justify-center items-center gap-2">
        <div className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 41 41" fill="none">
            <path d="M27.17 27.17C26.1 34.5 23.4 39.71 20.23 39.71C16.13 39.71 12.8 30.99 12.8 20.23C12.8 9.47 16.13 0.75 20.23 0.75C24.33 0.75 27.66 9.47 27.66 20.23C27.66 20.88 27.65 21.51 27.62 22.14" stroke="white" strokeWidth="2" />
            <path d="M31.39 18.84L27.65 22.57L23.92 18.84" stroke="white" strokeWidth="2" />
            <path d="M13.29 27.17C5.96 26.1 0.75 23.4 0.75 20.23C0.75 16.13 9.47 12.8 20.23 12.8C30.99 12.8 39.71 16.12 39.71 20.23C39.71 24.34 30.99 27.66 20.23 27.66C19.58 27.66 18.95 27.65 18.32 27.62" stroke="white" strokeWidth="2" />
            <path d="M21.62 31.39L17.89 27.65L21.62 23.92" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <span className="font-mono">
          <span></span> REC{' '}
        </span>
        <div className="box_battery flex justify-center items-center ">
          <div className="battery"></div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
