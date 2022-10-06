//**************************StartOfFile************************************//
//*************************************************************************//
//<---------- Variable Section(Global Variables goes here)---------------->//
//*************************************************************************//
let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let level = 0;
let started = 0;
//*************************************************************************//


//*************************************************************************//
//<----------- Function Section(All Functions Decleared here)------------->//
//*************************************************************************//
function nextSequence() {
    started = 1;
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);

    animatePress("#" + buttonColours[randomNumber])
    playSound(buttonColours[randomNumber]);

    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level++;
    $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else if(started == 1){
        let clickSound = new Audio('sounds/wrong.mp3');
        clickSound.loop = false;
        clickSound.play();

        $("body").addClass('game-over');
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = 0;
}

function playSound(name) {
    let clickSound = new Audio('sounds/' + name + '.mp3');
    clickSound.loop = false;
    clickSound.play();
}

function animatePress(currentColour) {
    // $(currentColour).fadeOut().fadeIn();
    $(currentColour).addClass('pressed');
    setTimeout(function () {
        $(currentColour).removeClass('pressed');
    }, 100);
}
//*************************************************************************//


//*************************************************************************//
//<---------- Event Handling Section(User events managed here)------------>//
//*************************************************************************//

//mouse click event handling.
$(".btn").click(function () {
    let userChosenColour = $(this).attr('id');
    animatePress("#" + userChosenColour);
    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//Key Press event handling.
$(document).keydown(function (event) {
    if (level == 0) {
        nextSequence();
    }
    console.log(event.key);
});
//*************************************************************************//
//******************************EndOfFile**********************************//