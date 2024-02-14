/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 ******************************************************************************/

import {
  toggleCursorDisplay,
  gyacView,
  grvView,
  sView,
  optionOpen,
  optionIntervalOpen,
  optionClose,
  isOptionPageOpen,
  optionBack,
} from "./views/toggleView.js";
import { renderObject } from "./views/THREE/renderThree.js";

import { getGameRotVec, getGyroAccel, getPedometer, cancelSensorDataSubscribe, setSensorInterval, resetGameRotVec } from "./services/mrcuService.js";
import { resetPedometer, stepCounter } from "./handler/handlePedometer.js";

// Determine the main view and only valid for "gameRotVec", "gyroAccel", "step".
let displayMode = "gameRotVec";
// Determine the subscription status of the "getSensorEventData" API.
let isGettingData = false;
// The interval value of "getSensorEventData" has a minimum of 10 and a maximum of 1000.
let sensorDataInterval = 100;

// The following three variables are necessary for playing video in step view.
let timer;
let prevStepForAni = 0;
let curStepForAni = 0;

const grv_btn = document.querySelector("#grv_btn");
const gyac_btn = document.querySelector("#gyac_btn");
const s_btn = document.querySelector("#s_btn");

const close_btn = document.querySelector("#close_btn");
const option_btn = document.querySelector("#option_btn");
const option_item_first = document.querySelector(".option_item.first");
const option_wrapper_first = document.querySelector(".option_wrapper.first");
const option_backbtn = document.querySelector(".top_btn.option_back_btn");

const ctrl_interval = document.querySelector("#ctrl_interval");
const interval_value_content = document.querySelector("#interval_value_content");

const sensor_data = document.querySelector(".sensor_data");

const step_video = document.querySelector("#step_video");
const step_guide = document.querySelector(".step_guide");
const cnt_wrapper = document.querySelector(".cnt_wrapper");

close_btn.addEventListener("click", () => {
  // If you want to use webOS.platformBack() method,
  // Set the "disableBackHistoryAPI" property to "true" in the appinfo.json file.

  // When the webOS.platformBack() method of webOSTV.js library is executed,
  // a popup asking whether to exit the app is displayed on webOS TV 6.0 or higher.

  // This action is same when back button key is pressed.
  webOS.platformBack();
});

option_btn.addEventListener("click", () => {
  optionOpen();

  if (displayMode === "step") {
    option_item_first.classList.add("disable");
  } else {
    option_item_first.classList.remove("disable");
  }
});

document.addEventListener("click", (e) => {
  if (isOptionPageOpen && !e.target.className.includes("option")) {
    optionClose();
  }
});

option_item_first.addEventListener("click", () => {
  // Disable "Set Sensor Interval" in step view.
  if (displayMode === "step") return;

  // Open option interval page
  optionIntervalOpen();
  setSensorInterval(sensorDataInterval);
});

option_backbtn.addEventListener("click", () => {
  // Go back option page
  optionBack();
});

// Rendering by THREE.js
renderObject();

document.addEventListener("click", (e) => {
  // When click menu tab
  if (e.target.className === "menu_item active") {
    if (isGettingData) cancelSensorDataSubscribe();
    isGettingData = false;

    // If display mode is not step counter, clear video timer and pause the video.
    if (e.target.id === "grv_btn" || e.target.id === "gyac_btn") clearStepView();
  }
});

grv_btn.addEventListener("click", () => {
  displayMode = "gameRotVec";
  grvView();
});

gyac_btn.addEventListener("click", () => {
  displayMode = "gyroAccel";
  gyacView();
});

s_btn.addEventListener("click", () => {
  displayMode = "step";
  sView();
});

document.addEventListener("keydown", (e) => {
  // Keycodes in MRCU input events mean:
  // Back button(461) Red(403) Green(404) Yellow(405) Blue(406)
  // See more MRCU input keycodes in this url:
  // https://webostv.developer.lge.com/develop/guides/magic-remote#magic-remote-control-unit

  switch (e.keyCode) {
    // Press back button then webOS.platformBack() method is executed.
    case 461:
      // If you want to use webOS.platformBack() method,
      // Set the "disableBackHistoryAPI" property to "true" in the appinfo.json file.
      webOS.platformBack();
      break;

    // Press red button then get/stop MRCU data
    case 403:
      if (isOptionPageOpen) return;

      if (isGettingData) {
        // Stop getting data
        cancelSensorDataSubscribe();

        if (displayMode === "gameRotVec") sensor_data.style.display = "none";
        if (displayMode === "step") clearStepView();
      } else {
        // Getting sensor data
        switch (displayMode) {
          case "gameRotVec":
            getGameRotVec();
            break;
          case "gyroAccel":
            getGyroAccel();
            break;
          case "step":
            getPedometer();

            cnt_wrapper.style.display = "flex";
            step_guide.innerHTML = "You are getting data ...";

            // If the step count changes at customized intervals(1200ms),
            // it is determined that the user is walking and the step video is played.
            timer = setInterval(() => {
              curStepForAni = stepCounter;
              if (prevStepForAni !== curStepForAni) {
                step_video.play();
              } else {
                step_video.pause();
              }
              prevStepForAni = curStepForAni;
            }, 1200);
            break;
          default:
            break;
        }
      }
      isGettingData = !isGettingData;
      break;

    // Press green button then reset game rotation vector value of MRCU
    case 404:
      if (displayMode === "gameRotVec") resetGameRotVec();
      break;

    // Press yellow button then hide/show cursor
    case 405:
      toggleCursorDisplay();
      break;

    // Press blue button then reset step counter value
    case 406:
      if (displayMode === "step") {
        console.log("Succeed to reset step counter");
        resetPedometer();
      }
      break;

    default:
      break;
  }
});

// Clear up about the step view.
const clearStepView = () => {
  cnt_wrapper.style.display = "none";
  step_guide.innerHTML = "Getting data is stopped.";
  step_video.pause();
  clearTimeout(timer);
};

// Control the sensor interval value by slider when option page is activated.
ctrl_interval.addEventListener("input", (e) => {
  let value = Number(e.target.value);
  interval_value_content.innerHTML = value;
  sensorDataInterval = value;

  setSensorInterval(sensorDataInterval);
});

document.addEventListener("keydown", (e) => {
  // Control the sensor interval value by MRCU key input when option page is activated.
  if (option_wrapper_first.style.display === "none" || option_wrapper_first.style.display === "") return;

  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    if (e.key === "ArrowUp") {
      if (sensorDataInterval >= 1000) return;
      sensorDataInterval += 10;
    } else if (e.key === "ArrowDown") {
      if (sensorDataInterval <= 10) return;
      sensorDataInterval -= 10;
    }

    ctrl_interval.value = sensorDataInterval;
    interval_value_content.innerHTML = sensorDataInterval;
    setSensorInterval(sensorDataInterval);
  }
});

export { sensorDataInterval };
