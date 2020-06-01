import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";

function main() {
  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 20;
  // camera.position.x = 20;
  // camera.position.y = 15;
  camera.position.set(10, 10, 15);

  const axesHelper = new THREE.AxesHelper(12);
  scene.add(axesHelper);

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

  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(sphere1, "click", (event) => {
    // material1.wireframe = false;
    console.log("sphere clicked");
  });

  // Host Object3D
  const host = new THREE.Object3D();
  scene.add(host);
  // TEST
  {
    const objLoader = new OBJLoader2();
    function loader(obj) {
      obj.traverse((child) => {
        if (child.material)
          child.material = new THREE.MeshPhongMaterial({
            color: "grey",
            shininess: 30,
          });
      });
      host.add(obj);
    }
    objLoader.setModelName("MiniHost");
    // objLoader.setMaterials();
    objLoader.load("../../models/mini_host.obj", loader);
  }
  // // TRUE
  // {
  //   const objLoader = new OBJLoader2();
  //   objLoader.load("../../models/mini_host.obj", (obj) => {
  //     host.add(obj);
  //   });
  // }
  host.scale.set(40, 40, 40);
  host.rotation.x = -Math.PI / 2;

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

    // sphere1.rotation.x += 0.01;
    // sphere1.rotation.y += 0.01;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}

main();
