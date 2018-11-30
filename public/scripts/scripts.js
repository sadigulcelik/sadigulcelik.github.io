var player_name;
if (localStorage.getItem("currentPlayerName")!=null){
    player_name=localStorage.getItem("currentPlayerName");
}
var played = false;

filename=document.documentElement.id;
switch(filename){
    case "index":
        index();
        break;
    case "rules":
        rules();
        break;
    case "stats":
        stats();
        break;
}

function index(){
    showOrNot(document.getElementById("feedback"), false);
    if (!player_name) {
        showOrNot(document.getElementById("enter_name"), true);
        console.log("name not entered yet");
    } else {
        updateNames(player_name);
        showOrNot(document.getElementById("throw_choice"), true);
    }
    document.getElementById("play_again_button").addEventListener("click", function() {
        showOrNot(document.getElementById("play_again_button"), false);
        document.getElementById("bowser").src = "images/bowser.png"
        document.getElementById("player").src = "images/player.JPG"
        showOrNot(document.getElementById("feedback"), false);
        document.getElementById("throw_choice_select").value = "null";
        showOrNot(document.getElementById("throw_choice"), true);
        showOrNot(document.getElementById("result"), false);
        played = false;
    });
    document.getElementById("name_button").addEventListener("click", function() {
        player_name = document.getElementById("name_textfield").value;
        if(updateNames(player_name)) {
            
            var playerData=localStorage.getItem(player_name);
            var dat;
            if (!playerData){
            dat= {'name':player_name, 'throws':{'rock':0,'paper':0,'scissors':0},'wld': {'wins':0,'losses':0,'draws':0}};
            localStorage.setItem(player_name,JSON.stringify(dat));
                document.getElementById("feed").innerHTML = "You have successfully entered your name! Now you can play!";
            }
            else{
               document.getElementById("feed").innerHTML = "Wellcome back "+player_name+"! Now you can play!"; 
            }
            
            var bowserData=localStorage.getItem("bowser");
            if (!bowserData){
            dat= {'name':"bowser", 'throws':{'rock':0,'paper':0,'scissors':0},'wld': {'wins':0,'losses':0,'draws':0}};
            localStorage.setItem("bowser",JSON.stringify(dat));
            }
        localStorage.setItem("currentPlayerName",player_name);
            showOrNot(document.getElementById("throw_choice"), true);
            showOrNot(document.getElementById("enter_name"), false);
            
            document.getElementById("feed").style.backgroundColor = "#50FF50";
            showOrNot(document.getElementById("feedback"), true);
        }


});
document.getElementById("throw_choice_button").addEventListener("click", function() {
  if (!played) {
    var weapon = document.getElementById("throw_choice_select").value;
    if (weapon != "null") {
        var playerData=JSON.parse(localStorage.getItem(player_name));
        var bowserData=JSON.parse(localStorage.getItem("bowser"));
      var choices = ["rock", "paper", "scissors"];
      var opponentWeapon = choices[Math.floor(Math.random() * choices.length)];
      var text;
      var res = 2;
      playerData.throws[weapon]+=1;
      bowserData.throws[opponentWeapon]+=1;
      switch (weapon) {
        case opponentWeapon:
            playerData.wld.draws+=1;
            bowserData.wld.draws+=1;
          text = "You have tied as both you and B(r)owser chose " + weapon + ".";
          break;
        case "rock":
          switch (opponentWeapon) {
            case "paper":
              text = "You have lost since your rock was wrapped by your B(r)owser's paper.";
              playerData.wld.losses+=1;
              bowserData.wld.wins+=1;
              break;
            case "scissors":
              text = "You won! Your rock, smashed B(r)owser's scissors.";
              playerData.wld.wins+=1;
              bowserData.wld.losses+=1;
              break;
          }
          break;
        case "paper":
          switch (opponentWeapon) {
            case "scissors":
              text = "You have lost since your paper was cut up by B(r)owser's scissors.";
              playerData.wld.losses+=1;
              bowserData.wld.wins+=1;
              break;
            case "rock":
              text = "You won! Your paper wrapped B(r)owser's rock.";
              playerData.wld.wins+=1;
              bowserData.wld.losses+=1;s
              break;
          }
          break;
        case "scissors":
          switch (opponentWeapon) {
            case "rock":
              text = "You have lost since your scissors were smashed by B(r)owser's rock.";
              playerData.wld.losses+=1;
              bowserData.wld.wins+=1;
              break;
            case "paper":
              text = "You won! Your scissors cut up B(r)owser's papers.";
              playerData.wld.wins+=1;
              bowserData.wld.losses+=1;
              break;
          }
          break;
      }
    localStorage.setItem((player_name),JSON.stringify(playerData));
        localStorage.setItem(("bowser"),JSON.stringify(bowserData));
      document.getElementById("bowser").src = "images/bowser" + opponentWeapon.charAt(0).toUpperCase() + opponentWeapon.substring(1, opponentWeapon.length) + ".png";
      document.getElementById("player").src = "images/player" + weapon.charAt(0).toUpperCase() + weapon.substring(1, weapon.length) + ".JPG";
      document.getElementById("result").innerHTML = text;
      showOrNot(document.getElementById("result"), true);
      showOrNot(document.getElementById("feedback"), false);
      showOrNot(document.getElementById("play_again_button"), true);
      showOrNot(document.getElementById("throw_choice"), false);
      played = true;
    } else {
      document.getElementById("feed").innerHTML = "\"Null\" is not a valid throw-choice. Please try again with a valid throw choice.";
      document.getElementById("feed").style.backgroundColor = "#FF5050";
      showOrNot(document.getElementById("feedback"), true);
    }
  }
});

}
function rules(){
    
}
function stats(){
    console.log('abc');
    console.log(player_name);
    var bowserData=JSON.parse(localStorage.getItem("bowser"));
    var playerData=JSON.parse(localStorage.getItem(player_name));
    var w = playerData.wld.wins;
    var l = playerData.wld.losses;
    var d = playerData.wld.draws;
  t = w+l+d;
   
  document.getElementById("statistics").innerHTML =
    "games played: " + t +
    "<br> wins: " + w +
    "<br> losses: " + l +
    "<br> draws: " + d +
    "<br> win/loss ratio: " +
    function(){n=Math.round((100 * w / l)) / 100.0
      if(n||n===0){return(n)}
      else{return("Undefeated!")}}() +
    "<br> win percentage: " +
    function(){n=Math.round(100 * w / t)
      if(n||n===0){return(n+"%")}
      else{return("You have not won or lost yet.")}}()+
    "<br><br>Your percentages:"+
    "<br>Rock: " +playerData.throws.rock +
    "<br>Paper: "+ playerData.throws.paper +
    "<br>Scissors: " +playerData.throws.scissors+
    
    "<br><br>B(r)owser's percentages:" + 
    "<br>Rock: " +bowserData.throws.rock +
    "<br>Paper: "+ bowserData.throws.paper +
    "<br>Scissors: " +bowserData.throws.scissors;
}




function showOrNot(div_element, show) {
  if (show && div_element.classList.contains("hidden")) {
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  } else if (!show && div_element.classList.contains("visible")) {
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
  }
}

function makeToggable(button_element, div_element) {
  button_element.addEventListener("click", function() {
    if (div_element.classList.contains("hidden")) {
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    } else if (div_element.classList.contains("visible")) {
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
    }
  });
}





function updateNames(name) {
  if (name.length != 0&&name!="bowser") {
    var name_spots = document.getElementsByClassName("player_name_span")
    for (var i = 0; i < name_spots.length; i++) {
      //console.log(name_spots[i]);
      name_spots[i].innerHTML = name;
    }
    return true;
  }
  console.log("rejected")
  document.getElementById("feed").innerHTML = "You have entered an invalid name :( Please try again with a valid name.";
  document.getElementById("feed").style.backgroundColor = "#FF5050";
  showOrNot(document.getElementById("feedback"), true);
  return false;
}


document.getElementById("logout").addEventListener("click", function() {
  localStorage.setItem('currentPlayerName','');
    player_name=null;
  location.reload(true);
});