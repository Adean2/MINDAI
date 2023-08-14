import "./security.css";
import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";

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
const counts = 3000;
const positions = new Float32Array(counts * 3);

for (let i = 0; i < counts * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const color = new THREE.Color(0.5, 0.1, 1);
const particlesMaterial = new THREE.PointsMaterial({ color });
particlesMaterial.size = 0.02;
particlesMaterial.sizeAttenuation = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene0.add(particles);

//Scene 2
var scene2 = new THREE.Scene();
scenes.push(scene2);

//Brain model
let brain;
const loader = new GLTFLoader();
loader.load("Hippocampus.glb", (gltf) => {
  brain = gltf.scene;
  addOutlineObject(brain);
  brain.rotation.y = Math.PI / 2;
  brain.position.x = 0;
  brain.position.y = 0;
  const t1 = gsap.timeline({ defaults: { duration: 1 } });
  t1.fromTo(brain.scale, { z: 0, x: 0, y: 0 }, { z: 3, x: 3, y: 3 });
  // t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
  // t1.fromTo(".back", { opacity: "0" }, { opacity: "1" });
  brain.visible = true;
  brain.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshNormalMaterial({
        color: 0xffff,
      });
    }
    if (child.isMesh && child.name === "Frontal_Lobe") {
      // child.material = new THREE.MeshBasicMaterial({
      //   color: 0xffff,
      // });
      child.userData = {
        description:
          "The frontal lobe is the largest region of the brain's cortex, responsible for a variety of functions including executive functions, decision-making, and motor control.",
      };
      child.userData.imageURL = "Images/HumanBrain.png";
      child.userData.objecturl = "finance.html";
    }
    if (child.isMesh && child.name === "Brainstem") {
      child.userData = {
        description:
          "The brainstem is the oldest and most primitive region of the brain, responsible for regulating vital functions such as breathing, heart rate, and consciousness.",
      };
      child.userData.imageURL = "Images/Brainstem.png";
      child.userData.objecturl = "healthcare.html";
    }
    if (child.isMesh && child.name === "Cerebellum") {
      child.userData = {
        description:
          "The cerebellum is a brain region primarily responsible for coordinating voluntary movements, balance, and posture.",
      };
      child.userData.imageURL = "Images/Cerebellum.png";
      child.userData.objecturl = "transportation.html";
    }
    if (child.isMesh && child.name === "Occipital_Lobe") {
      child.userData = {
        description:
          "The hippocampus is a part of the brain located in the medial.",
      };
      child.userData.imageURL = "Images/Occipital_Lobe.png";
      child.userData.objecturl = "entertainment.html";
    }
    if (child.isMesh && child.name === "Temporal_Lobe") {
      child.userData = {
        description:
          "The temporal lobe is a region of the brain's cortex responsible for auditory processing, object recognition, language comprehension, and long-term memory formation.",
      };
      child.userData.imageURL = "Images/Temporal.png";
      child.userData.objecturl = "customerservice.html";
    }
    if (child.isMesh && child.name === "Hippocampus") {
      child.userData = {
        description:
          "The hippocampus is a brain region primarily responsible for the formation and consolidation of new memories and spatial navigation.",
      };
      child.userData.imageURL = "Images/Hippocampus.png";
      child.userData.objecturl = "education.html";
    }
    if (child.isMesh && child.name === "Basal_Ganglia") {
      child.userData = {
        description:
          "The basal ganglia are a group of interconnected brain regions involved in motor control, learning, and emotion, and are particularly important in the initiation and execution of voluntary movement.",
      };
      child.userData.imageURL = "Images/Basal_Ganglia.png";
      child.userData.objecturl = "automation.html";
    }
    if (child.isMesh && child.name === "Limbic_System") {
      child.userData = {
        description:
          "The limbic system is a complex network of brain structures involved in emotion, motivation, memory, and learning, and includes the amygdala, hippocampus, hypothalamus, and cingulate cortex.",
      };
      child.userData.imageURL = "Images/Limbic_System.png";
      child.userData.objecturl = "employment.html";
    }
    if (child.isMesh && child.name === "Nucleus") {
      child.userData = {
        description:
          "The nucleus is a membrane-bound organelle found within cells, which contains the cell's genetic material and is responsible for controlling cellular functions such as growth and reproduction.",
      };
      child.userData.imageURL = "Images/Limbic_System.png";
      child.userData.objecturl = "goverment.html";
    }
    if (child.isMesh && child.name === "Parietal_Lobe") {
      child.userData = {
        description:
          "The nucleus is a membrane-bound organelle found within cells, which contains the cell's genetic material and is responsible for controlling cellular functions such as growth and reproduction.",
      };
      child.userData.imageURL = "Images/PARIETAL.png";
      child.userData.objecturl = "privacy.html";
    }
  });

  scene2.add(brain);
  function animate() {
    composer.render();
    window.requestAnimationFrame(animate);
    brain.rotation.y -= 0.0009;
    controls1.update();
  }

  animate();
});

//Scene 3
var scene3 = new THREE.Scene();
scenes.push(scene3);

//Logo
let edu;
const loader10 = new GLTFLoader();
loader10.load("Brain.glb", (gltf) => {
  edu = gltf.scene;
  edu.position.y = 1.1;
  const t1 = gsap.timeline({ defaults: { duration: 1 } });
  t1.fromTo(edu.scale, { z: 0, x: 0, y: 0 }, { z: 0.5, x: 0.5, y: 0.5 });
  edu.visible = true;
  edu.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshNormalMaterial({
        visible: true,
        side: THREE.DoubleSide,
        color: 0xff0000,
      });
    }
  });

  scene11.add(edu);
});

//Scene 4
var scene4 = new THREE.Scene();
scenes.push(scene4);

//Model example
let robo;
const loader11 = new GLTFLoader();
loader11.load("MIND.glb", (gltf) => {
  robo = gltf.scene;
  robo.rotation.y = Math.PI / 2;
  robo.position.y = 0;
  const t1 = gsap.timeline({ defaults: { duration: 1 } });
  t1.fromTo(robo.scale, { z: 0, x: 0, y: 0 }, { z: 0.5, x: 0.5, y: 0.5 });
  robo.visible = true;
  robo.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshNormalMaterial({
        visible: true,
        side: THREE.DoubleSide,
        color: 0xff0000,
      });
    }
  });

  scene4.add(robo);
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
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera2 = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  5000
);
camera2.position.z = 5;
scene2.add(camera2);

//camera3
const camera3 = new THREE.PerspectiveCamera(45, 500 / 500);
camera3.position.z = 5;
scene3.add(camera3);

//camera4
const camera4 = new THREE.PerspectiveCamera(45, 500 / 500);
camera4.position.z = 5;
scene4.add(camera4);

//S0
const canvas0 = document.querySelector(".webgl");
const renderer0 = new THREE.WebGLRenderer({ canvas: canvas0 });
renderer0.setSize(sizes.width, sizes.height);
renderer0.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer0.render(scene0, camera0);

//S2
const canvas1 = document.querySelector(".webgl1");
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1, alpha: true });
renderer1.setSize(sizes.width, sizes.height);
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer1.render(scene2, camera2);

//S3
const canvas3 = document.querySelector(".webgl2");
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, alpha: true });
renderer3.setSize(300, 300);
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer3.render(scene3, camera3);

//S4
const canvas4 = document.querySelector(".webgl3");
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4, alpha: true });
renderer4.setSize(500, 500);
renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer4.render(scene4, camera4);

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
controls1.enableZoom = false;
controls1.enablePan = false;

const controls2 = new OrbitControls(camera3, canvas3);
controls2.enableDamping = true;
controls2.enabled = true;
controls2.autoRotate = true;
controls2.enableZoom = false;
controls2.enablePan = false;
controls2.dampingFactor = 0.05;

const controls3 = new OrbitControls(camera4, canvas4);
controls3.enableDamping = true;
controls3.enabled = true;
controls3.autoRotate = true;
controls3.enableZoom = false;
controls3.enablePan = false;
controls3.dampingFactor = 0.05;

const composer = new EffectComposer(renderer1);
const renderPass = new RenderPass(scene2, camera2);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene2,
  camera2
);
outlinePass.edgeStrength = 15;
outlinePass.edgeGlow = 0.3;
outlinePass.visibleEdgeColor.set(color);
composer.addPass(outlinePass);

function animate() {
  particles.position.z = 1.5;
  window.requestAnimationFrame(animate);
  renderer0.render(scene0, camera0);
  renderer3.render(scene3, camera3);
  renderer4.render(scene4, camera4);
  controls.update();
  controls2.update();
  controls3.update();
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

    const object = intersects[0].object;
    const name = object.name;
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
    modelNameElement.textContent = "AI Education";
    modelDescElement.textContent =
      "Artificial intelligence has the potential to transform education by providing personalized learning experiences and facilitating teacher workload. As more institutions begin to adopt AI technologies, it is important to consider the implications of this development on education. In this page, we will explore the potential impacts of AI education, the benefits it could bring to the sector, and the ethical and social considerations that must be taken into account.";
    modelImageElement.src = "ai-china-finance-sector-regulation.jpg";
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
