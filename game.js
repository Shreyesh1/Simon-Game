var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];

var started = false;

var Level = 0;


$(document).keydown(function(){
    if(!started){ 
    $("h1").text("Level="+Level);
    nextSequence();
    started = true;
}
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
 });
 
 function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

      console.log("success");

      
      if (userClickPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");

      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over" , 200);
      });
      $("h1").text("Game-over , Press any key to restart");

      startOver();
    }


}


function nextSequence() {

userClickPattern=[];

Level++;

$("h1").text("Level="+Level);

var randomNumber=Math.floor(Math.random()*4);

var randomChosenColour= buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

// here randomChosenColour is a value and # is a string so that's why we have to write it like this.
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


}

function playSound(name){
    
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour){
      
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
        }, 100);

}

function startOver(){

     gamePattern = [];
     started = false;
     Level = 0;

}



