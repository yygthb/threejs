import * as THREE from "../three.module.js";
import { OrbitControls } from "../OrbitControls.js";
// import * as THREEx from "../threex.domevents.js";

function main() {
  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 70;

  // RENDERER
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 1000;
  // controls.update();

  // GEOMETRY
  const geometry1 = new THREE.SphereGeometry(10, 10, 10);
  const material1 = new THREE.MeshNormalMaterial({ wireframe: true });
  const sphere1 = new THREE.Mesh(geometry1, material1);
  scene.add(sphere1);
  const geometry2 = new THREE.SphereGeometry(10, 10, 10);
  const material2 = new THREE.MeshNormalMaterial({ wireframe: true });
  const sphere2 = new THREE.Mesh(geometry2, material2);
  sphere2.position.x = 40;
  scene.add(sphere2);
  const geometry3 = new THREE.SphereGeometry(10, 10, 10);
  const material3 = new THREE.MeshNormalMaterial({ wireframe: true });
  const sphere3 = new THREE.Mesh(geometry3, material3);
  sphere3.position.x = -40;
  scene.add(sphere3);

  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(sphere1, "click", (event) => {
    material1.wireframe = false;
    console.log("sphere1");
  });
  domEvents.addEventListener(sphere2, "click", (event) => {
    material2.wireframe = false;
    console.log("sphere2");
  });

  // Display Resize
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const animate = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    sphere1.rotation.x += 0.01;
    sphere1.rotation.y += 0.01;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}

main();
