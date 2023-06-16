# Opinionated Gauge

This is a basic example of an implementation of the library gauge.js

## How to:

Create an HTML with all the gauge graphics you want but they need this structure:

```
    <div data-gauge-id="gauge-container" data-digits="0">
      <div data-gauge-id="container"></div>
      <div
        data-gauge-id="visibleValue"
        style="
          display: block;
          font-size: 30px;
          text-align: center;
          margin-top: -15px;
        "
      ></div>
      <div data-refresher="always" style="display: none">
        <div data-gauge-id="value">{THE TEST VALUE}</div>
        <div data-gauge-id="ranges">
          <span data-color="{HEX_COLOR}">{MIN RANGE}</span>
          <span data-color="{HEX_COLOR}">{ANOTHER RANGE}</span>
          ...
          <span data-color="{HEX_COLOR}">{ANOTHER RANGE}</span>
          <span>{MAX RANGE}</span>
        </div>
      </div>
    </div>
```

Please see example

## Build

You can download this code, and run `yarn build` to have the minified JS with the gauge library and this opinionated implementation if you want an easy way to add this in your project
