/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file show the sensor data of the game rotation vector.
 *
 ******************************************************************************/

export function printData(gameRotVec) {
  const x = document.querySelector("#x");
  const y = document.querySelector("#y");
  const z = document.querySelector("#z");
  const w = document.querySelector("#w");

  const sensor_data = document.querySelector(".sensor_data");
  sensor_data.style.display = "block";

  x.innerHTML = `x : ${gameRotVec.x.toFixed(7)}`;
  y.innerHTML = `y : ${gameRotVec.y.toFixed(7)}`;
  z.innerHTML = `z : ${gameRotVec.z.toFixed(7)}`;
  w.innerHTML = `w : ${gameRotVec.w.toFixed(7)}`;
}
