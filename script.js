/**
 * Represent a class of JSCalculator
 */
class JSCalculator {
    previousOperandText;
    currentOperandText;
    prevOperand;
    currOperand;
    operator;
    isShownResult;

    /**
     * Constructor of the calculator
     * @param previousOperandText the string will be shown on the previousOperand text area
     * @param currentOperandText the string will be shown on the currentOperand text area
     */
    constructor(previousOperandText,currentOperandText) {
        this.currentOperandText = currentOperandText;
        this.previousOperandText = previousOperandText;
        this.clear();
    }

    /**
     * A function that reset the calculator to the origin state
     */
    clear() {
        this.prevOperand = "";
        this.currOperand = "";
        this.operator = "";
        this.isShownResult = false;
    }

    /**
     * A function that remove the most recent user single digit input
     */
    delete() {
        if (this.isShownResult || this.currOperand == null) {
            return;
        }
        this.currOperand = this.currOperand.toString().substring(0, this.currOperand.toString().length - 1);
    }

    /**
     * A function that append user input as current operand
     *      if the current operand already have a decimal point, do nothing
     *      if the current operand is the result of computation, reset the calculator to the origin state
     * @param number a single digit or decimal input from user
     */
    appendNumber(number) {
        if (this.isShownResult) {
            this.clear();
        }
        if (number.toString() == "." && this.currOperand.toString().includes(".")) {
            return;
        }
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    /**
     * A function that record user input as a computation operator
     *      if the current operand is the result of computation, reset the calculator to the origin state
     *      if the current operand haven't been entered, do nothing
     * @param operator an operator
     */
    operation(operator) {
        if (this.isShownResult) {
            this.clear();
        }
        if (this.currOperand.toString().length == 0) {
            return;
        }
        this.operator = operator;
        this.prevOperand = this.currOperand;
        this.currOperand = "";

    }

    /**
     * A function that compute the result and set the result as current operand when user first hit equal button
     */
    compute() {
        if (this.operator.toString().length == 0) {
            return;
        }
        let result = 0;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) {
            return;
        }
        switch (this.operator) {
            case"➕":
                result = prev + curr;
                break;
            case"➖":
                result = prev - curr;
                break;
            case"✖":
                result = prev * curr;
                break;
            case"➗":
                result = prev / curr;
                break;
            default:
                break;
        }
        this.prevOperand = this.currOperand;
        this.currOperand = result;
        this.isShownResult = true;
    }

    /**
     * A function that compute the result if user keep hitting equal button
     */
    contCompute() {
        let result = parseFloat(this.currOperand);
        let prev = parseFloat(this.prevOperand);
        if (isNaN(result)) {
            return;
        }
        switch (this.operator) {
            case"➕":
                result += prev;
                break;
            case"➖":
                result -= prev;
                break;
            case"✖":
                result *= prev;
                break;
            case"➗":
                result /= prev;
                break;
            default:
                break;
        }
        this.currOperand = result;
    }

    /**
     * A function that update display text
     */
    updateDisplay() {
        this.currentOperandText.innerText = this.currOperand;
        if(this.operator.toString().length != 0 && !this.isShownResult){
            this.previousOperandText.innerText = this.prevOperand.toString() + " " + this.operator.toString();
        }
        else if(this.isShownResult){
            this.previousOperandText.innerText = this.operator.toString() + " " + this.prevOperand.toString();
        } else{
            this.previousOperandText.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const numAllClearButton = document.querySelector("[data-allClear]");
const currentOperandText = document.querySelector("[data-curr-operand]");
const previousOperandText = document.querySelector("[data-prev-operand]")

const calculator = new JSCalculator(previousOperandText,currentOperandText);

for (let i = 0; i < numberButtons.length; i++) {
    const button = numberButtons[i];
    button.addEventListener("click", clickOnNumberButtons);

    function clickOnNumberButtons() {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    }
}

for (let i = 0; i < operationButtons.length; i++) {
    const button = operationButtons[i];
    button.addEventListener("click", clickOnOperationButtons);

    function clickOnOperationButtons() {
        calculator.operation(button.innerText);
        calculator.updateDisplay();
    }
}

equalButton.addEventListener("click", clickOnEqualButton);

function clickOnEqualButton() {
    if (!calculator.isShownResult) {
        calculator.compute();
    } else {
        calculator.contCompute();
    }
    calculator.updateDisplay();

}

numAllClearButton.addEventListener("click", clickOnAllClearButton);

function clickOnAllClearButton() {
    calculator.clear();
    calculator.updateDisplay();
}

deleteButton.addEventListener("click", clickOnDeleteButton);

function clickOnDeleteButton() {
    calculator.delete();
    calculator.updateDisplay();
}