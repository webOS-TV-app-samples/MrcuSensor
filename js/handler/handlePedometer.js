/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 ******************************************************************************/

let stepCounter = 0;
const cnt_box = document.querySelector(".cnt_box");

// Reset "stepCounter" variable.
const resetPedometer = () => {
  stepCounter = 0;
  cnt_box.innerHTML = stepCounter;
};

// Update the pedometer data with the response received from the API call.
const handlePedometer = (res) => {
  if (res.returnValue) {
    // When an API response comes, the step count is increased.
    stepCounter += 1;
    cnt_box.innerHTML = stepCounter;
  }
};

export { stepCounter, handlePedometer, resetPedometer };
