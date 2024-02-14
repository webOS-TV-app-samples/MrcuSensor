/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file is for toggling the view.
 *
 ******************************************************************************/
// Cursor toggle
let isCursorVisible = true;

// Toggle cursor state
const toggleCursorDisplay = () => {
  isCursorVisible = !isCursorVisible;
  if (isCursorVisible) {
    // webOSSystem.setCursor() method sets the custom cursor shape for the app.
    // Restore to default cursor state.
    webOSSystem.setCursor("default");
  } else {
    // Set the cursor to blank using blank cursor image.
    window.webOSSystem.setCursor("./assets/cursor_blank_image.png");
  }
};

// Option page toggle
const option_wrapper_main = document.querySelector(".option_wrapper.main");
const option_wrapper_first = document.querySelector(".option_wrapper.first");
let isOptionPageOpen = false;

const optionOpen = () => {
  option_wrapper_main.style.display = "block";
  isOptionPageOpen = true;
};

const optionIntervalOpen = () => {
  option_wrapper_first.style.display = "block";
  option_wrapper_main.style.display = "none";
  isOptionPageOpen = true;
};

const optionClose = () => {
  option_wrapper_main.style.display = "none";
  option_wrapper_first.style.display = "none";
  isOptionPageOpen = false;
};

const optionBack = () => {
  option_wrapper_first.style.display = "none";
  option_wrapper_main.style.display = "block";
};

// Display mode toggle
const grv_btn = document.querySelector("#grv_btn");
const gyac_btn = document.querySelector("#gyac_btn");
const s_btn = document.querySelector("#s_btn");

const sub_title = document.querySelector(".sub_title");

const grv_wrapper = document.querySelector(".grv_wrapper");
const gyac_wrapper = document.querySelector(".gyac_wrapper");
const step_wrapper = document.querySelector(".step_wrapper");

const grvView = () => {
  sub_title.innerHTML = "Game Rotation Vector";

  grv_wrapper.style.display = "flex";
  gyac_wrapper.style.display = "none";
  step_wrapper.style.display = "none";

  grv_btn.classList.add("active");
  gyac_btn.classList.remove("active");
  s_btn.classList.remove("active");
};

const gyacView = () => {
  sub_title.innerHTML = "Gyroscope / Accelerometer";

  grv_wrapper.style.display = "none";
  gyac_wrapper.style.display = "flex";
  step_wrapper.style.display = "none";

  grv_btn.classList.remove("active");
  gyac_btn.classList.add("active");
  s_btn.classList.remove("active");
};

const sView = () => {
  sub_title.innerHTML = "Step Counter";

  grv_wrapper.style.display = "none";
  gyac_wrapper.style.display = "none";
  step_wrapper.style.display = "flex";

  grv_btn.classList.remove("active");
  gyac_btn.classList.remove("active");
  s_btn.classList.add("active");
};

export { toggleCursorDisplay, optionOpen, optionIntervalOpen, optionClose, optionBack, isOptionPageOpen, gyacView, grvView, sView };
