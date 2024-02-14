/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file is component for the graph bar of gyroscope and accelerometer.
 *
 ******************************************************************************/

class graphBar extends HTMLElement {
  connectedCallback() {
    let i = this.getAttribute("i");
    let text = this.getAttribute("text");
    this.className = "bar_wrapper";

    if (text === "total") {
      this.innerHTML = `
        <div class="bar_label">${text}</div>
        <div class="bar_back">
          <div class="bar" id=${i}></div>
        </div>
        <div class="bar_value" id="${i}_value"></div>
      `;
    } else {
      this.innerHTML = `
        <div class="bar_label">${text}</div>
        <div class="bar_back">
          <div class="bar" id=${i}></div>
        </div>
        <div class="pmz">
          <div>-</div>
          <div>0</div>
          <div>+</div>
        </div>
        <div class="bar_value" id="${i}_value"></div>
      `;
    }
  }
}

window.customElements.define("graph-bar", graphBar);
