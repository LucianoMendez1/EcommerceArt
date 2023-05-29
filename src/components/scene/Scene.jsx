import React, { useEffect  } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import textureImg from './textures/texture1.jpg'

const Scene = () => {


    useEffect(() => {
      // Canvas
      const canvas = document.querySelector('.webgl');
        const scene = new THREE.Scene();


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
    
            // Camera
            const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
            scene.add(camera);


                // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        /**
         * Base
         */
  

        const textureLoader = new THREE.TextureLoader();
        const planetTexture = textureLoader.load(textureImg)
        // Scene


        const ambientLight = new THREE.AmbientLight(0xffffff , 1)
        scene.add(ambientLight)


        // Object
        const geometry = new THREE.SphereGeometry(16, 32, 16);
        const material = new THREE.MeshStandardMaterial({
        map: planetTexture,
        side: THREE.BackSide

        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

      

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;



        // Animate
        const animate = () => {

            // Update controls
            mesh.rotation.y += 0.0003
            controls.update();

            // Render
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

    },[])


  return (
    <canvas className='webgl' ></canvas>
  )
}

export default Scene