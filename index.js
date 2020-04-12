var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var counter = true; //boolean to enter the starting condition when the keypress is preesed
var level = 0;

function nextSequence() {
  userClickedPattern = [];//set the user guesses to zero to try to remember the entire pass
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; //give a random number to represent a color from array above
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animation of fadein and out
  playSound(randomChosenColour); //sound is not working now
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) { //to make the highlight shadoww
  $("#" + currentColour).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass('pressed');
    next();
  });

}



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); //get the id when click on the button with class btn
  userClickedPattern.push(userChosenColour); //array of the bottons u chossed
  playSound(userChosenColour);
  animatePress(userChosenColour);
    console.log(userClickedPattern);
 checkAnswer(userClickedPattern.length-1)//because here i jumps 1 soo we make -1

});

$(document).on("keypress", function(event) {
  if (counter === true) {

    nextSequence();
    counter = false;
    $("#level-title ").text("Level " + level);
  }

})

function checkAnswer(currentLevel)
{


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length)

        setTimeout(function () {
       nextSequence();
     }, 1000);

   }
   else{
     playSound("wrong");
     $("body").addClass("game-over").delay(200).queue(function(next) {
       $(this).removeClass('game-over');
       next();
     });

  $("#level-title ").text("Game Over Press any key to restart ");
  startOver();
   }

}

function startOver()//gameover function
{
  level=0;
  counter=true;
  gamePattern=[];
  userClickedPattern=[];
}















//sccs
