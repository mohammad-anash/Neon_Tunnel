import * as THREE from 'three';

/*
Canvas & Ring Counter
*/

const canvas = document.querySelector('.webgl');
const ringCounterEle = document.querySelector('.ring-counter');

/*
Size
*/

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Scene
 */

const scene = new THREE.Scene();

scene.fog = new THREE.Fog('#04030a', 8, 70);

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Ring
 */

const ringGeometry = new THREE.TorusGeometry(3.2, 0.07, 8, 64);

const count = 45;
const gap = 2.2;
const length = count * gap;

const rings = [];

for (let i = 0; i < count; i++) {
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff' });

  const finalRing = new THREE.Mesh(ringGeometry, material);

  finalRing.position.set(0, 0, -i * gap);
  finalRing.userData.i = i;

  scene.add(finalRing);
  rings.push(finalRing);
}

/**
 * Dust Particles
 */

const dustCount = 500;
const dustPositions = new Float32Array(dustCount * 3);

for (let i = 0; i < dustCount; i++) {
  dustPositions[i * 3] = (Math.random() - 0.5) * 14; // x
  dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
  dustPositions[i * 3 + 2] = -Math.random() * length; // z
}

const dustGeometry = new THREE.BufferGeometry();

dustGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(dustPositions, 3),
);

const dust = new THREE.Points(
  dustGeometry,
  new THREE.PointsMaterial({
    color: '#aab4ff',
    size: 0.05,
  }),
);

scene.add(dust);

/**
 * Boost
 */

let boost = false;

window.addEventListener('pointerdown', () => (boost = true));
window.addEventListener('pointerup', () => (boost = false));

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(size.width, size.height);

const getPath = (z, time) => {
  return {
    x: Math.sin(z * 0.07 + time * 0.5) * 3.5,
    y: Math.cos(z * 0.05 + time * 0.4) * 2.2,
  };
};

/**
 * Animate
 */

const mouse = { x: 0, y: 0 };

window.addEventListener('pointermove', () => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

let speed = 12;
const clock = new THREE.Clock();
let time = 0;

let countRings = 0;

const Animate = () => {
  const deltaTime = clock.getDelta();

  time += deltaTime;

  const targetSpeed = boost ? 40 : 12;
  speed += (targetSpeed - speed) * Math.min(deltaTime * 3, 1);

  const targetFov = boost ? 88 : 65;
  camera.fov += (targetFov - camera.fov) * Math.min(deltaTime * 4, 1);
  camera.updateProjectionMatrix();

  rings.forEach((ring) => {
    ring.position.z += speed * deltaTime;

    if (ring.position.z > 4) {
      ring.position.z -= length;

      countRings++;

      ringCounterEle.innerHTML = 'Rings: ' + countRings;
    }

    const path = getPath(ring.position.z, time);

    ring.position.x = path.x;
    ring.position.y = path.y;

    ring.material.color.setHSL(
      (ring.userData.i * 0.018 + time * 0.08) % 1,
      0.9,
      0.6,
    );
  });

  /**
   * Dust
   */

  const dustArray = dustGeometry.attributes.position.array;

  for (let i = 0; i < dustCount; i++) {
    dustArray[i * 3 + 2] += speed * deltaTime;

    if (dustArray[i * 3 + 2] > 4) {
      dustArray[i * 3 + 2] -= length;
    }
  }

  dustGeometry.attributes.position.needsUpdate = true;

  /**
   * Camera Movement
   */

  const cameraPath = getPath(0, time);

  const targetX = cameraPath.x + mouse.x * 1.6;
  const targetY = cameraPath.y + mouse.y * 1.1;

  camera.position.x +=
    (targetX - camera.position.x) * Math.min(deltaTime * 4, 1);

  camera.position.y +=
    (targetY - camera.position.y) * Math.min(deltaTime * 4, 1);

  /**
   * Camera Look Direction
   */

  const lookPath = getPath(-12, time);

  camera.lookAt(lookPath.x, lookPath.y, -12);

  /**
   * Render
   */

  renderer.render(scene, camera);

  window.requestAnimationFrame(Animate);
};

Animate();

/**
 * Resize Screen
 */

window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
});
