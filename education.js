import "./education.css";
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

const particlesMaterial = new THREE.PointsMaterial({ color: 0x00ff00 });
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
loader.load("EducationHippo.glb", (gltf) => {
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
    if (child.isMesh && child.name === "Current") {
      child.userData = {
        description:
          "The impact of AI in education is still in the early stages of development, but there is enormous potential for disruption.",
      };
      child.userData.imageURL = "Education_Current.jpeg";
      child.userData.nameobject = "Current state of AI education";
      child.userData.braindescript =
        "Applications are mostly limited to functions like grading and automating administrative tasks.";
      child.userData.braindescript1 =
        "Challengs to overcome are data privacy and security concerns, limited access to technology in some communities, and shortage of qualified professionals";
    }
    if (child.isMesh && child.name === "Potential") {
      child.userData = {
        description:
          "AI has the potential to significantly improve the education sector.",
      };
      child.userData.imageURL = "Education_Potential.jpeg";
      child.userData.nameobject = "Potential benefits of AI education";
      child.userData.braindescript =
        "Learning outcomes can be improved by providing timely and targeted feedback, enabling educators to focus attention on areas where students need help.";
      child.userData.braindescript1 =
        "Educators can identify and address learning gaps while providing opportunities for students to learn in new and engaging ways.";
    }
    if (child.isMesh && child.name === "Ethical") {
      child.userData = {
        description:
          "While AI education has the potential to bring significant benefits, it also poses ethical and social challenges that must be addressed.",
      };
      child.userData.imageURL = "Education_Ethics.avif";
      child.userData.nameobject = "Ethical and social implications";
      child.userData.braindescript =
        "Organizations need to consider how student data is collected and observed. What safeguards are in place for data security. ";
      child.userData.braindescript1 =
        "Staffing, adminstrators worry about how AI will effect replacement. ";
    }
    if (child.isMesh && child.name === "Case") {
      child.userData = {
        description:
          "AI is already being used in education with promising results.",
      };
      child.userData.imageURL = "Education_Case.jpeg";
      child.userData.nameobject = "Case studies and research";
      child.userData.braindescript =
        "Carnegie Mellon University study, students who received AI-supported tutoring scored 25% higher on post-tests than those who received traditional classroom instruction.";
      child.userData.braindescript1 =
        "Microsoft survey, 88% of teachers believe that AI will have a significant impact on education in the next few years.";
    }
    if (child.isMesh && child.name === "Conclusion") {
      child.userData = {
        description:
          "Some Schools have chosen cameras to recognise emotions of students.",
      };
      child.userData.imageURL = "Emotion_rec.jpeg";
      child.userData.nameobject = "Emotion recognition";
      child.userData.braindescript =
        "Systems automatically take attendance and track the activities of students, including reading, writing, or listening";
      child.userData.braindescript1 =
        "Emotion recognition uses images rather than text as inputs. The images could be static photos of students’ faces taken in real-time. Using the system, the school can observe the behaviour of each student and take actions accordingly.";
    }
    if (child.isMesh && child.name === "Developing_tech") {
      child.userData = {
        description:
          "OpenAI is developing a conversational AI language model that works by facilitating natural language interaction between students and computers.",
      };
      child.userData.imageURL = "chatgpt.jpeg";
      child.userData.nameobject = "ChatGPT";
      child.userData.braindescript =
        "Currently ChatGPT is helping students with writing assignments, math lessons, and historical events in the form of educational games.";
      child.userData.braindescript1 =
        "ChatGPT can assist with language translation, making it easier for students who speak different languages able to communicate and learn together.";
    }
  });

  scene2.add(brain);
  function animate() {
    composer.render();
    window.requestAnimationFrame(animate);
    brain.rotation.y -= 0.0005;
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
loader10.load("text.glb", (gltf) => {
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

  scene3.add(edu);
});

//Scene 4
var scene4 = new THREE.Scene();
scenes.push(scene4);

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

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene2.add(ambientLight);

// create a white point light with intensity 1 and distance 10
const pointLight = new THREE.PointLight(0xffffff, 10, 10);

// set the position of the point light
pointLight.position.set(0, -5, 2);

// add the point light to the scene
scene2.add(pointLight);

// create a white point light with intensity 1 and distance 10
const pointLight1 = new THREE.PointLight(0xffffff, 3, 10);

// set the position of the point light
pointLight1.position.set(5, 0, 1);

// add the point light to the scene
scene2.add(pointLight1);

// create a white point light with intensity 1 and distance 10
const pointLight2 = new THREE.PointLight(0xffffff, 3, 10);

// set the position of the point light
pointLight2.position.set(-5, 0, 0);

// add the point light to the scene
scene2.add(pointLight2);

// create a white point light with intensity 1 and distance 10
const pointLight3 = new THREE.PointLight(0xffffff, 5, 10);

// set the position of the point light
pointLight3.position.set(0, 0, -5);

// add the point light to the scene
scene2.add(pointLight3);

// create a white point light with intensity 1 and distance 10
const pointLight4 = new THREE.PointLight(0xffffff, 0.5, 10);

// set the position of the point light
pointLight4.position.set(0, 0, 7);

// add the point light to the scene
scene2.add(pointLight4);

// Create the point light
const spotLight = new THREE.SpotLight(0xffffff, 3);
spotLight.castShadow = true;
spotLight.position.set(0, 10, 0);

// Add the point light to the scene
scene2.add(spotLight);

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
outlinePass.visibleEdgeColor.set("#00ff00");
composer.addPass(outlinePass);

function animate() {
  particles.position.z = 1.5;
  window.requestAnimationFrame(animate);
  renderer0.render(scene0, camera0);
  renderer3.render(scene3, camera3);
  controls.update();
  controls2.update();
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
    const braindescript = intersectObject.userData.braindescript;
    const braindescript1 = intersectObject.userData.braindescript1;
    const pagedescript = intersectObject.userData.page;
    const backgroundBox = document.getElementById("object");
    const modelNameElement = document.getElementById("modelName");
    const modelDescElement = document.getElementById("modelDescription");
    const modelbrainDescElement = document.getElementById("brainconnection");
    const modelbrainDesc1Element = document.getElementById("brainconnection1");
    const modelpageDescElement = document.getElementById("pageDescription");
    const modelImageElement = document.getElementById("modelImage");
    modelNameElement.textContent = name;
    modelImageElement.src = image;
    modelDescElement.textContent = description;
    modelbrainDescElement.textContent = braindescript;
    modelbrainDesc1Element.textContent = braindescript1;
    modelpageDescElement.textContent = pagedescript;
    backgroundBox.classList.remove("hidden");
  } else {
    objectsToOutline = [];
    outlinePass.selectedObjects = objectsToOutline;
    const backgroundBox = document.getElementById("object");
    const modelNameElement = document.getElementById("modelName");
    const modelDescElement = document.getElementById("modelDescription");
    const modelbrainDescElement = document.getElementById("brainconnection");
    const modelbrainDesc1Element = document.getElementById("brainconnection1");
    const modelpageDescElement = document.getElementById("pageDescription");
    const modelImageElement = document.getElementById("modelImage");
    modelNameElement.textContent = "AI Education";
    modelDescElement.textContent =
      "The hippocampus is a crucial part of the human brain responsible for memory and learning. In AI education, the hippocampus can be linked to the development of personalized learning algorithms.";
    modelbrainDescElement.textContent =
      "learning systems can adapt to the individual student's pace and level of understanding, offering personalized feedback and support along the way. ";
    modelbrainDesc1Element.textContent =
      "With AI technology, students can study various courses and training programmes available around the world just by sitting at home. ";
    modelImageElement.src = "1661871992258.jpeg";
    backgroundBox.classList.add("hidden");
  }
}

function onClick(event) {
  const rect = canvas3.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera3);
  const intersects = raycaster.intersectObject(edu, true);
  if (intersects.length > 0) {
    window.location.href = "index.html"; // navigate to another page
  }
}

// add the event listener to the window
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("click", onClick);
