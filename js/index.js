function pageLoad() {

    var btns = document.querySelectorAll('#calculator span');
    var operators = ['+'];
    var inputScreen = document.querySelector('#screen');
    var btnValue;
    var input;

    for(var i=0; i< btns.length; i++) {

        var decimalAdded = false; // Flag used to avoid two decimal

        btns[i].addEventListener('click', function () {

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
                    if(operators.indexOf(lastChar) > -1 || lastChar == '.')
                        input = input.replace(/.$/, '');

                    if(input) {
                        // If the argument is an expression, eval() evaluates the expression.
                        // If the argument is one or more JavaScript statements, eval() executes the statements.
                        inputScreen.innerHTML = eval(input);
                    }
                    decimalAdded = false;
                    break;
                case '+':
                    // Last char of string
                    var lastChar = input[input.length - 1];

                    // Only add operator if input is not empty and there is no operator at the last
                    if(input != '' && operators.indexOf(lastChar) == -1)
                        inputScreen.innerHTML += btnValue;

                    // Allows minus if the string is empty. The first number could be under zero
                    else if(input == '' && btnValue == '-')
                        inputScreen.innerHTML += btnValue;

                    // Allows to represent the last operation
                    if(operators.indexOf(lastChar) > -1 && input.length > 1) {
                        inputScreen.innerHTML = input.replace(/.$/, btnValue);
                    }
                    decimalAdded = false;
                    break;
                default:
                    inputScreen.innerHTML += btnValue;
                    decimalAdded = false;
                    playAudio(btnValue);
                    break;
            }
        });
    }

}

function playAudio(number) {
    var audio = null;
    switch(number) {
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
    }

    audio.play();
}
