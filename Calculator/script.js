const buttons = document.querySelectorAll(".btn");
const operators = document.querySelectorAll(".operator");
const topOutput = document.querySelector("#lcdu");
const output = document.querySelector("#lcd");
let operatorIspressed = false;
let isAnswered = false;
//initialize variables
let firstNumber = 0,
  secondNumber = 0,
  result = 0,
  operation = "";
const operatorsList = ["+", "*", "/", "%", "-", "^", "=", "c", "root"];
const getConstraint = () => output.value == result;
const isTerminalOperator = (value) => value == "c" || value == "=";
function addListEventListener(elements, handler = () => {}, event = "click") {
  if (!elements) {
    throw Error("no element was added");
    return;
  }
  elements.forEach((elem) => elem.addEventListener(event, handler));
}

function updateTopOutput(value) {
  topOutput.value += output.value + value;
}
const isSingleOperator = () =>
  /^([\w\d]+?)([+\*/-]{1})$/g.test(topOutput.value);

function checkIf_changeOperation(newOperator) {
  const lastOperation = topOutput.value[topOutput.value.length - 1];
  if (
    (operatorsList.includes(lastOperation) && lastOperation !== newOperator) ||
    isSingleOperator()
  ) {
    operation = newOperator;
    topOutput.value =
      topOutput.value.slice(0, topOutput.value.length - 1) + operation;
    return true;
  }
}

function checkIf_startAgain(value) {
  if (isAnswered) {
    //clear memory
    clear();
    //start a new session
    isAnswered = false;
    output.value = value;
  }
}

//Event handler
const handleButtonClick = (e) => {
  e.preventDefault();
  checkIf_startAgain(e.target.value);
  if (output.value == "0" || operatorIspressed) {
    output.value = e.target.value;
  } else {
    output.value += e.target.value;
  }
  operatorIspressed = false;
};

const handleOperatorClick = (e) => {
  e.preventDefault();
  //just house keeping check
  if (!operatorsList.includes(e.target.value)) {
    return;
  }
  //sets iSanswered status to false if an operator is clicked, after a calculation session has ended
  if (isAnswered) {
    isAnswered = false;
  }

  //allows change operator on a single operator
  if (
    operatorIspressed &&
    isSingleOperator() &&
    !isTerminalOperator(e.target.value)
  ) {
    checkIf_changeOperation(e.target.value);
    return;
  }
  //signals that an operator has been pressed
  operatorIspressed = true;
  /**
   * prevents operator from working on result multiple times, when clicked intermitently
   * meaning a single operator shouldn't be clicked more than once
   *  and to avoid extra logical check
   */
  if (getConstraint() && !isTerminalOperator(e.target.value)) {
    //if a new operator is clicked then change previous operation
    checkIf_changeOperation(e.target.value);
    return;
  }

  //print to top
  updateTopOutput(e.target.value);

  if (e.target.value == "=") {
    calculate();
    isAnswered = true;
    return;
  } else if (e.target.value == "c") {
    clear();
    return;
  }
  if (!!firstNumber && !!output.value) {
    calculate();
    return;
  }
  firstNumber = parseInt(output.value);
  if (e.target.value == "^") {
    operation = "**";
    return;
  }
  operation = e.target.value;
};

function calculate() {
  //dont do anything if no operation was selected
  if (!!operation) {
    secondNumber = output.value;
    if (result) {
      firstNumber = result;
    }
    result = eval(
      `${parseInt(firstNumber)} ${operation} ${parseInt(secondNumber)}`
    );
    output.value = result;
  }
}
/**
 * Function is meant to clear memory and start calculator from fres
 */
function clear() {
  topOutput.value = "";
  output.value = "0";
  result = 0;
  firstNumber = 0;
  secondNumber = 0;
  operation = "";
}

//addEventListener

//FOR OPERATORS
addListEventListener(operators, handleOperatorClick);
//FOR BUTTONS
addListEventListener(buttons, handleButtonClick);
//background: linear-gradient(90deg,transparent,hsla(0,0%,100%,.3),transparent)
