(function () {
  function processNumber(value, digits) {
    if (digits) {
      return Number(
        parseFloat(value.trim().replaceAll(",", ".")).toFixed(digits)
      );
    }

    return Number(value.trim().replaceAll(",", "."));
  }

  function refresh() {
    const that = this;
    setTimeout(function () {
      const elementValue = that.container.querySelector(
        '[data-gauge-id="value"]'
      );
      const visibleValue = that.container.querySelector(
        '[data-gauge-id="visibleValue"]'
      );
      visibleValue.innerText = processNumber(elementValue.innerText);
      visibleValue.style.width = that.target.clientWidth + "px";
      const val = processNumber(elementValue.innerText, that.digits);

      if (isNaN(val)) {
        that.gauge.set(0);
        return;
      }

      that.gauge.set(val);
    }, 0);
  }

  function initGauge(values) {
    const opts = {
      lines: 12,
      angle: 0.054,
      lineWidth: 0.54,
      pointer: {
        length: 0.8,
        strokeWidth: 0.035,
        color: "#000000",
      },
      staticZones: values
        .map(function (value, index, values) {
          return {
            strokeStyle: value.color ? value.color.toUpperCase() : undefined,
            min: value.value,
            max: values[index + 1] ? values[index + 1].value : undefined,
          };
        })
        .filter(function (value) {
          return value.max !== undefined;
        }),
      staticLabels: {
        font: "10px sans-serif",
        labels: values.map(function (value) {
          return value.value;
        }),
        color: "#000000",
        fractionDigits: parseInt(this.digits),
      },
      limitMax: "false",
      percentColors: [
        [0.0, "#a9d70b"],
        [0.5, "#f9c802"],
        [1.0, "#ff0000"],
      ],
      strokeColor: "#E0E0E0",
      generateGradient: true,
    };

    this.gauge.setOptions(opts);
    this.gauge.minValue = values[0].value;
    this.gauge.maxValue = values[values.length - 1].value;
    this.gauge.animationSpeed = 12;

    refresh.bind(this)();
  }

  function initRanges() {
    const that = this;
    setTimeout(function () {
      const values = Array.from(
        that.container.querySelectorAll('[data-gauge-id="ranges"] > span')
      ).map(function (container) {
        return {
          color: container.dataset.color,
          value: processNumber(container.innerText, that.digits),
        };
      });

      if (
        values.some(function (value) {
          return isNaN(value.value);
        })
      ) {
        return;
      }

      initGauge.bind(that)(values);
    }, 0);
  }

  Array.from(
    document.querySelectorAll('[data-gauge-id="gauge-container"]')
  ).forEach(function (container) {
    const divContainer = container.querySelector('[data-gauge-id="container"]');
    const target = document.createElement("canvas");
    target.id = "gauge-canvas" + Date.now();
    divContainer.appendChild(target);
    const gauge = new Gauge(target);

    const context = {
      container: container,
      target: target,
      gauge: gauge,
      digits: container.dataset.digits,
    };

    container
      .querySelector('[data-refresher="always"]')
      .addEventListener("DOMSubtreeModified", initRanges.bind(context));
    initRanges.bind(context)();
  });
})();
