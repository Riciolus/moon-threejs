import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// camera

camera.position.z = 30;

// lights

const pointLight = new THREE.PointLight(0xfcd34d, 10000, 2000, 3);
pointLight.position.set(10, 30, 10);

Array(20).fill().forEach(addRandomizedLights);

const ambientLight = new THREE.AmbientLight(0xffffff, 2000, 1000, 3);
scene.add(pointLight);

//          helper
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 2);
// scene.add(lightHelper, gridHelper);

// controls

const controls = new OrbitControls(camera, renderer.domElement);

// objects

// //          torus
// const geometry = new THREE.RingGeometry();
// const material = new THREE.MeshStandardMaterial({
//   color: 0x65a30d,
//   wireframe: false,
// });
// const torus = new THREE.Mesh(geometry, material);
// torus.rotateX(90);
// scene.add(torus);

//          star particles
Array(500).fill().forEach(addStar);
Array(150).fill().forEach(addGlowStar);

//          moon
const moonTexture = new THREE.TextureLoader().load("images/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("images/normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
scene.add(moon);

// background

const spaceTexture = new THREE.TextureLoader().load("images/asd.jpg");
// scene.background = spaceTexture;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function addGlowStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function animate() {
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.0028;
  moon.rotation.z += 0.002;

  renderer.render(scene, camera);
}

function addRandomizedLights() {
  const pointLight = new THREE.PointLight(0x9333ea, 1500, 1000, 3);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  pointLight.position.set(x, y, z);
  scene.add(pointLight);
}
