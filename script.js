const body = document.body;
const button = document.querySelectorAll(".btn");
let output = document.querySelector("#output");
let firstNumber;
let secondNumber;
let operator;
let isNewNumber = false;

// Initializes the event listeners on the buttons
function initializeCalculator() {
  button.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
  });
}
initializeCalculator();

// Handles button clicks
function handleButtonClick(e) {
  const btn = e.target;

  if (btn.textContent === "Reset") {
    resetCalculator();
  } else if (btn.textContent === "DEL") {
    handleDelete();
  } else if (/^[0-9.,]$/.test(btn.textContent)) {
    if (btn.textContent === ".") {
      // Prevent multiple decimal points in a number
      if (output.value.includes(".")) {
        return; // Don't add if a decimal point is already present
      }
    }
    handleNumberInput(btn.textContent);
    enableOperatorButtons(); // Enable operator buttons after a number is entered
  } else if (["+", "-", "/", "x", "."].includes(btn.textContent)) {
    handleOperatorInput(btn.textContent);
  } else if (btn.textContent === "=") {
    handleEquals(); // Ensure this function is called correctly
  }
}

// Resets the calculator
function resetCalculator() {
  output.value = "";
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
  isNewNumber = false;
  disableOperatorButtons(); // Disable operator buttons
}

// Deletes the last digit and updates the variables
function handleDelete() {
  if (output.value === "") return;
  output.value = output.value.slice(0, -1);
  updateNumbersAfterDelete();
}

function updateNumbersAfterDelete() {
  if (operator) {
    secondNumber = output.value ? Number(output.value) : undefined;
  } else {
    firstNumber = output.value ? Number(output.value) : undefined;
  }
}

// Processes number input
function handleNumberInput(number) {
  if (isNewNumber) {
    output.value = "";
    isNewNumber = false;
  }
  output.value += number;

  if (operator) {
    secondNumber = Number(output.value);
  } else {
    firstNumber = Number(output.value);
  }
}

// Processes operator input
function handleOperatorInput(op) {
  if (secondNumber !== undefined) {
    let result = calculate(firstNumber, secondNumber, operator);
    output.value = result;
    firstNumber = result;
    secondNumber = undefined;
  }

  operator = op === "x" ? "*" : op;
  isNewNumber = true;
}

// Calculates the result when = is pressed
function handleEquals() {
  if (firstNumber !== undefined && secondNumber !== undefined && operator) {
    let result = calculate(firstNumber, secondNumber, operator);
    output.value = result;

    // Store the intermediate result as firstNumber
    firstNumber = result;
    secondNumber = undefined;
    operator = undefined;
    isNewNumber = true; // To allow new input after the result
  }
}

// Performs the calculation based on the operator
function calculate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/":
      return firstNumber / secondNumber;
    default:
      return firstNumber;
  }
}

// Enables operator buttons
function enableOperatorButtons() {
  document.querySelectorAll(".btn").forEach((button) => {
    if (["+", "-", "/", "x", "."].includes(button.textContent)) {
      button.disabled = false;
    }
  });
}

// Disables operator buttons
function disableOperatorButtons() {
  document.querySelectorAll(".btn").forEach((button) => {
    if (["+", "-", "/", "x", "."].includes(button.textContent)) {
      button.disabled = true;
    }
  });
}

// Function to update theme based on slider value
function updateTheme() {
    const themeSlider = document.getElementById("themeSlider");
    const theme = themeSlider.value; // Get the slider value (1, 2, or 3)
    
    // Remove any existing theme classes
    body.classList.remove("theme-1", "theme-2", "theme-3");

    // Add the class corresponding to the selected theme
    body.classList.add(`theme-${theme}`);
}

// Add an event listener to update the theme when the slider changes
themeSlider.addEventListener("input", updateTheme);

// Initialize the default theme (theme 1)
body.classList.add("theme-1");

// Initially, disable the operators because no number has been entered yet
disableOperatorButtons();
