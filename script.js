class JSCalculator {
    prevOperandText;
    currOperandText;
    prevOperand;
    currOperand;
    operator;

    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.prevOperand = "";
        this.currOperand = "";
        this.operator = undefined;
    }

    clear() {

    }

    delete() {

    }

    appendNumber(number) {
        this.currOperand = number;
    }

    operation(operator) {

    }

    compute() {

    }

    updateDisplay() {
        this.currOperandText.innerText = this.currOperand;
    }

}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const numAllClearButton = document.querySelector("[data-allClear]");
const prevOperandText = document.querySelector("[data-prev-operand]");
const currOperandText = document.querySelector("[data-curr-operand]");

const calculator = new JSCalculator(prevOperandText, currOperandText);

for (let i = 0; i < numberButtons.length; i++){
    const button = numberButtons[i];
    button.addEventListener('click', clickOnNumber)

    function clickOnNumber() {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    }
}