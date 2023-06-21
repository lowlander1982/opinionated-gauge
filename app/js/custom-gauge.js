(function () {
  function processNumber(value) {
    return parseFloat(value.trim().replaceAll(",", "."));
  }

  function initGauge(values) {
    const elementValue = this.container.querySelector(".value");
    const visibleValue = this.container.querySelector(".visible-value");
    const val = processNumber(elementValue.innerText);

    if (isNaN(val)) {
      const ctx = this.target.getContext("2d");
      const canvasX = this.target.width / 2;
      const canvasY = this.target.height / 2;
      const errorMessage = this.container.querySelector(".error-message");
      visibleValue.innerText = "";

      ctx.font = "30px Arial, Helvetica, sans-serif";
      ctx.textAlign = "center";
      ctx.clearRect(0, 0, this.target.width, this.target.height);
      ctx.fillText(errorMessage.innerText, canvasX, canvasY);

      return;
    }

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
        fractionDigits: parseInt(this.digits || "0"),
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
    this.gauge.set(val);

    visibleValue.innerText = processNumber(elementValue.innerText);
    visibleValue.style.width = this.target.clientWidth + "px";
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
          value: processNumber(container.innerText),
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
