const themes = ['theme-one', 'theme-two', 'theme-three'];
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', changeTheme);

const inputDisplay = document.getElementById('input');
const calculationDisplay = document.getElementById('calculation');
let operator;
let numberOne;
let newWord = true;

document.querySelectorAll('.num-key').forEach(item => item.addEventListener('click', numberInput));
document.querySelectorAll('.operator-key').forEach(item => item.addEventListener('click', operatorHandler));
document.querySelector('.equal-key').addEventListener('click', calculateResult);
document.querySelector('.del-key').addEventListener('click', deleteInput);
document.querySelector('.reset-key').addEventListener('click', resetInput);
document.querySelector('.dot-key').addEventListener('click', dotInput);
window.addEventListener('keydown', keyboardInputHandler);

function changeTheme() {
  const currentTheme = document.body.className;
  const themeIndex = (themes.indexOf(currentTheme) + 1) % 3;
  document.body.className = themes[themeIndex];
}
function numberInput(e) {
  const number = e.target.innerText;
  if (newWord) {
    inputDisplay.innerText = number;
    newWord = false;
  } else {
    if (inputDisplay.innerText === '0' && number === '0') return;
    inputDisplay.innerText = inputDisplay.innerText + number;
  }
}
function dotInput() {
  if (inputDisplay.innerText) {
    const currentInput = inputDisplay.innerText;
    if (!isNaN(Number(currentInput + '.'))) {
      inputDisplay.innerText += '.';
    }
  }
}
function deleteInput() {
  if (inputDisplay.innerText) {
    const input = inputDisplay.innerText;
    inputDisplay.innerText = input.slice(0, input.length - 1);
  }
}
function resetInput() {
  inputDisplay.innerText = '';
  calculationDisplay.innerText = '';
  operator;
  numberOne;
  newWord = true;
}
function operatorHandler(e) {
  if (inputDisplay.innerText) {
    if (numberOne && !newWord) {
      calculateResult();
    }
    operator = e.target.innerText;
    numberOne = Number(inputDisplay.innerText);
    calculationDisplay.innerText = `${numberOne} ${operator}`;
    newWord = true;
  }
}
function calculateResult() {
  if (inputDisplay.innerText && operator && !newWord) {
    const currentNumber = Number(inputDisplay.innerText);
    const result = solveExpression(numberOne, operator, currentNumber);
    calculationDisplay.innerText = `${numberOne} ${operator} ${currentNumber} = `;
    inputDisplay.innerText = result;
    numberOne = undefined;
    operator = undefined;
  }
}
function solveExpression(a, op, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case 'x':
      return a * b;
    case '/':
      return a / b;
  }
}
function keyboardInputHandler(e) {
  const pressedKey = document.querySelector(`div[data-key="${e.key}"]`);
  if (!pressedKey) return;
  pressedKey.click();
}