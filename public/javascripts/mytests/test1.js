import * as THREE from "../three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  // Camera
  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 10);

  // Light
  {
    const color = 0xffffff;
    const intensity = 4;
    const light = new THREE.DirectionalLight(color, intensity);
    // const intensity = 1;
    // const light = new THREE.AmbientLightProbe(color, intensity);
    light.position.set(-5, 5, 10);
    scene.add(light);
  }

  // Plane
  {
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load("../../img/checker.png");
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
    scene.add(mesh);
  }

  // Cube
  {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: "green",
    });
    const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    cube.position.y = 0.5;
    scene.add(cube);
  }

  // Orbitcontrols
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

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

  // Render
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

  // // Render
  // function render(time) {
  //   time *= 0.001;
  //   if (resizeRendererToDisplaySize(renderer)) {
  //     const canvas = renderer.domElement;
  //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //     camera.updateProjectionMatrix();
  //   }
  //   cube.rotation.x = time;
  //   cube.rotation.y = time;
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(render);
  // }
  // requestAnimationFrame(render);
}

main();
