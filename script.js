let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value) || value === '.') {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.textContent = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = undefined;
            screen.textContent = buffer;
            break;
        case '=':
            if (previousOperator === undefined) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = undefined;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            screen.textContent = buffer;
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            handleMath(symbol);
            break;
        case '+/-':
            if (buffer !== '0') {
                buffer = (parseFloat(buffer) * -1).toString();
            }
            screen.textContent = buffer;
            break;
        case '.':
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            screen.textContent = buffer;
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }   
    const numBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = numBuffer;
    }
    else {
        flushOperation(numBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(numBuffer) {
    if (previousOperator === '+') {
        runningTotal += numBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= numBuffer;
    } else if (previousOperator === 'x') {
        runningTotal *= numBuffer;
    } else if (previousOperator === '/') {
        runningTotal /= numBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calculator-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.textContent);
    });
}

init();