/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file is for the accelerometer value graph.
 *
 ******************************************************************************/

const gx_bar = document.querySelector("#gx_bar");
const gy_bar = document.querySelector("#gy_bar");
const gz_bar = document.querySelector("#gz_bar");
const gt_bar = document.querySelector("#gt_bar");

const ax_bar = document.querySelector("#ax_bar");
const ay_bar = document.querySelector("#ay_bar");
const az_bar = document.querySelector("#az_bar");
const at_bar = document.querySelector("#at_bar");

const gx_bar_value = document.querySelector("#gx_bar_value");
const gy_bar_value = document.querySelector("#gy_bar_value");
const gz_bar_value = document.querySelector("#gz_bar_value");
const gt_bar_value = document.querySelector("#gt_bar_value");

const ax_bar_value = document.querySelector("#ax_bar_value");
const ay_bar_value = document.querySelector("#ay_bar_value");
const az_bar_value = document.querySelector("#az_bar_value");
const at_bar_value = document.querySelector("#at_bar_value");

const leftRightView = (target, value) => {
  if (value > 0) {
    target.style.left = "50%";
    target.style.right = "auto";
  } else {
    target.style.right = "50%";
    target.style.left = "auto";
  }
};

const drawing = (res, x_bar, y_bar, z_bar, t_bar, x_bar_value, y_bar_value, z_bar_value, t_bar_value) => {
  let x = res.x;
  let y = res.y;
  let z = res.z;

  // Total vector length
  let len = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

  leftRightView(x_bar, x);
  leftRightView(y_bar, y);
  leftRightView(z_bar, z);

  x_bar.style.width = `${Math.abs(x) * 5}px`;
  y_bar.style.width = `${Math.abs(y) * 5}px`;
  z_bar.style.width = `${Math.abs(z) * 5}px`;
  t_bar.style.width = `${Math.abs(len) * 5}px`;

  if (x > 0) x_bar_value.innerHTML = `+${x.toFixed(7)}`;
  else x_bar_value.innerHTML = `${x.toFixed(7)}`;

  if (y > 0) y_bar_value.innerHTML = `+${y.toFixed(7)}`;
  else y_bar_value.innerHTML = `${y.toFixed(7)}`;

  if (z > 0) z_bar_value.innerHTML = `+${z.toFixed(7)}`;
  else z_bar_value.innerHTML = `${z.toFixed(7)}`;

  t_bar_value.innerHTML = `${len.toFixed(7)}`;
};

const drawGraph = (gyro, acc) => {
  drawing(gyro, gx_bar, gy_bar, gz_bar, gt_bar, gx_bar_value, gy_bar_value, gz_bar_value, gt_bar_value);
  drawing(acc, ax_bar, ay_bar, az_bar, at_bar, ax_bar_value, ay_bar_value, az_bar_value, at_bar_value);
};

const graphInit = () => {
  gx_bar.style.width = `0px`;
  gy_bar.style.width = `0px`;
  gz_bar.style.width = `0px`;
  gt_bar.style.width = `0px`;

  gx_bar_value.innerHTML = "";
  gy_bar_value.innerHTML = "";
  gz_bar_value.innerHTML = "";
  gt_bar_value.innerHTML = "";

  ax_bar.style.width = `0px`;
  ay_bar.style.width = `0px`;
  az_bar.style.width = `0px`;
  at_bar.style.width = `0px`;

  ax_bar_value.innerHTML = "";
  ay_bar_value.innerHTML = "";
  az_bar_value.innerHTML = "";
  at_bar_value.innerHTML = "";
};

export { drawGraph, graphInit };
