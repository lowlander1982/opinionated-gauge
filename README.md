# Opinionated Gauge

This is a basic example of an implementation of the library gauge.js

## How to:

Create an HTML with all the gauge graphics you want but they need this structure:

```
    <div class="gauge-container digits-0">
      <div class="container"></div>
      <div
        class="visible-value"
        style="
          display: block;
          font-size: 30px;
          text-align: center;
          margin-top: -15px;
        "
      ></div>
      <div class="refresher-always" style="display: none">
        <div class="error-message">{ERROR MESSAGE}</div>
        <div class="value">{THE TEST VALUE}</div>
        <div class="ranges">
          <span class="color-{HEX_COLOR}">{MIN RANGE}</span>
          <span class="color-{HEX_COLOR}">{ANOTHER RANGE}</span>
          ...
          <span class="color-{HEX_COLOR}">{ANOTHER RANGE}</span>
          <span>{MAX RANGE}</span>
        </div>
      </div>
    </div>
```

Please see example

## Install

`yarn`

## Build

You can download this code, and run `yarn build` to have the minified JS with the gauge library and this opinionated implementation if you want an easy way to add this to your project

## Run

If you want to see this live, download the repo and run `yarn develop`

## Considerations

The minified version of the javascript was added to the repo for easy install, but pipelines are TBD
