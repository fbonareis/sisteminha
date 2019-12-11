import React from "react";
import { storiesOf, addDecorator, addParameters } from "@storybook/react";

import { withA11y } from "@storybook/addon-a11y";

addDecorator(withA11y);
addParameters({
  a11y: {
    element: "#root", // optional selector which element to inspect
    config: {}, // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
    options: {} // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
  }
});

storiesOf("button", module)
  .add("Accessible", () => (
    <button
      title="dasd"
      style={{ lineHeight: 1.5, backgroundColor: "black", color: "white" }}
    >
      Accessible button
    </button>
  ))
  .add("Inaccessible", () => (
    <button style={{ backgroundColor: "black", color: "black" }}>
      Inaccessible button
    </button>
  ));
