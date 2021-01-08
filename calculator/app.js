// Calculator state

// Visual variables - what's visual should be strings
let topView = '';
let bottomView = '';

// Logic variables - what's working behind the scenes
let equation = [];
let input = '';

const updateView = () => {
  topView = equation.join('');
  bottomView = input;
  document.querySelector('.top').innerText = `${topView}`;
  document.querySelector('.bottom').innerText = `${bottomView}`;
};

// Event listeners for digits
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
  digit.addEventListener('click', (e) => {
    input += e.target.innerText;
    updateView();
  });
});

// Event listeners for operators
const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (input) {
      equation.push(input, e.target.innerText);
      input = '';
    }
    if (equation[equation.length - 1]?.match(/[×÷+−]/)) {
      equation.splice(-1, 1, e.target.innerText);
    }
    updateView();
  });
});

// Equal event listener
document.querySelector('.equal').addEventListener('click', () => {
  equation.push(input);
  input = evaluate();
  updateView();
  equation = [];
});

// Clear one
document.querySelector('.c').addEventListener('click', () => {
  input = input.slice(0, -1);
  updateView();
});

// All clear
document.querySelector('.ac').addEventListener('click', () => {
  [topView, bottomView, equation, input] = ['', '', [], ''];
  updateView();
});

// Calculator functions
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
      if (num2 === 0) {
        return '(ノಠ益ಠ)ノ彡 ¡0 ʎq ǝpᴉʌᴉp ʇ,uɐɔ I';
      }
      return divide(num1, num2);
    case '+':
      return add(num1, num2);
    case '−':
      return subtract(num1, num2);
  }
};

const evaluate = () => {
  let evalEquation = [...equation];

  while (evalEquation.includes('×') || evalEquation.includes('÷')) {
    let opIndex = evalEquation.findIndex((item) => item.match(/[×÷]/));
    let segment = evalEquation.splice(opIndex - 1, 3);
    let segmentResult = operate(...segment).toString();
    evalEquation.splice(opIndex - 1, 0, segmentResult);
  }

  while (evalEquation.includes('+') || evalEquation.includes('−')) {
    let opIndex = evalEquation.findIndex((item) => item.match(/[+−]/));
    let segment = evalEquation.splice(opIndex - 1, 3);
    let segmentResult = operate(...segment).toString();
    evalEquation.splice(opIndex - 1, 0, segmentResult);
  }

  let result = evalEquation[0];
  if (result % 1 !== 0) {
    result = parseFloat(result).toFixed(3);
  }
  if (result.match(/^[\d]+[\.][\d]+e\+[\d]+$/)) {
    result = '(ノಥ,_｣ಥ)ノ彡 ¡ǝlpuɐɥ oʇ ƃᴉq ooʇ s,ʇI';
  }

  return result;
};
