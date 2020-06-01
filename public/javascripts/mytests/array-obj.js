import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js";
import { MtlObjBridge } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

let loadingManager = null;

function main() {
  let RESOURSES_LOADED = false;

  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  // CAMERA
  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(20, 10, 20);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("lightgrey");

  // LIGHT
  {
    {
      const skyColor = 0xb1e1ff; // light blue
      const groundColor = 0xb97a20; // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      const light2 = new THREE.DirectionalLight(color, intensity);
      light.position.set(5, 10, 2);
      light2.position.set(-5, -10, -2);
      scene.add(light);
      scene.add(light.target);
      scene.add(light2);
      scene.add(light2.target);
    }
  }

  // LEDSCREEN
  let ledScreen = new THREE.Object3D();

  loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = function () {
    // console.log("Started loading file");
  };
  loadingManager.onLoad = function () {
    // console.log("loaded all resources");
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        let cloneTelek = telek.clone();
        cloneTelek.position.y = 4 * j;
        cloneTelek.position.z = -8 * i;
        ledScreen.add(cloneTelek);
      }
    }
  };
  // ledScreen.position.z = -10;
  ledScreen.name = "ledScreen";
  ledScreen.position.y = -6;
  scene.add(ledScreen);
  console.log("scene: ", scene);

  // OBJ
  let telek = new THREE.Object3D();
  {
    const mtlLoader = new MTLLoader(loadingManager);
    mtlLoader.load("../../models/telek.mtl", (mtlParseResult) => {
      const objLoader = new OBJLoader2(loadingManager);
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load("../../models/telek.obj", (root) => {
        telek.add(root);
        telek.name = "telek";
      });
    });
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

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
