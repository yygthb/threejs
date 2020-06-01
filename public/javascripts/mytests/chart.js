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
  // camera.position.set(6, 5, 8);
  camera.position.set(11, 11, 15);

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
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = Math.PI * -0.5;
    scene.add(plane);
  }

  // Char Object3D
  const charT = new THREE.Object3D();
  scene.add(charT);

  // T vertical part
  {
    const boxWidth = 1;
    const boxHeight = 3;
    const boxDepth = 1;
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: "green",
    });
    const tVertical = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(tVertical);
    charT.add(tVertical);
  }

  // T horiz part
  {
    const boxWidth = 4;
    const boxHeight = 1;
    const boxDepth = 1;
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: "blue",
    });
    const tHoriz = new THREE.Mesh(boxGeometry, boxMaterial);
    tHoriz.name = "tVertical";
    tHoriz.position.y = 2;
    // scene.add(tHoriz);
    charT.add(tHoriz);
  }

  charT.position.y = 2;
  charT.scale.set(2, 2, 2);

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
