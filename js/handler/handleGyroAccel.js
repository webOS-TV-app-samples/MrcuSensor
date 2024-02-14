/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 ******************************************************************************/

import { drawGraph } from "../views/drawGraph.js";

// Update the sensor data graph with the response received from the API call.
const handleGyroAccel = (res) => {
  let gyro = res.gyroscope;
  let acc = res.accelerometer;

  drawGraph(gyro, acc);
};

export { handleGyroAccel };
