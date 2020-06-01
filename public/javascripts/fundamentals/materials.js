import * as THREE from "../three.module.js";

function main() {
  const canvas = document.querySelector("#c");

  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-4, 4, 10);
    scene.add(light);
  }

  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 6;
  // camera.position.set(0, 5, 0);

  const materialMeshPhong = new THREE.MeshPhongMaterial({
    color: 0xdd0000,
    flatShading: false, // объект выглядит "граненым" (true) / "гладким" (false)
    shininess: 30, // блеск от бликов
    // emissive: 0xdd0000, // излучающее (emissive) свойство материала Phong - это цвет, который будет рисоваться без попадания света на поверхность
  });
  // material.color.setHSL(0,1,.5);
  // material.flatShading = true
  // const m1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red
  // const m2 = new THREE.MeshBasicMaterial({ color: "red" }); // red
  // const m3 = new THREE.MeshBasicMaterial({ color: "#F00" }); // red
  // const m4 = new THREE.MeshBasicMaterial({ color: "rgb(255,0,0)" }); // red
  // const m5 = new THREE.MeshBasicMaterial({ color: "hsl(0,100%,50%)" }); // red

  const materialMeshStandard = new THREE.MeshStandardMaterial({
    color: 0xdd0000,
    flatShading: false,
    // emissive: 0xdd0000,
    roughness: 0.9, // шероховатость (0 - 1) - противоположность shininess
    metalness: 0.2, // металличность (0 - 1)
  });

  const radius = 1;
  const widthSegments = 10;
  const heigtSegments = 10;
  const sphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heigtSegments);

  const s1 = new THREE.Mesh(sphereGeometry, materialMeshPhong);
  s1.position.x = -1.5;
  scene.add(s1);

  const s2 = new THREE.Mesh(sphereGeometry, materialMeshStandard);
  s2.position.x = 1.5;
  scene.add(s2);

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

  // if (resizeRendererToDisplaySize(renderer)) {
  //   const canvas = renderer.domElement;
  //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //   camera.updateProjectionMatrix();
  // }
  // renderer.render(scene, camera);

  function render(time) {
    time *= 0.001; // конвертировать время в секунды

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    s1.rotation.x = time;
    s1.rotation.y = time;
    s2.rotation.x = time;
    s2.rotation.y = time;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
