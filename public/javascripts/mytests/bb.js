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
  camera.position.set(-18, 6, 18);

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
    light.position.set(20, 15, 15);
    light2.position.set(-5, -10, -2);
    scene.add(light);
    scene.add(light.target);
    scene.add(light2);
    scene.add(light2.target);
  }

  const screen = new THREE.Object3D();
  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("../../models/bb/bb.mtl", (mtlParseResult) => {
      const objLoader = new OBJLoader2();
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load("../../models/bb/bb.obj", (root) => {
        screen.add(root);
        screen.scale.x = 0.1;
        screen.scale.y = 0.1;
        screen.scale.z = 0.1;
        screen.position.y = -4;
      });
    });
  }

  // const ledscreen = new THREE.Object3D();
  // ledscreen.add(screen);
  scene.add(screen);

  {
    // // KARKAS
    // const karkas = new THREE.Object3D();
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/karkas.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/karkas.obj", (root) => {
    //       karkas.add(root);
    //       karkas.name = "karkas";
    //     });
    //   });
    // }
    // // OBRAMLENIE
    // const obramlenie = new THREE.Object3D();
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/obramlenie.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/obramlenie.obj", (root) => {
    //       obramlenie.add(root);
    //       obramlenie.name = "karkas";
    //     });
    //   });
    // }
    // // UPRAVL
    // const upravl = new THREE.Object3D();
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/upravl.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/upravl.obj", (root) => {
    //       upravl.add(root);
    //       upravl.name = "upravl";
    //     });
    //   });
    // }
    // // SILA
    // const sila = new THREE.Object3D();
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/raspred.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/raspred.obj", (root) => {
    //       sila.add(root);
    //       sila.name = "sila";
    //     });
    //   });
    // }
    // // OSV
    // const osv = new THREE.Object3D();
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/osv.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/osv.obj", (root) => {
    //       osv.add(root);
    //       osv.name = "osv";
    //     });
    //   });
    // }
    // const leds = new THREE.Object3D();
    // const screen = new THREE.Object3D();
    // let mod = new THREE.Object3D();
    // let mod2 = new THREE.Object3D();
    // let mod3 = new THREE.Object3D();
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/module.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/module.obj", (root) => {
    //       mod.add(root);
    //       mod.position.x = 29.5 * 0;
    //       leds.add(mod);
    //     });
    //   });
    // }
    // {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load("../../models/bb/module.mtl", (mtlParseResult) => {
    //     const objLoader = new OBJLoader2();
    //     const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    //     objLoader.addMaterials(materials);
    //     objLoader.load("../../models/bb/module.obj", (root) => {
    //       mod2.add(root);
    //       mod2.position.x = 29.5 * 1;
    //       mod3.add(root);
    //       mod3.position.x = 29.5 * 2;
    //       leds.add(mod2);
    //       leds.add(mod3);
    //     });
    //   });
    // }
    // // LESSCREEN
    // const ledscreen = new THREE.Object3D();
    // ledscreen.add(karkas);
    // ledscreen.add(obramlenie);
    // ledscreen.add(upravl);
    // ledscreen.add(sila);
    // ledscreen.add(osv);
    // ledscreen.add(leds);
    // // ledscreen.add(screen);
    // ledscreen.position.y = -3;
    // ledscreen.scale.x = 0.1;
    // ledscreen.scale.y = 0.1;
    // ledscreen.scale.z = 0.1;
    // scene.add(ledscreen);
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

    // screen.rotation.x += 0.01;
    screen.rotation.y += 0.005;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
