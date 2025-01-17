document.addEventListener('DOMContentLoaded', () => {
    // Get the input display
    const display = document.querySelector('.input');
  
    // Get all the buttons
    const buttons = document.querySelectorAll('button');
  
    // Initialize variables for the current and previous input, and the operator
    let currentInput = '';
    let previousInput = '';
    let operator = null;
  
    // Add event listeners to all buttons
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });
  
    // Function to handle button clicks
    function handleButtonClick(event) {
      const value = event.target.textContent;
  
      if (!isNaN(value) || (value === '.' && !currentInput.includes('.'))) {
        // If the button is a number or the first decimal point, append it to the current input
        currentInput += value;
        updateDisplay(currentInput);
      } else if (value === 'AC') {
        // Clear everything
        clearCalculator();
      } else if (value === 'X') {
        // Remove the last character
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
      } else if (value === '=') {
        // Perform the calculation
        if (previousInput && operator) {
          currentInput = calculate(previousInput, currentInput, operator).toString();
          operator = null;
          previousInput = '';
          updateDisplay(currentInput);
        }
      } else {
        // Handle operators (+, -, *, /, %)
        if (currentInput) {
          if (previousInput && operator) {
            previousInput = calculate(previousInput, currentInput, operator).toString();
          } else {
            previousInput = currentInput;
          }
          currentInput = '';
          operator = value;
          updateDisplay(previousInput + ' ' + operator);
        }
      }
    }
  
    // Function to update the display
    function updateDisplay(value) {
      display.value = value || '0';
    }
  
    // Function to clear the calculator
    function clearCalculator() {
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay('0');
    }
  
    // Function to perform calculations
    function calculate(a, b, operator) {
      a = parseFloat(a);
      b = parseFloat(b);
  
      if (isNaN(a) || isNaN(b)) return 0;
  
      switch (operator) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return b !== 0 ? a / b : 'Error: Division by zero';
        case '%':
          return a % b;
        default:
          return 0;
      }
    }
  });