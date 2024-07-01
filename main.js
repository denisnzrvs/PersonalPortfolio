import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Check if browser supports WebGL2
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('container').innerHTML = 'Whoops! Sorry, but seems like something went wrong. Get in contact with @denisnzrvs on GitHub!';
    document.getElementById('container').appendChild(warning);
}

// Scene setup
const scene = new THREE.Scene();
const canvas = document.querySelector('#c');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;
const light = new THREE.AmbientLight(0x404040, 50);
scene.add(light);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
document.body.appendChild(renderer.domElement);
resizeRendererToDisplaySize(renderer);

// Load and add GLTF model
const loader = new GLTFLoader();
let popup;

loader.load('/macosPopup.glb', function (gltf) {
    popup = gltf.scene;
    popup.rotation.y = 0.5;
    popup.rotation.x = 0.1;
    popup.position.z = -3;
    popup.position.x = -3.5;
    popup.position.y = 3;
    popup.scale.set(0.75, 0.75, 0.75);
    scene.add(popup);
}, undefined, function (error) {
    console.error(error);
});

// Handles resizing the window, and hi-dpi displays
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

// Animation loop
function render(time) {
    time *= 0.001; // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // Rotate object
    if (popup) {
        popup.rotation.x += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// Start rendering
requestAnimationFrame(render);

// Handle window resize
window.addEventListener('resize', () => {
    resizeRendererToDisplaySize(renderer);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
