//All the variables...
var buttonColors = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level = 0;

//When user presses a key...
$(document).keypress( function () {
   if (!started) {
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
   }
});

//When user clicks the button...
$(".btn").on("click",function() {
   var userChosenColor=$(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);  
});

//To check if the user clicked the correct sequence...
function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function () {
         nextSequence();
         },1000);
      }
   } 
   else {
      //Game over...
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function() {
         $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over! Press any key to Restart");
      startOver();
   }   
}

//Next sequence..
function nextSequence(){
   userClickedPattern=[];
   level++;
   $("#level-title").text("Level "+level);
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColor=buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
   playSound(randomChosenColor);
}

//Restart the game...
function startOver(){
   level=0;
   gamePattern=[];
   started=false;
}

//To play sound..
function playSound(name){
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
} 

//For animation...
function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
   },100);
}     

