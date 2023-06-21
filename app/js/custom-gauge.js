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
      const elementValue = that.container.querySelector(".value");
      const visibleValue = that.container.querySelector(".visible-value");
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

    this.gauge = new Gauge(this.target);
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
        that.container.querySelectorAll(".ranges > span")
      ).map(function (container) {
        const colorName = Array.from(container.classList).filter(function (
          className
        ) {
          return className.startsWith("color-");
        })[0];

        return {
          color: colorName ? colorName.replace("color-", "") : undefined,
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
    document.querySelectorAll(
      ".gauge-container:not(.gauge-container-initialized)"
    )
  ).forEach(function (container) {
    const divContainer = container.querySelector(".container");
    const target = document.createElement("canvas");
    target.id = "gauge-canvas" + Date.now();
    divContainer.appendChild(target);

    const context = {
      container: container,
      target: target,
      digits: Number(
        Array.from(container.classList)
          .filter(function (className) {
            return className.startsWith("digits-");
          })[0]
          .replace("digits-", "")
      ),
    };

    container
      .querySelector(".refresher-always")
      .addEventListener("DOMSubtreeModified", initRanges.bind(context));
    container.classList.add("gauge-container-initialized");
    initRanges.bind(context)();
  });
})();
