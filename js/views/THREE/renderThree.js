/******************************************************************************
 * SPDX-FileCopyrightText: Copyright © 2010-2024 three.js authors
 * SPDX-License-Identifier: MIT
 * SPDX-PackageDownloadLocation: https://github.com/mrdoob/three.js
 *
 * This file renders the magic remote control image in three.js.
 * If you want render object in three.js,
 * you should install three.js or import from a CDN.
 *
 * Install guide URL
 * https://threejs.org/docs/index.html#manual/en/introduction/Installation
 *
 ******************************************************************************/

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const pi = Math.PI;
const canvasWidth = 1220;
const canvasHeight = 620;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.rotateX(-pi * 0.5);

const camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, 0.1, 1000);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);

const wrapper = document.querySelector("#canvas");
wrapper.appendChild(renderer.domElement);

// This following code is to render the MRCU object.
const loader = new THREE.TextureLoader();
const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.9 });
const cubeMaterials = new Array(6).fill(sideMaterial);
cubeMaterials[4] = new THREE.MeshBasicMaterial({ map: loader.load("./assets/mrcu-front.png"), transparent: true, opacity: 0.9 });
cubeMaterials[5] = new THREE.MeshBasicMaterial({ map: loader.load("./assets/mrcu-back.png"), transparent: true, opacity: 0.9 });

const roundBoxGeometry = new RoundedBoxGeometry(1.2, 5, 1, 3, 0.3);
const roundBox = new THREE.Mesh(roundBoxGeometry, cubeMaterials);

scene.add(roundBox);

const renderObject = () => {
  requestAnimationFrame(renderObject);
  renderer.render(scene, camera);
};

export { roundBox, renderObject };
