const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highscore = 0;

function playSound(button) {
  const audio = new Audio(`sounds/${button}.mp3`);
  audio.play();
}

function animatePress(currColour) {
  $(`#${currColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currColour}`).removeClass("pressed");
  }, 100);
}

//Initiating Next Sequence.
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Restart game.
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

// To check if the pattern is correct, subsequently procced to next level.
function checkAnswer_nextLevel(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    if (level > highscore) {
      highscore = level - 1;
      $(".score").text(highscore);
    }

    startOver();
  }
}

// Starting the Game
$(document).keypress(function (event) {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;

    //Next level
    $(".btn").click(function () {
      userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      animatePress(userChosenColour);
      playSound(userChosenColour);
      checkAnswer_nextLevel(userClickedPattern.length - 1);
    });
  }
});
