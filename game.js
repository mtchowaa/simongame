// 記得array內容要加 ""
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = 0;
var level = 0;

$(document).keydown(function() {
  if (toggle === 0) {
    nextSequence();
    toggle++;
    $("#level-title").text("Level " + level);
  }
});

// User Click
$(".btn").click(function(event) {
  if (toggle > 0) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Variable係唔洗加""
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed"); //要specific番個ID 加＃!!!或者.!!!!
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // 係 ==或者=== 唔係 = 啊！！！！！！！！！
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      // 清空番之前簡過既button, 重身簡番個pattern
      userClickedPattern = [];
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart.");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    var failaudio = new Audio("sounds/wrong.mp3");
    failaudio.play();
    restart();
  }
}


function restart() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  toggle = 0;
}

// $("randomChosenColour").animate({opacity:0.5});
