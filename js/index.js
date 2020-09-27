function pageLoad() {
    var buttons = document.querySelectorAll('#calculator span'),
        operators = ['+', '-', '/', '*'],
        inputScreen = document.querySelector('#screen'),
        btnValue,
        input;

    for (let i = 0; i < buttons.length; i++) {
        var isDecimalAdded = false; // Flag used to avoid two decimal

        buttons[i].addEventListener('click', function () {
            btnValue = this.innerHTML;
            input = inputScreen.innerHTML;

            switch (btnValue) {
                case '=':
                    // Last char of string
                    var lastChar = input[input.length - 1];

                    // Replace x to *, + to / which could be calculated in eval
                    input = input.replace(/x/g, '*').replace(/÷/g, '/');

                    // Checking the last character of the input.
                    // If it's an operator or a decimal, remove it
                    // /.$/ means last char in regex
                    if (operators.indexOf(lastChar) > -1 || lastChar === '.')
                        input = input.replace(/.$/, '');

                    if (input) {
                        // If the argument is an expression, eval() evaluates the expression.
                        // If the argument is one or more JavaScript statements, eval() executes the statements.
                        inputScreen.innerHTML = eval(input);
                    }
                    isDecimalAdded = false;
                    playAudio(btnValue);
                    break;

                case '.':
                    if (!isDecimalAdded) {
                        inputScreen.innerHTML += btnValue;
                        isDecimalAdded = true;
                        playAudio(btnValue);
                    }
                    break;

                case '+':
                case '-':
                case '/':
                case '*':
                    // Last char of string
                    var lastChar = input[input.length - 1];

                    // Only add operator if input is not empty and there is no operator at the last
                    if (input !== '' && operators.indexOf(lastChar) === -1)
                        inputScreen.innerHTML += btnValue;

                    // Allows minus if the string is empty. The first number could be under zero
                    else if (input === '' && btnValue === '-')
                        inputScreen.innerHTML += btnValue;

                    // Allows to represent the last operation
                    if (operators.indexOf(lastChar) > -1 && input.length > 1) {
                        inputScreen.innerHTML = input.replace(/.$/, btnValue);
                    }
                    isDecimalAdded = false;
                    playAudio(btnValue);
                    break;

                case 'C':
                    inputScreen.innerHTML = '';
                    isDecimalAdded = false;
                    playAudio(btnValue);
                    break;

                default:
                    inputScreen.innerHTML += btnValue;
                    isDecimalAdded = false;
                    playAudio(btnValue);
                    break;
            }
        });
    }
}

function playAudio(number) {
    let audio = null;

    switch (number) {
        case '0':
            audio = new Audio('sounds/zero.wav');
            break;

        case '1':
            audio = new Audio('sounds/one.wav');
            break;

        case '2':
            audio = new Audio('sounds/two.wav');
            break;

        case '3':
            audio = new Audio('sounds/three.wav');
            break;

        case '4':
            audio = new Audio('sounds/four.wav');
            break;

        case '5':
            audio = new Audio('sounds/five.wav');
            break;

        case '6':
            audio = new Audio('sounds/six.wav');
            break;

        case '7':
            audio = new Audio('sounds/seven.wav');
            break;

        case '8':
            audio = new Audio('sounds/eight.wav');
            break;

        case '9':
            audio = new Audio('sounds/nine.wav');
            break;

        case '+':
            audio = new Audio('sounds/addition.wav');
            break;

        case '-':
            audio = new Audio('sounds/subtraction.wav');
            break;

        case '*':
            audio = new Audio('sounds/multiplication.wav');
            break;

        case '/':
            audio = new Audio('sounds/division.wav');
            break;

        case '=':
            audio = new Audio('sounds/equal.wav');
            break;

        case '.':
            audio = new Audio('sounds/decimal-place.wav');
            break;

        case 'C':
            audio = new Audio('sounds/cancel.wav');
            break;
    }

    audio.play();
}
