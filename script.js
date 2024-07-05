document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");
  const display = document.querySelector(".display");

  let firstOperand = null;
  let operator = null;
  let isNewNumber = false;

  function calc(firstOperand, operator, secondOperand) {
    switch (operator) {
      case "/":
        if (secondOperand === 0) {
          return "0으로 나눌 수 없슈";
        }
        return firstOperand / secondOperand;
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
      //   console.log(button.textContent);
      const buttonText = button.textContent;

      if (buttonText === "=") {
        if (firstOperand !== null && operator !== null) {
          const secondOperand = parseFloat(display.value);
          const result = calc(firstOperand, operator, secondOperand);
          display.value = result;
          firstOperand = result;
          operator = null;
          isNewNumber = true;
        }
      }

      if (button.classList.contains("number")) {
        if (isNewNumber) {
          display.value += buttonText;
          operator = null;
        } else {
          if (display.value === "0" || operator !== null) {
            display.value = buttonText;
          } else {
            display.value += buttonText;
          }
        }
      } else if (buttonText === "." && !display.value.includes(".")) {
        display.value += buttonText;
      } else if (buttonText === "C") {
        display.value = "0";
        firstOperand = null;
        operator = null;
        isNewNumber = false;
      } else if (button.classList.contains("operator")) {
        if (firstOperand === null) {
          firstOperand = parseFloat(display.value);
          operator = buttonText;
          isNewNumber = false;
          console.log("firstOperand:", firstOperand);
          console.log("operator:", operator);
        } else {
          display.value = buttonText;
          firstOperand = parseFloat(display.value);
          operator = null;
          isNewNumber = true;
        }
      }
    });
  });
});
