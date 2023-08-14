import { gsap } from "gsap";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./explore.css";

const scenes = [];
let objectsToOutline = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function addOutlineObject(object) {
	objectsToOutline = [];
	objectsToOutline.push(object);
	outlinePass.selectedObjects = objectsToOutline;
}

//main scene
var scene0 = new THREE.Scene();
scenes.push(scene0);

const particlesGeometry = new THREE.BufferGeometry();
const counts = 2000;
const positions = new Float32Array(counts * 3);

for (let i = 0; i < counts * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(positions, 3)
);

const randomColor1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
const particlesMaterial = new THREE.PointsMaterial({ color: randomColor1 });
particlesMaterial.size = 0.03;
particlesMaterial.sizeAttenuation = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene0.add(particles);

//Scene 2
var scene2 = new THREE.Scene();
scenes.push(scene2);

//Brain model
let brain;
const loader = new GLTFLoader();
loader.load("MiINDAI4.glb", (gltf) => {
	brain = gltf.scene;
	addOutlineObject(brain);
	brain.rotation.y = Math.PI / 2;
	brain.position.x = 0;
	brain.position.y = 0.9;
	const t1 = gsap.timeline({ defaults: { duration: 1 } });
	t1.fromTo(brain.scale, { z: 0, x: 0, y: 0 }, { z: 2, x: 2, y: 2 });
	t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
	t1.fromTo(".back", { opacity: "0" }, { opacity: "1" });
	brain.visible = true;
	brain.traverse((child) => {
		if (child.isMesh && child.name === "Frontal") {
			child.userData = {
				description:
					"The frontal lobe is the largest region of the brain's cortex, responsible for a variety of functions including executive functions, decision-making, and motor control.",
			};
			child.userData.imageURL = "Images/HumanBrain.png";
			child.userData.objecturl = "finance.html";
			child.userData.nameobject = "Frontal Lobe";
		}
		if (child.isMesh && child.name === "Brainstem") {
			child.userData = {
				description:
					"The brainstem is the oldest and most primitive region of the brain, responsible for regulating vital functions such as breathing, heart rate, and consciousness.",
			};
			child.userData.imageURL = "Images/Brainstem.png";
			child.userData.objecturl = "healthcare.html";
			child.userData.nameobject = "Brainstem";
		}
		if (child.isMesh && child.name === "Cerebellum") {
			child.userData = {
				description:
					"The cerebellum is a part of the brain located at the base of the skull, involved in the coordination and regulation of motor movements, balance, and posture. It also plays a role in some cognitive functions such as attention, language, and emotional control.",
			};
			child.userData.imageURL = "Images/Cerebellum.png";
			child.userData.objecturl = "transportation.html";
			child.userData.nameobject = "Cerebellum";
		}
		if (child.isMesh && child.name === "Occipital") {
			child.userData = {
				description:
					"The occipital lobe is a region in the brain located at the back of the head, responsible for processing visual information from the eyes. It plays a crucial role in our ability to perceive and understand the visual world around us.",
			};
			child.userData.imageURL = "Images/Occipital_Lobe.png";
			child.userData.objecturl = "entertainment.html";
			child.userData.nameobject = "Occipital Lobe";
		}
		if (child.isMesh && child.name === "Temporal") {
			child.userData = {
				description:
					"The temporal lobe is a region in the brain located on the side of the head, responsible for processing auditory information such as sounds and speech. It also plays a role in memory and the recognition of faces and objects.",
			};
			child.userData.imageURL = "Images/Temporal.png";
			child.userData.objecturl = "customerservice.html";
			child.userData.nameobject = "Temporal Lobe";
		}
		if (child.isMesh && child.name === "Hippocampus") {
			child.userData = {
				description:
					"The hippocampus is a brain region primarily responsible for the formation and consolidation of new memories and spatial navigation.",
			};
			child.userData.imageURL = "Images/Hippocampus.png";
			child.userData.objecturl = "education.html";
			child.userData.nameobject = "Hippocampus";
		}
		if (child.isMesh && child.name === "BasalGanglia") {
			child.userData = {
				description:
					"The basal ganglia are a group of interconnected brain regions involved in motor control, learning, and emotion, and are particularly important in the initiation and execution of voluntary movement.",
			};
			child.userData.imageURL = "Images/Basal_Ganglia.png";
			child.userData.objecturl = "automation.html";
			child.userData.nameobject = "Basal Ganglia";
		}
		if (child.isMesh && child.name === "Limbic") {
			child.userData = {
				description:
					"The limbic system is a complex network of brain structures involved in emotion, motivation, memory, and learning, and includes the amygdala, hippocampus, hypothalamus, and cingulate cortex.",
			};
			child.userData.imageURL = "Images/Limbic_System.png";
			child.userData.objecturl = "employment.html";
			child.userData.nameobject = "Limbic System";
		}
		if (child.isMesh && child.name === "Nucleus") {
			child.userData = {
				description:
					"The nucleus is a membrane-bound organelle found within cells, which contains the cell's genetic material and is responsible for controlling cellular functions such as growth and reproduction.",
			};
			child.userData.imageURL = "Images/Limbic_System.png";
			child.userData.objecturl = "government.html";
			child.userData.nameobject = "Nucleus";
		}
		if (child.isMesh && child.name === "Parietal") {
			child.userData = {
				description:
					"The parietal lobe is a region in the brain located in the upper back part of the head, involved in processing sensory information related to touch, temperature, and pain. It also plays a role in spatial awareness and perception, as well as in the integration of sensory information from different parts of the body.",
			};
			child.userData.imageURL = "Images/PARIETAL.png";
			child.userData.objecturl = "security.html";
			child.userData.nameobject = "Parietal Lobe";
		}
	});

	scene2.add(brain);
	function animate() {
		window.requestAnimationFrame(animate);
		brain.rotation.y -= 0.001;
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
camera2.position.z = 5;
scene2.add(camera2);

//S0
const canvas0 = document.querySelector(".webgl");
const renderer0 = new THREE.WebGLRenderer({ canvas: canvas0 });
renderer0.setSize(sizes.width, sizes.height);
renderer0.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//S2
const canvas1 = document.querySelector(".webgl1");
const renderer1 = new THREE.WebGLRenderer({
	canvas: canvas1,
	alpha: true,
});
renderer1.setSize(sizes.width, sizes.height);
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer1.render(scene2, camera2);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene2.add(ambientLight);

// create a white point light with intensity 1 and distance 10
const pointLight = new THREE.PointLight(0xffffff, 10, 100);

// set the position of the point light
pointLight.position.set(0, -5, 2);

// add the point light to the scene
scene2.add(pointLight);

// create a white point light with intensity 1 and distance 10
const pointLight1 = new THREE.PointLight(0xffffff, 9, 100);

// set the position of the point light
pointLight1.position.set(5, 0, 1);

// add the point light to the scene
scene2.add(pointLight1);

// create a white point light with intensity 1 and distance 10
const pointLight2 = new THREE.PointLight(0xffffff, 9, 100);

// set the position of the point light
pointLight2.position.set(-5, 0, 0);

// add the point light to the scene
scene2.add(pointLight2);

// create a white point light with intensity 1 and distance 10
const pointLight3 = new THREE.PointLight(0xffffff, 5, 100);

// set the position of the point light
pointLight3.position.set(0, 0, -5);

// add the point light to the scene
scene2.add(pointLight3);

// create a white point light with intensity 1 and distance 10
const pointLight4 = new THREE.PointLight(0xffffff, 0.5, 100);

// set the position of the point light
pointLight4.position.set(0, 0, 7);

// add the point light to the scene
scene2.add(pointLight4);

// Create the point light
const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.castShadow = true;
spotLight.position.set(0, 10, 0);

// Add the point light to the scene
scene2.add(spotLight);

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
controls1.enableZoom = true;
controls1.enablePan = false;
controls1.maxDistance = 6;
controls1.minDistance = 4.5;

const composer = new EffectComposer(renderer0);
const renderPass = new RenderPass(scene0, camera2);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	scene2,
	camera2
);
outlinePass.edgeStrength = 30;
outlinePass.edgeGlow = 0.5;
outlinePass.visibleEdgeColor.set("#ffffff");
composer.addPass(outlinePass);

function animate() {
	window.requestAnimationFrame(animate);
	renderer0.render(scene0, camera0);
	renderer1.render(scene2, camera2);
	controls.update();
	controls1.update();
	composer.render();
}

animate();

function onPointerMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera2);

	const intersects = raycaster.intersectObjects(scene2.children, true);

	if (intersects.length > 0) {
		const intersectObject = intersects[0].object;
		const index = objectsToOutline.indexOf(intersectObject);

		if (index === -1) {
			addOutlineObject(intersectObject);
		}
		const name = intersectObject.userData.nameobject;
		const image = intersectObject.userData.imageURL;
		const description = intersectObject.userData.description;
		const backgroundBox = document.getElementById("object");
		const modelNameElement = document.getElementById("modelName");
		const modelDescElement = document.getElementById("modelDescription");
		const modelImageElement = document.getElementById("modelImage");
		modelNameElement.textContent = name;
		modelImageElement.src = image;
		modelDescElement.textContent = description;
		backgroundBox.classList.remove("hidden");
	} else {
		objectsToOutline = [];
		outlinePass.selectedObjects = objectsToOutline;
		const backgroundBox = document.getElementById("object");
		const modelNameElement = document.getElementById("modelName");
		const modelDescElement = document.getElementById("modelDescription");
		const modelImageElement = document.getElementById("modelImage");
		modelNameElement.textContent = "";
		modelDescElement.textContent = "";
		modelImageElement.src = "";
		backgroundBox.classList.add("hidden");
	}
}

function onClick(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera2);
	const intersects = raycaster.intersectObjects(scene2.children, true);
	if (intersects.length > 0) {
		const url = intersects[0].object.userData.objecturl;
		window.location.href = url; // navigate to another page
	}
}

// add the event listener to the window
window.addEventListener("pointermove", onPointerMove);
document.addEventListener("dblclick", onClick);
