import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js";
import { MtlObjBridge } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("lightgrey");

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load("https://threejsfundamentals.org/threejs/resources/images/checker.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    // scene.add(mesh);
  }

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

  // {
  //   const mtlLoader = new MTLLoader();
  //   mtlLoader.load(
  //     "https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl",
  //     (mtlParseResult) => {
  //       const objLoader = new OBJLoader2();
  //       const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
  //       objLoader.addMaterials(materials);
  //       objLoader.load("https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj", (root) => {
  //         scene.add(root);
  //       });
  //     }
  //   );
  // }

  const kubik = new THREE.Object3D();
  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("../../models/kubik-rubika.mtl", (mtlParseResult) => {
      const objLoader = new OBJLoader2();
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load("../../models/kubik-rubika.obj", (root) => {
        kubik.add(root);
      });
    });
  }
  kubik.name = "kubik";
  scene.add(kubik);

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

    kubik.rotation.x += 0.01;
    kubik.rotation.y += 0.01;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

// import * as THREE from "../three.module.js";
// import { OrbitControls } from "../OrbitControls.js";

// function main() {
//   // SCENE
//   const scene = new THREE.Scene();

//   // CAMERA
//   const fov = 75;
//   const aspect = 2;
//   const near = 0.1;
//   const far = 1000;
//   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   camera.position.z = 70;

//   // RENDERER
//   const canvas = document.querySelector("#c");
//   const renderer = new THREE.WebGLRenderer({ canvas });

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.minDistance = 1;
//   controls.maxDistance = 1000;
//   // controls.update();

//   // // LIGHT
//   // {
//   //   const color = 0xffffff;
//   //   const intensityFront = 1;
//   //   const lightFront = new THREE.DirectionalLight(color, intensityFront);
//   //   lightFront.position.set(-5, 5, 10);
//   //   scene.add(lightFront);
//   //   const intensity = 0.75;
//   //   const lightBottom = new THREE.AmbientLightProbe(color, intensity);
//   //   scene.add(lightBottom);
//   // }

//   // // PLANE
//   // {
//   //   const planeSize = 40;
//   //   const loader = new THREE.TextureLoader();
//   //   const texture = loader.load("../../img/checker.png");
//   //   texture.wrapS = THREE.RepeatWrapping;
//   //   texture.wrapT = THREE.RepeatWrapping;
//   //   texture.magFilter = THREE.NearestFilter;
//   //   const repeats = planeSize / 2;
//   //   texture.repeat.set(repeats, repeats);
//   //   const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
//   //   const planeMat = new THREE.MeshPhongMaterial({
//   //     map: texture,
//   //     side: THREE.DoubleSide,
//   //   });
//   //   const plane = new THREE.Mesh(planeGeo, planeMat);
//   //   plane.rotation.x = Math.PI * -0.5;
//   //   scene.add(plane);
//   // }

//   // GEOMETRY
//   const geometry1 = new THREE.SphereGeometry(10, 20, 10);
//   const material1 = new THREE.MeshNormalMaterial({ wireframe: true });
//   const sphere1 = new THREE.Mesh(geometry1, material1);
//   scene.add(sphere1);

//   // ONCLICK
//   const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
//   domEvents.addEventListener(sphere1, "click", (event) => {
//     // material1.wireframe = false;
//     console.log("clicked on sphere1");
//   });

//   // Display Resize
//   function resizeRendererToDisplaySize(renderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//       renderer.setSize(width, height, false);
//     }
//     return needResize;
//   }

//   const animate = () => {
//     if (resizeRendererToDisplaySize(renderer)) {
//       const canvas = renderer.domElement;
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//     }

//     sphere1.rotation.x += 0.01;
//     sphere1.rotation.y += 0.01;

//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   };

//   animate();
// }

// main();
