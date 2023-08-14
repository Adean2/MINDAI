import { gsap } from "gsap";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./home.css";

const scenes = [];
let objectsToOutline = [];

function addOutlineObject(object) {
	objectsToOutline = [];
	objectsToOutline.push(object);
	outlinePass.selectedObjects = objectsToOutline;
}

//main scene
var scene0 = new THREE.Scene();
scenes.push(scene0);

const particlesGeometry = new THREE.BufferGeometry();
const counts = 1000;
const positions = new Float32Array(counts * 3);

for (let i = 0; i < counts * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(positions, 3)
);
const randomColor1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
const particlesMaterial = new THREE.PointsMaterial({ color: randomColor1 });
particlesMaterial.size = 0.015;
particlesMaterial.sizeAttenuation = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene0.add(particles);

//Scene 2
var scene2 = new THREE.Scene();
scenes.push(scene2);

//Scene 3
var scene3 = new THREE.Scene();
scenes.push(scene3);

//Brain model
let brain;
const loader = new GLTFLoader();
loader.load("3dBrain.glb", (gltf) => {
	brain = gltf.scene;
	addOutlineObject(brain);

	const t1 = gsap.timeline({ defaults: { duration: 2 } });
	t1.fromTo(brain.scale, { z: 0, x: 0, y: 0 }, { z: 2, x: 2, y: 2 });
	brain.traverse((child) => {
		if (child.isMesh && child.name === "Icosphere") {
			const outlinePass = new OutlinePass(
				new THREE.Vector2(sizes.width, sizes.height),
				scene2,
				camera2,
				[child]
			);
			const randomColor =
				"#" + Math.floor(Math.random() * 16777215).toString(16);
			outlinePass.visibleEdgeColor.set(randomColor);
			composer1.addPass(outlinePass);
		}
	});

	scene2.add(brain);
	function animate() {
		window.requestAnimationFrame(animate);
		composer1.render();
		brain.rotation.z -= 0.0001;
		brain.position.y = -0.02;
		controls.update();
	}

	animate();
});

let title;
const loader2 = new GLTFLoader();
loader2.load("text.glb", (gltf) => {
	title = gltf.scene;
	title.visible = true;
	const t1 = gsap.timeline({ defaults: { duration: 1 } });
	t1.fromTo(title.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
	// t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
	// t1.fromTo(".home_container", { opacity: "0" }, { opacity: "1" });
	title.traverse((child) => {
		if (child.isMesh) {
			child.material = new THREE.MeshNormalMaterial({});
		}
	});

	scene3.add(title);
	function animate() {
		window.requestAnimationFrame(animate);
		renderer3.render(scene3, camera3);
		controls2.update();
	}

	animate();
});

//camera0 background
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};
const camera0 = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.001,
	5000
);
camera0.position.z = 5;
scene0.add(camera0);

//camera2
const sizes1 = {
	width1: window.innerWidth,
	height1: window.innerHeight,
};
const camera2 = new THREE.PerspectiveCamera(
	75,
	sizes1.width1 / sizes1.height1,
	0.001,
	5000
);
camera2.position.z = 1.4;
scene2.add(camera2);

const camera3 = new THREE.PerspectiveCamera(45, 500 / 500);
camera3.position.z = 5;
scene3.add(camera3);

//S0
const canvas0 = document.querySelector(".webgl");
const renderer0 = new THREE.WebGLRenderer({ canvas: canvas0 });
renderer0.setSize(sizes.width, sizes.height);
renderer0.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//S2
const canvas1 = document.querySelector(".webgl1");
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1, alpha: true });
renderer1.setSize(sizes.width, sizes.height);
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//S3
const canvas3 = document.querySelector(".webgl2");
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, alpha: true });
renderer3.setSize(500, 500);
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera0, canvas0);
controls.enableDamping = true;
controls.enabled = true;
controls.autoRotate = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.dampingFactor = 0.05;
controls.autoRotateSpeed = 0.1;

const controls1 = new OrbitControls(camera2, canvas1);
controls1.enableDamping = true;
controls1.enabled = true;
controls1.autoRotate = true;
controls1.enableZoom = false;
controls1.enablePan = false;
controls1.maxDistance = 4;
controls1.minDistance = 4;

const controls2 = new OrbitControls(camera3, canvas3);
controls2.enableDamping = true;
controls2.enabled = true;
controls2.autoRotate = false;
controls2.enableZoom = false;
controls2.enablePan = false;
controls2.autoRotateSpeed = 0.7;

const composer = new EffectComposer(renderer0);
const composer1 = new EffectComposer(renderer0);
const renderPass = new RenderPass(scene0, camera0);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	scene0,
	camera0
);

function animate() {
	particles.position.z = 1.5;
	window.requestAnimationFrame(animate);
	renderer0.render(scene0, camera0);
	controls.update();
}

animate();
