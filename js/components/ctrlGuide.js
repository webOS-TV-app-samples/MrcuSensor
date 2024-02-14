/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file is component for the color key guide.
 *
 ******************************************************************************/

const guide = {
  red: "Get/Stop Data",
  green: "Reset MRCU",
  yellow: "Hide/Show Cursor",
  blue: "Reset Step Counter",
};

class ctrlGuide extends HTMLElement {
  connectedCallback() {
    let color = this.getAttribute("color");
    let name = this.getAttribute("name");
    this.className = `${name} ctrl_item`;

    this.innerHTML = `
      <img src="./assets/colorkey_${color}.png" alt="color_key_${color}" />
      <div>${guide[color]}</div>
    `;
  }
}

window.customElements.define("ctrl-guide", ctrlGuide);
