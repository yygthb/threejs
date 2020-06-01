import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js";
import { MtlObjBridge } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

let loadingManager = null;

function main() {
  let objects = [];
  let emissive = 0x008000;

  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  // CAMERA
  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(10, 10, 10);
  camera.position.x = -18;
  camera.position.y = 18;
  camera.position.z = 20;
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
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
      const intensity1 = 1;
      const intensity2 = 0.5;
      const light = new THREE.DirectionalLight(color, intensity1);
      const light2 = new THREE.DirectionalLight(color, intensity2);
      light.position.set(-10, 18, 20);
      light2.position.set(18, -18, -20);
      scene.add(light);
      scene.add(light.target);
      // scene.add(light2);
      // scene.add(light2.target);
    }
  }

  // OBJ MOUSEMOVE
  function _objectLinkSetBackgroundColor(id) {
    let objectLink = document.getElementById(id);
    objectLink.style.backgroundColor = "lightgreen";
  }
  function _objectLinkRemoveBackgroundColor(id) {
    let objectLink = document.getElementById(id);
    objectLink.style.backgroundColor = "white";
  }

  function _raycast() {
    const raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2(),
      INTERSECTED;

    const div = document.getElementsByClassName("content__product_composition_ul");
    objects.forEach((object) => {
      div[0].insertAdjacentHTML(
        "beforeend",
        `
        <li>
          <a href="#"  id="${object.name}">${object.name}</a>
        </li>
      `
      );
    });

    // canvas.addEventListener("mousedown", onDocumentMouseEvent, false);
    canvas.addEventListener("mousemove", onDocumentMouseEvent, false);

    function onDocumentMouseEvent(event) {
      event.preventDefault();
      mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      let intersects = raycaster.intersectObjects(objects, true);
      if (intersects.length > 0) {
        if (INTERSECTED) {
          if (INTERSECTED.material.length === undefined) {
            INTERSECTED.material.emissive.setHex(0x000000);
            _objectLinkRemoveBackgroundColor(INTERSECTED.name);
          } else {
            INTERSECTED.material.forEach((m) => {
              m.emissive.setHex(0x000000);
            });
            _objectLinkRemoveBackgroundColor(INTERSECTED.name);
          }
          INTERSECTED = null;
        }

        INTERSECTED = intersects[0].object;
        if (INTERSECTED.material.length === undefined) {
          INTERSECTED.material.emissive.setHex(emissive);
          // console.log("TARGET: ", INTERSECTED.name);
          _objectLinkSetBackgroundColor(INTERSECTED.name);
        } else {
          INTERSECTED.material.forEach((m) => {
            m.emissive.setHex(emissive);
          });
          // console.log("TARGET: ", INTERSECTED.name);
          _objectLinkSetBackgroundColor(INTERSECTED.name);
        }
      } else {
        if (INTERSECTED) {
          if (INTERSECTED.material.length === undefined) {
            INTERSECTED.material.emissive.setHex(0x000000);
            _objectLinkRemoveBackgroundColor(INTERSECTED.name);
          } else {
            INTERSECTED.material.forEach((m) => {
              m.emissive.setHex(0x000000);
            });
            _objectLinkRemoveBackgroundColor(INTERSECTED.name);
          }
          INTERSECTED = null;
        }
      }
    }

    // LINKS MOUSEOVER
    objects.forEach((object) => {
      const li = document.getElementById(object.name);
      li.addEventListener("mouseover", () => {
        li.style.backgroundColor = "lightgreen";
        // console.log(`mouseover on ${object.name}`);
        // console.log("object: ", object);
        if (object.material.length === undefined) {
          object.material.emissive.setHex(emissive);
        } else {
          object.material.forEach((m) => {
            m.emissive.setHex(emissive);
          });
        }
      });
      li.addEventListener("mouseout", () => {
        li.style.backgroundColor = "white";
        if (object.material.length === undefined) {
          object.material.emissive.setHex(0x000000);
        } else {
          object.material.forEach((m) => {
            m.emissive.setHex(0x000000);
          });
        }
      });
    });
  }

  let manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    // console.log("manager onload");
    _raycast();
  };

  // OBJECT LOAD
  const ledScreen = new THREE.Object3D();
  {
    const mtlLoader = new MTLLoader(manager);
    mtlLoader.load("../../models/newBB/bb.mtl", (mtlParseResult) => {
      const objLoader = new OBJLoader2(manager);
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load("../../models/newBB/bb.obj", (root) => {
        root.scale.x = 0.1;
        root.scale.y = 0.1;
        root.scale.z = 0.1;
        ledScreen.add(root);

        root.children.forEach((child) => {
          objects.push(child);
        });
      });
    });
    scene.add(ledScreen);
  }

  console.log("objects: ", objects);

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

    // ledScreen.rotation.x += 0.01;
    // ledScreen.rotation.y += 0.005;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
