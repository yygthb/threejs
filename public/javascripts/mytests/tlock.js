import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js";
import { MtlObjBridge } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

function main() {
  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("grey");

  // CAMERA
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  // const far = 100; // old
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 20;
  camera.position.set(-5, 0.5, 5); // old

  // RENDERER
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  // LIGHT
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(3, 3, 3);
    scene.add(light);
    scene.add(light.target);
  }
  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb1e1ff;
    const intensity = 0.8;
    const sky = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(sky);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 1, 0);
  scene.position.y = -0.5;
  controls.minDistance = 1;
  controls.maxDistance = 1000;

  // DOM EVENTS
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

  // GEOMETRY FROM OBJ
  let bolt = new THREE.Object3D();
  bolt.name = "bolt";

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("../../models/bolt_gaika_fromSAT_v3.mtl", (mtlParseResult) => {
      const objLoader = new OBJLoader2();
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load("../../models/bolt_gaika_fromSAT_v3.obj", (root) => {
        scene.add(root);
      });
    });
  }

  // const objLoader = new OBJLoader2();
  // objLoader.load("../../models/bolt_gaika_fromSAT_v3.obj", (tLock) => {
  //   tLock.traverse((child) => {
  //     if (child instanceof THREE.Mesh) {
  //       child.material = new THREE.MeshPhongMaterial();

  //     }
  //   });
  // });

  // RAYCAST
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  const orangeButton = document.getElementById("button__tlock_orange");
  if (orangeButton) {
    orangeButton.onclick = function () {
      console.log("orange");
      console.log("tLock_Gaika: ", tLock_Gaika);
    };
  }

  const buttonOpen = document.getElementById("button__tlock_open");
  const buttonClose = document.getElementById("button__tlock_close");
  if (buttonOpen) {
    buttonOpen.onclick = function () {
      nakonechnik.position.y += 0.8;
      gaika.position.y += 0;
      plastina1.position.y -= 0.5;
      plastina2.position.y -= 0.7;
      plastina3.position.y -= 0.9;
      bolt.position.y -= 1.5;
      buttonClose.style.zIndex = 11;
    };
    buttonClose.onclick = function () {
      nakonechnik.position.y -= 0.8;
      gaika.position.y -= 0;
      plastina1.position.y += 0.5;
      plastina2.position.y += 0.7;
      plastina3.position.y += 0.9;
      bolt.position.y += 1.5;
      buttonClose.style.zIndex = 9;
    };
  }

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

  // ANIMATE
  const animate = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
}

main();
