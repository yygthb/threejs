import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader.js";

function main() {
  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 20;
  // camera.position.x = 20;
  // camera.position.y = 15;
  camera.position.set(30, 0, 60);

  const axesHelper = new THREE.AxesHelper(12);
  scene.add(axesHelper);
  scene.background = new THREE.Color("lightgrey");

  // Light
  {
    const color = 0xffffff;
    const intensityFront = 1;
    const lightFront = new THREE.DirectionalLight(color, intensityFront);
    lightFront.position.set(-5, 5, 10);
    scene.add(lightFront);
    const intensity = 0.75;
    const lightBottom = new THREE.AmbientLightProbe(color, intensity);
    scene.add(lightBottom);
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensitySky = 0.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensitySky);
    // scene.add(light);
  }

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
  sphere1.position.y = 20;

  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(sphere1, "click", (event) => {
    // material1.wireframe = false;
    console.log("sphere clicked");
  });

  // TY Object3D
  const ty = new THREE.Object3D();
  scene.add(ty);
  // TEST
  let meshes = [];
  // ObjectLoader JSON
  // from https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_json_claraio.html
  let objectLoader = new THREE.ObjectLoader();
  objectLoader.load("../../models/ty.json", function (obj) {
    console.log("obj: ", obj);
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });
    console.log("meshes: ", meshes);

    const charY = meshes[1];
    const charT = meshes[0];

    charT.material.color.setHex(0x0000ff); // blue
    charY.material.color.setHex(0xff0000); // red

    ty.add(obj);
  });
  ty.scale.set(0.2, 0.2, 0.2);

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

  scene.position.y = -20;

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
