import * as THREE from "../three.module.js";

function main() {
  const canvas = document.querySelector("#c");

  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  // // Обработка дисплеев HD-DPI
  // renderer.setPixelRatio(window.devicePixelRatio);

  // camera
  // field of view - поле зрения (градус)
  const fov = 75;
  // соотношение сторон холста (значение по умолчанию 300/150 = 2)
  const aspect = 2;
  // пространство перед камерой (все, что до и после, будет обрезано)
  const near = 0.1;
  const far = 8;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  // scene
  const scene = new THREE.Scene();

  // hello cube:
  // BoxGeometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  // material
  // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  // Mesh
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = -2;

  scene.add(cube);
  // renderer.render(scene, camera);

  function makeCube(geometry, color, y) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = 2;
    cube.position.y = y;
    return cube;
  }
  const cubes = [makeCube(geometry, 0xf3f3f3, 2), makeCube(geometry, 0x1f4dff, 0), makeCube(geometry, 0xff1616, -2)];

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

  // animation
  function render(time) {
    time *= 0.001; // конвертировать время в секунды

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cube.rotation.x = time;
    cube.rotation.y = time;

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // add a light
  {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-5, 5, 5);
    scene.add(light);
  }
}

main();
