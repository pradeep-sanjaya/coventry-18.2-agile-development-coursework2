function pageLoad() {

    var btns = document.querySelectorAll('#calculator span');
    var inputScreen = document.querySelector('#screen');
    var btnValue;
    var input;

    for(var i=0; i< btns.length; i++) {

        var decimalAdded = false; // Flag used to avoid two decimal

        btns[i].addEventListener('click', function () {

            btnValue = this.innerHTML;
            input = inputScreen.innerHTML;

            switch (btnValue) {
               
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
        case '3':
         audio = new Audio('sounds/three.wav');
         break;
    }
   
    audio.play();
}