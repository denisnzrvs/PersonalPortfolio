import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


//Check if browser supports WebGL2. If not, display a warning message instead of website.
import WebGL from 'three/addons/capabilities/WebGL.js';
if (WebGL.isWebGL2Available()) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const light = new THREE.AmbientLight(0x404040, 50); // soft white light
    scene.add(light);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;
    const loader = new GLTFLoader();

    function onPointerMove(event) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        console.log(ponter.x, pointer.y)
    }
    window.addEventListener('mousemove', onPointerMove);

    loader.load('./public/macosPopup.glb', function (gltf) {
        var popup = gltf.scene;

        //TODO - find way to map the poisitions of objects to -1 to 1 in all axes to enable reactivity to mouse movement

        popup.rotation.y = 0.5;
        popup.rotation.x = 0.1;
        popup.position.z = -3;
        popup.position.x = -3.5
        popup.position.y = 3;
        popup.scale.x = 0.75
        popup.scale.y = 0.75
        popup.scale.z = 0.75
        scene.add(popup);

    }, undefined, function (error) {

        console.error(error);

    });

    // function responsible for rendering the scene every frame
    function animate() {
        //add animations above this line
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

} else { const warning = WebGL.getWebGL2ErrorMessage(); document.getElementById('container').appendChild(warning); }