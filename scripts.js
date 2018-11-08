makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));
var player_name = localStorage.getItem('player_name');
var weapon = localStorage.getItem('weapon');
var wld = localStorage.getItem('wld');
var played=false;
//console.log(player_name);

showOrNot(document.getElementById("feedback"), false);
if (!wld) {
  wld = [
    [],
    [],
    []
  ];
} else {


}
if (!player_name) {
  showOrNot(document.getElementById("enter_name"), true);
  console.log("name not entered yet");
} else {
  updateNames(player_name);
  showOrNot(document.getElementById("throw_choice"), true);
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
document.getElementById("play_again_button").addEventListener("click", function() {
    showOrNot(document.getElementById("play_again_button"),false);
    document.getElementById("bowser").src = "images/bowser.png"
    document.getElementById("player").src = "images/player.JPG"
    showOrNot(document.getElementById("feedback"), false);
    document.getElementById("throw_choice_select").value="null";
    showOrNot(document.getElementById("throw_choice"),true);
    showOrNot(document.getElementById("result"),false);
    played=false;
});
document.getElementById("name_button").addEventListener("click", function() {
  var p_name = document.getElementById("name_textfield").value;
  localStorage.setItem("player_name", p_name);
  if (updateNames(p_name)) {
    showOrNot(document.getElementById("throw_choice"), true);
    showOrNot(document.getElementById("enter_name"), false);
    document.getElementById("feed").innerHTML = "You have successfully entered your name! Now you can play!";
    document.getElementById("feed").style.backgroundColor = "#50FF50";
    showOrNot(document.getElementById("feedback"), true);
  }


});
document.getElementById("throw_choice_button").addEventListener("click", function() {
  if (!played){
  var weapon = document.getElementById("throw_choice_select").value;
  if (weapon != "null") {
    localStorage.setItem("weapon", weapon);
    var choices = ["rock", "paper", "scissors"];
    var opponentWeapon = choices[Math.floor(Math.random() * choices.length)];
    var text;
    var res = 2;
    //console.log(weapon,opponentWeapon);
    switch (weapon) {
      case opponentWeapon:
        //console.log("tie");
        text = "You have tied as both you and your opponent chose " + weapon + ".";
        break;
      case "rock":
        switch (opponentWeapon) {
          case "paper":
            text = "You have lost since your rock was wrapped by your opponent's paper.";
            //console.log("you lose");
            res = 1;
            break;
          case "scissors":
            text = "You won! Your rock, smashed your opponent's scissors.";
            //console.log("you win");
            res = 0;
            break;
        }
        break;
      case "paper":
        switch (opponentWeapon) {
          case "scissors":
            text = "You have lost since your paper was cut up by your opponnet's scissors.";
            //console.log("you lose");
            res = 1;
            break;
          case "rock":
            text = "You won! Your paper wrapped the opponents rock.";
            //console.log("you win");
            res = 0;
            break;
        }
        break;
      case "scissors":
        switch (opponentWeapon) {
          case "rock":
            text = "You have lost since your scissors were smashed by your opponent's rock.";
            //console.log("you lose");
            res = 1;
            break;
          case "paper":
            text = "You won! Your scissors cut up your opponent's papers.";
            //console.log("you win");
            res = 0;
            break;
        }
        break;
    }
    wld[res].push([weapon, opponentWeapon, text]);
    document.getElementById("bowser").src = "images/bowser" + opponentWeapon.charAt(0).toUpperCase() + opponentWeapon.substring(1, opponentWeapon.length) + ".png";
    document.getElementById("player").src = "images/player" + weapon.charAt(0).toUpperCase() + weapon.substring(1, weapon.length) + ".JPG";
    var w=wld[0].length;
    var l=wld[1].length
    var d=wld[2].length
    var tot=wld[0].concat(wld[1].concat(wld[2]));
    t=tot.length;
    document.getElementById("statistics").innerHTML =
    "games played "+t+
    "<br> wins: " + w +
    "<br> losses: " + l +
    "<br> draws: " + d +
    "<br> win/loss ratio: " +Math.round((100*w/l))/100.0+
    "<br> win percentage: " +Math.round(100*w/t)+"%"
    "<br><br>Your percentages:"+
    "<br>Rock: "+ Math.round(tot.filter(function (c,i){return c[0]=="rock"}).length/t*100) + "%"+
    "<br>Paper: "+ Math.round(tot.filter(function (c,i){return c[0]=="paper"}).length/t*100) + "%"+
    "<br>Scissors: "+ Math.round(tot.filter(function (c,i){return c[0]=="scissors"}).length/t*100) + "%"+
    "<br><br>B(r)owser's percentages:"+
    "<br>Rock: "+ Math.round(tot.filter(function (c,i){return c[1]=="rock"}).length/t*100) + "%"+
    "<br>Paper: "+ Math.round(tot.filter(function (c,i){return c[1]=="paper"}).length/t*100) + "%"+
    "<br>Scissors: "+ Math.round(tot.filter(function (c,i){return c[1]=="scissors"}).length/t*100) + "%";
    document.getElementById("result").innerHTML = text;
    showOrNot(document.getElementById("result"),true);
    showOrNot(document.getElementById("feedback"), false);
    showOrNot(document.getElementById("play_again_button"),true);
    showOrNot(document.getElementById("throw_choice"),false);
  played=true;}
  else{
    document.getElementById("feed").innerHTML = "\"Null\" is not a valid throw-choice. Please try again with a valid throw choice.";
    document.getElementById("feed").style.backgroundColor = "#FF5050";
    showOrNot(document.getElementById("feedback"), true);
  }
}
});

function updateNames(name) {
  if (name.length != 0) {
    var name_spots = document.getElementsByClassName("player_name_span")
    for (var i = 0; i < name_spots.length; i++) {
      //console.log(name_spots[i]);
      name_spots[i].innerHTML = name;
    }
    console.log("accepted")
    return true;
  }
  console.log("rejected")
  document.getElementById("feed").innerHTML = "You have entered an invalid name :( Please try again with a valid name.";
  document.getElementById("feed").style.backgroundColor = "#FF5050";
  showOrNot(document.getElementById("feedback"), true);
  return false;
}
