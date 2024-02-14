/******************************************************************************
 * SPDX-FileCopyrightText: Copyright 2024 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 *
 * This file is option page component for setting the sensor interval.
 *
 ******************************************************************************/

class optionInterval extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="option_title">
        <button class="top_btn option_back_btn">
          <img src="./assets/ic_back_n.png" alt="back_button" class="option_back_btn_img" />
          <img src="./assets/ic_back_f.png" alt="back_button" class="option_back_btn_img" />
        </button>
        <div class="option_title_text">
          <div class="option_flow_text">Set Sensor Interval</div>
          <div class="option_flow_text">Set Sensor Interval</div>
        </div>
      </div>
      <div class="option_body">
        <div class="option_input_wrapper">
          <input type="range" id="ctrl_interval" class="option_slider" name="slider" min="10" max="1000" step="10" value="100" />
        </div>
        <div id="interval_value_content" class="option_interval_value">100</div>
      </div>
    `;
  }
}

window.customElements.define("option-interval", optionInterval);
