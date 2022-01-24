import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// gltf loader ( allows blender modles to be added)
const gltfLoader = new GLTFLoader();

// setting up the scene/ enviroment
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera );

// lighting

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)
scene.add(pointLight)






// blender models 

  // coral
  var coral;
  gltfLoader.load('/models/coral1.gltf', (gltf) => {
    coral = gltf.scene;
    scene.add(coral)
    gltf.scene.scale.set(4,4,4)
    gltf.scene.rotation.set(0,0,0.3)
    gltf.scene.position.set(7,-2,-15)
  })

  // pufferfish
  var pufferFish;
  gltfLoader.load('/models/pufferfish.gltf', (gltf) => {
    pufferFish = gltf.scene;
    scene.add(pufferFish)
    gltf.scene.scale.set(4,4,4)
    gltf.scene.rotation.set(0.3,-2,0)
    gltf.scene.position.set(-20,-4,-8)
  })

  // sea horse
var seaHorse;
  gltfLoader.load('/models/seaHorse1.gltf', (gltf) => {
    seaHorse = gltf.scene;
    scene.add(seaHorse)
    
    gltf.scene.scale.set(0.5,0.5,0.5)
    gltf.scene.position.set(3,1,12)
  })

  // crab
var crab;
  gltfLoader.load('/models/crabModel.gltf', (gltf) => {
    crab = gltf.scene;
    gltf.scene.scale.set(6,6,6)
    gltf.scene.position.set(-30,-10,25)
    gltf.scene.rotation.set(0.5,-15,1)
    scene.add(crab)
  })

    // jellyfish
  var jellyFish;
  gltfLoader.load('/models/jellyfishPink.gltf', (gltf) => {
    jellyFish = gltf.scene;
    scene.add(jellyFish)
    gltf.scene.scale.set(4,4,4)
    gltf.scene.position.set(-45,5,35)
  })




// background img

const oceanTexture = new THREE.TextureLoader().load('background3D.jpg');
scene.background = oceanTexture;


// floating green/blue bubbles

function coloredBubbled() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const color = THREE.MathUtils.randInt(0x00FBFB, 0x0F0FE5)
  const material = new THREE.MeshStandardMaterial({color: color})
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3).fill().map(() =>THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star) 
}

Array(300).fill().forEach(coloredBubbled)

// floating white transparent bluubles

function addBubbles() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addBubbles);

// animation function

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // coral animation
  coral.rotation.y += 0.008;

  // pufferfish animation

  pufferFish.rotation.y += 0.01;

  // sea horse animation
  seaHorse.rotation.x += 0.01;
  seaHorse.rotation.y += 0.03;

  // crab Animation

  crab.rotation.x += 0.01;
  crab.rotation.z += 0.01;

  //jelly fish animation
  
  jellyFish.rotation.y -= 0.01;

  

  controls.update();

}

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();

// calling functions

animate()