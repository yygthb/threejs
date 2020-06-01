import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js";
import { MtlObjBridge } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";

let loadingManager = null;

function main() {
  let RESOURSES_LOADED = false;
  let objects = [];
  let listObj = [];
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
  camera.position.x = 0;
  camera.position.y = 7;
  camera.position.z = 15;
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

  // LOAD OBJECTS
  function _loadObjFromPublic(obj, mtlPath = "", objPath = "", meshName = "", objName = "", coord = [0, 0, 0]) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath || "", (mtlParseResult) => {
      const objLoader = new OBJLoader2();
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load(objPath, (root) => {
        root.name = meshName;
        listObj.push(meshName);
        obj.add(root);
      });
    });
    obj.name = objName;
    obj.position.x = coord[0] || 0;
    obj.position.y = coord[1] || 0;
    obj.position.z = coord[2] || 0;
    scene.add(obj);
    objects.push(obj);
  }

  // YELLOW CONE
  const yellowCone = new THREE.Object3D();
  _loadObjFromPublic(
    yellowCone,
    "../../models/raycaster_objs/yellowcone.mtl",
    "../../models/raycaster_objs/yellowcone.obj",
    "content__product_composition_yellowcone",
    "Yellow Cone",
    [-6, 0, 0]
  );

  // Kubik Rubika
  const kubik = new THREE.Object3D();
  _loadObjFromPublic(
    kubik,
    "../../models/raycaster_objs/kubik-rubika.mtl",
    "../../models/raycaster_objs/kubik-rubika.obj",
    "content__product_composition_kubikrubika",
    "Kubik Rubika",
    [-2, 0, 0]
  );

  // BLUE SPHERE
  const blueSphere = new THREE.Object3D();
  _loadObjFromPublic(
    blueSphere,
    "../../models/raycaster_objs/bluesphere.mtl",
    "../../models/raycaster_objs/bluesphere.obj",
    "content__product_composition_bluesphere",
    "Blue Sphere",
    [2, 0, 0]
  );

  // RED CUBE
  const redCube = new THREE.Object3D();
  _loadObjFromPublic(
    redCube,
    "../../models/raycaster_objs/redcube.mtl",
    "../../models/raycaster_objs/redcube.obj",
    "content__product_composition_redcube",
    "Red Cube",
    [6, 0, 0]
  );

  // console.log("scene: ", scene);
  console.log("objects: ", objects);

  function raycast() {
    const raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2(),
      INTERSECTED;

    console.log("li: ", listObj);

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
          } else {
            INTERSECTED.material.forEach((m) => {
              m.emissive.setHex(0x000000);
            });
          }
          INTERSECTED = null;
        }

        INTERSECTED = intersects[0].object;
        if (INTERSECTED.material.length === undefined) {
          console.log("TARGET.parent: ", INTERSECTED.parent.name);
          INTERSECTED.material.emissive.setHex(emissive);
        } else {
          console.log("TARGET: ", INTERSECTED.name);
          INTERSECTED.material.forEach((m) => {
            m.emissive.setHex(emissive);
            console.log("TARGET.parent: ", INTERSECTED.parent.name);
          });
        }
      } else {
        if (INTERSECTED) {
          if (INTERSECTED.material.length === undefined) {
            INTERSECTED.material.emissive.setHex(0x000000);
          } else {
            INTERSECTED.material.forEach((m) => {
              m.emissive.setHex(0x000000);
            });
          }
          INTERSECTED = null;
        }
      }
    }
  }
  raycast();

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

// // ---------------------------------------------------------------------------
// function _removeObj() {
//   objects.forEach((obj) => {
//     if (obj.children[0].children[0].material.length == undefined) {
//       obj.children[0].children[0].material.emissive.setHex(0x000000);
//     } else {
//       obj.children[0].children[0].material.forEach((m) => {
//         m.emissive.setHex(0x000000);
//       });
//     }
//   });
// }
// function _selectObj(id, target) {
//   _removeObj();
//   const list = document.getElementsByTagName("li");
//   // console.log("tagLi: ", list);
//   for (let item of list) {
//     item.style.backgroundColor = "white";
//   }
//   const link = document.getElementById(id);
//   if (link) {
//     link.style.backgroundColor = "lightgreen";
//   }
//   let targetObj = new THREE.Object3D();
//   targetObj = target.children[0].children[0];
//   // console.log("m: ", target.children[0].children[0].material.length);
//   if (target.children[0].children[0].material.length == undefined) {
//     console.log("targetObj: ", targetObj);
//     targetObj.material.emissive.setHex(emissive);
//   } else {
//     target.children[0].children[0].material.forEach((m) => {
//       console.log("m: ", m);
//       m.emissive.setHex(emissive);
//     });
//   }
// }

// // ORANGE TEST BUTTON
// const orangeButton = document.getElementById("button__content__product_orange");
// if (orangeButton) {
//   orangeButton.addEventListener("click", () => {
//     // console.log("orange button click");
//     objects.forEach((obj) => {
//       // console.log("obj.name: ", obj.name);
//     });
//     const hover = scene.getObjectByName("Yellow Cone");
//     console.log("obj: ", hover);
//     if (hover.children[0].children[0].material.length == undefined) {
//       hover.children[0].children[0].material.emissive.setHex(emissive);
//     } else {
//       console.log("t: ", target.children[0]);
//       hover.children[0].children[0].material.forEach((m) => {
//         m.emissive.setHex(emissive);
//       });
//     }
//   });
// }
// // <li> MOUSE HOVER
// const li = document.getElementsByTagName("li");
// for (let item of li) {
//   item.addEventListener("mouseover", () => {
//     item.style.backgroundColor = "lightgreen";
//     let name = "";
//     switch (item.id) {
//       case "content__product_composition_cone":
//         name = "Yellow Cone";
//         break;
//       case "content__product_composition_kubik":
//         name = "Kubik Rubika";
//         break;
//       case "content__product_composition_sphere":
//         name = "Blue Sphere";
//         break;
//       case "content__product_composition_cube":
//         name = "Red Cube";
//         break;
//     }
//     console.log("mouseover name: ", name);
//     const hover = scene.getObjectByName(name);
//     console.log("obj: ", hover);
//     if (hover.children[0].children[0].material.length == undefined) {
//       hover.children[0].children[0].material.emissive.setHex(emissive);
//     } else {
//       hover.children[0].children[0].material.forEach((m) => {
//         m.emissive.setHex(emissive);
//       });
//     }
//   });
//   item.addEventListener("mouseout", () => {
//     _removeObj();
//     item.style.backgroundColor = "white";
//   });
// }
