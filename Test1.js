import * as THREE from "three";
import "./explore.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);
const ambient = new THREE.HemisphereLight(0xffffff, 0x999999);
scene.add(ambient);

// create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// create a renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// create a light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

let brain;
let originalColor;

// create a loader and load the model
const loader = new GLTFLoader();
const composer = new EffectComposer(renderer); // declare the composer variable outside of the loader.load function
const renderPass = new RenderPass(scene, camera);
const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);
outlinePass.edgeStrength = 3;
outlinePass.edgeGlow = 0.5;
outlinePass.visibleEdgeColor.set(0xffffff);
outlinePass.hiddenEdgeColor.set(0xffffff);

composer.addPass(renderPass);
composer.addPass(outlinePass);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
console.log(mouse);

loader.load("MiINDAI.glb", function (gltf) {
  brain = gltf.scene;
  scene.add(brain);

  originalColor = brain.children[0].material.color.clone();

  // move these lines inside the loader.load function
  const clickableRegion = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  brain.add(clickableRegion);

  clickableRegion.addEventListener("click", () => {});
});

// adjust camera position and controls
camera.position.set(0, 0, 2);
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

// animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();

  // move this line inside the animate function
  // composer.render();

  // rotate the brain
  brain.rotation.y += 0.007;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(brain, true);

  if (intersects.length > 0) {
    const randomColor = Math.random() * 0xffffff;
    //brain.children[0].material.color.set(randomColor);
  } else {
    //brain.children[0].material.color.copy(originalColor);
  }
  if (intersects.length > 0) {
    outlinePass.selectedObjects = [intersects[0].object];
  } else {
    outlinePass.selectedObjects = [];
  }
}

// add event listeners for mouse movements
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(brain, true);
  if (intersects.length > 0) {
    window.location.href = "http://localhost:5174/Explore.html"; // navigate to another page
  }
}

document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("dbclick", onClick, false);

animate();
