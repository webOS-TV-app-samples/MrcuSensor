/******************************************************************************
 * SPDX-FileCopyrightText: Copyright © 2010-2024 three.js authors
 * SPDX-License-Identifier: MIT
 * SPDX-PackageDownloadLocation: https://github.com/mrdoob/three.js
 ******************************************************************************/

import * as THREE from "three";
import { printData } from "../views/printData.js";
import { roundBox } from "../views/THREE/renderThree.js";

const quaternion = new THREE.Quaternion();
const sensor_data = document.querySelector(".sensor_data");

// Create the MRCU object in THREE.js to visualize.
// Rotate the MRCU using the quaternion value received from the API call.
const handleGameRotVec = (res) => {
  let quater = res.gameRotationVector;

  sensor_data.style.display = "block";
  printData(quater);
  quaternion.fromArray([-quater.x, -quater.y, -quater.z, quater.w]);
  roundBox.rotation.setFromQuaternion(quaternion);
};

export { handleGameRotVec };
