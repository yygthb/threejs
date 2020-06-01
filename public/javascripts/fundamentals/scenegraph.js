import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { GUI } from "https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js";

function main() {
  const canvas = document.querySelector("#c");

  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas });

  // scene
  const scene = new THREE.Scene();

  // camera
  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 0);
  // camera.position.set(0, 150, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  // источник света
  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  // geometry
  const objects = [];
  // 1 сфера
  const radius = 1;
  const widthSegments = 6;
  const heigtSegments = 6;
  const sphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heigtSegments);
  // Солнечная система
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);
  // Солнце
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5); // увеличить размеры sphereGeometry
  // scene.add(sunMesh);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);
  // // Земля
  // const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
  // const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  // earthMesh.position.x = 10;
  // // scene.add(earthMesh);
  // // sunMesh.add(earthMesh); // earthMesh - ребенок пространства sunMesh и, соответственно, масштаб Земли и расстояние до Солнца увеличены x5 (scale.set). Чтобы это исправить введен объект solarSystem
  // solarSystem.add(earthMesh);
  // objects.push(earthMesh);

  // Орбита земли
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);
  // Земля
  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);
  // Луна
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);
  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  // CSS
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

  // Turns both axes and grid visible on/off
  // GUI requires a property that returns a bool
  // to decide to make a checkbox so we make a setter
  // can getter for `visible` which we can tell GUI
  // to look at.
  const gui = new GUI();
  class AxisGridHelper {
    constructor(node, units = 10) {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2; // after the grid
      node.add(axes);

      const grid = new THREE.GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }
    get visible() {
      return this._visible;
    }
    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, "visible").name(label);
  }

  makeAxisGrid(solarSystem, "solarSystem", 26);
  makeAxisGrid(sunMesh, "sunMesh");
  makeAxisGrid(earthOrbit, "earthOrbit");
  makeAxisGrid(earthMesh, "earthMesh");
  makeAxisGrid(moonMesh, "moonMesh");

  // animation
  function render(time) {
    time *= 0.001; // конвертировать время в секунды

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time;
    });

    // // оси для сфер
    // objects.forEach((node) => {
    //   const axes = new THREE.AxesHelper();
    //   axes.material.depthTest = false;
    //   axes.renderOrder = 1;
    //   node.add(axes);
    // });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
