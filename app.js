import * as THREE from 'three';
     import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model, mixer, controls;

function init() {
  // Set up Three.js scene
  scene = new THREE.Scene();

  // Camera setup (perspective)
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 3); // Set initial camera position

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add lights (ambient and directional)
  const ambientLight = new THREE.AmbientLight(0x404040, 1);  // Soft light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Load the 3D DNA model (replace with your actual file path)
  const loader = new THREE.GLTFLoader();
  loader.load('path_to_your_dna_model.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);
    camera.position.z = 3; // Adjust camera position after model is loaded
  });

  // OrbitControls (for user interaction with the scene)
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // For smooth controls
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;

  // Handle window resizing
  window.addEventListener('resize', onWindowResize, false);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (controls) controls.update(); // Update controls for smooth animation
  renderer.render(scene, camera);
}

// Handle resizing of the window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the scene
init();

// Mutation Handler (for example: highlight pyrimidine dimers)
function introduceMutation() {
  if (!model) return;

  // For now, simulate mutation by changing the color of the model (just an example)
  model.traverse(function(child) {
    if (child.isMesh) {
      child.material.color.set(0xff0000);  // Change color to red
    }
  });
}
