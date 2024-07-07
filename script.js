document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");
  const display = document.querySelector(".display");
  const displayHistory = document.querySelector(".history");

  let firstOperand = null;
  let operator = null;
  let isNewNumber = false;

  function calc(firstOperand, operator, secondOperand) {
    switch (operator) {
      case "/":
        if (secondOperand === 0) {
          alert("0으로 나눌 수 없슈");
          return firstOperand;
        } else {
          return firstOperand / secondOperand;
        }
      case "*":
        return firstOperand * secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "+":
        return firstOperand + secondOperand;
      default:
        return secondOperand;
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = button.textContent;

      if (buttonText === "=") {
        if (firstOperand !== null && operator !== null) {
          const secondOperand = parseFloat(display.value);
          const result = calc(firstOperand, operator, secondOperand);
          display.value = result;
          firstOperand = result;
          operator = null;
          isNewNumber = true;

          displayHistory.value = display.value;
        }
      } else if (button.classList.contains("number")) {
        if (isNewNumber) {
          display.value = buttonText;
          isNewNumber = false;
        } else {
          if (display.value === "0" || operator !== null) {
            display.value = buttonText;
          } else {
            display.value += buttonText;
          }
        }
        displayHistory.value += buttonText;
      } else if (buttonText === "." && !display.value.includes(".")) {
        display.value += buttonText;
        displayHistory.value += buttonText;
        isNewNumber = false;
      } else if (buttonText === "C") {
        display.value = "0";
        firstOperand = null;
        operator = null;
        isNewNumber = false;
        displayHistory.value = "";
      } else if (buttonText === "±") {
        display.value = parseFloat(display.value) * -1;
        displayHistory.value = display.value;
      } else if (buttonText === "%") {
        display.value = parseFloat(display.value) / 100;
        displayHistory.value += "%";
        isNewNumber = true;
      } else if (button.classList.contains("operator")) {
        if (firstOperand === null) {
          firstOperand = parseFloat(display.value);
        } else if (operator !== null) {
          const secondOperand = parseFloat(display.value);
          const result = calc(firstOperand, operator, secondOperand);
          display.value = result;
          firstOperand = result;
        }
        operator = buttonText;
        isNewNumber = true;
        displayHistory.value += ` ${buttonText} `;
      }

      // /0을 누르면 히스토리에선 지워지게 설정. /\/\s*0/g정규식이라고함
      if (operator === "/" && parseFloat(display.value) === 0) {
        displayHistory.value = displayHistory.value.replace(/\/\s*0/g, "");
      }
    });
  });
});
