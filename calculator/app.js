// Global calculator state here
const calculatorState = {
  displayedEquation: [], // for calc top line view
  displayedValue: [], // for calc bottom line view
  userInput: [], // push displayedValue and operators to this array on operator clicks
  hasDecimal: false, // toggle when displayedValue has decimal
};

// Event listeners
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
  digit.addEventListener('click', (e) => {
    calculatorState.displayedValue.push(e.target.innerText);
    console.log(calculatorState.displayedValue);
  });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (calculatorState.displayedValue.length > 0) {
      let value = calculatorState.displayedValue.join('');
      calculatorState.userInput.push(value, e.target.innerText);
      console.log(calculatorState.userInput);
      calculatorState.displayedValue = [];
    }
  });
});

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
  if (calculatorState.userInput.length <= 1) {
    return 'TODO: set displayedValue to first item of user input if any';
  } else {
    let value = calculatorState.displayedValue.join('');
    calculatorState.userInput.push(value);
    calculatorState.displayedValue = evaluate();
  }
});

// Define operations here
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (num1, operator, num2) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case '×':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
    case '+':
      return add(num1, num2);
    case '−':
      return subtract(num1, num2);
  }
};

const evaluate = () => {
  let input = calculatorState.userInput;
  let display = calculatorState.displayedEquation;

  display = [...input].join(' ');

  while (input.includes('×') || input.includes('÷')) {
    let opIndex = input.findIndex((item) => item.match(/[×÷]/));
    let evalSegment = input.splice(opIndex - 1, 3);
    let evalSegmentResult = operate(...evalSegment).toString();
    input.splice(opIndex - 1, 0, evalSegmentResult);
  }

  while (input.includes('+') || input.includes('−')) {
    let opIndex = input.findIndex((item) => item.match(/[+−]/));
    let evalSegment = input.splice(opIndex - 1, 3);
    let evalSegmentResult = operate(...evalSegment).toString();
    input.splice(opIndex - 1, 0, evalSegmentResult);
  }

  console.log(display);
  console.log(input);
  return input;
};
