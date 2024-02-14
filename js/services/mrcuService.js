/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file is about Luna Service APIs of MRCU service.
 * API url : https://webostv.developer.lge.com/develop/references/magic-remote#getsensordata
 * TODO : new url
 *
 * If you want more information about Luna Service API call, then refer this url:
 * https://webostv.developer.lge.com/develop/references/luna-service-introduction#luna-service-api-introduction
 *
 ******************************************************************************/

import { handleGameRotVec } from "../handler/handleGameRotVec.js";
import { handleGyroAccel } from "../handler/handleGyroAccel.js";
import { handlePedometer } from "../handler/handlePedometer.js";

import { sensorDataInterval } from "../main.js";

// API request to get the game rotation vector values with subscription.
const getGameRotVec = () => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/getSensorEventData",
    parameters: { sensorType: "gameRotationVector", subscribe: true },
    onSuccess: function (res) {
      if (res.subscribed) setSensorInterval(sensorDataInterval);

      handleGameRotVec(res);
      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to get sensor data");
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

// API request to get the gyroscope and accelerometer values with subscription.
const getGyroAccel = () => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/getSensorEventData",
    parameters: { sensorType: "gyroscope, accelerometer", subscribe: true },
    onSuccess: function (res) {
      if (res.subscribed) setSensorInterval(sensorDataInterval);

      handleGyroAccel(res);
      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to get sensor data");
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

// API request to get the pedometer values with subscription.
const getPedometer = () => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/getSensorEventData",
    parameters: { sensorType: "pedometer", subscribe: true },
    onSuccess: function (res) {
      if (res.subscribed) {
        // Sensor interval is fixed at 100 in step view.
        setSensorInterval(100);
      } else {
        handlePedometer(res);
      }

      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to get sensor data");
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

// API request to reset game rotation vector value of MRCU.
const resetGameRotVec = () => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/resetQuaternion",
    onSuccess: function () {
      console.log("Succeeded to reset the game roation vector sensor");
      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to reset sensor: " + inError.errorText);
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

// API request to cancel the currently active subscription.
const cancelSensorDataSubscribe = () => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/cancelSensorDataSubscribe",
    parameters: {},
    onSuccess: function () {
      console.log("Succeed to cancel subscription");
      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to cancel subscription " + inError.errorText);
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

// API request to get the currently set sensor interval value.
const getSensorInterval = () => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/getSensorInterval",
    parameters: {},
    onSuccess: function (res) {
      console.log("Succeed to get Sensor interval");
      console.log("Sensor Interval is ", res.interval, "api value");
      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to get Sensor interval " + inError.errorText);
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

// API request to set the sensor interval value you want as a parameter.
const setSensorInterval = (value) => {
  webOS.service.request("luna://com.webos.service.mrcu", {
    method: "sensor2/setSensorInterval",
    parameters: { interval: value },
    onSuccess: function () {
      console.log("Succeed to set sensor interval");
      console.log("Sensor Interval Value sets ", value);
      return true;
    },
    onFailure: function (inError) {
      console.log("Failed to set sensor data");
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      return;
    },
  });
};

export { getGameRotVec, getGyroAccel, getPedometer, resetGameRotVec, cancelSensorDataSubscribe, getSensorInterval, setSensorInterval };
