var wrong = 0;
var total = 0;
var speed = 0;
var speedWPM = 0;
var wordCount = 0;
var lastTime = 0;
var mode = 0;
var possible = "abcdefghijklmnopqrstuvwxyz";

var d = new Date();
var startTime = d.getTime();

function selectMode(){
  mode =  document.getElementById("mode-selector").value;
  document.getElementById("score-words").style.display = ["table-row", "none"][mode];
  document.getElementById("score-speed-wpm").style.display = ["table-row", "none"][mode];
  loadChars('');
}

function loadChars(chars){
  while (chars.length < 20){
    var loadFunctions = [
    (words[Math.floor(Math.random()*words.length)] + "_"),
    (possible.charAt(Math.floor(Math.random() * possible.length)))
    ];
    chars += loadFunctions[mode];
  }
  document.getElementById("letter-holder").innerHTML = chars;
}



function updateLetters(event){
  s = document.getElementById("letter-holder").innerHTML;
  var possible = "abcdefghijklmnopqrstuvwxyz";
  var key = event.which || event.keyCode;
  total = total+1;

  var d = new Date();

  if (key==32 && s[0]=="_") {
    wordCount = wordCount + 1;
    speedWPM = wordCount/((d.getTime() - startTime)/(1000*60));
  }

  if ((String.fromCharCode(key) == s[0]) || (key==32 && s[0]=="_")){
    s = s.substring(1);
    loadChars(s);

    console.log(((d.getTime()/100)/10)-lastTime);

    if (((d.getTime()/100)/10)-lastTime > 5) {
      lastTime = Math.round(d.getTime()/100)/10;
      startTime = d.getTime();
      wordCount = 0;
    }

    if (lastTime == 0){
      lastTime = Math.round(d.getTime()/100)/10;
    }else{
      speed = (speed*(total-1)+((Math.round(d.getTime()/100)/10)-lastTime))/total;
      lastTime = (Math.round(d.getTime()/100)/10);
    }

  }else{

    wrong = wrong+1;
  }

  var accuracy = Math.round(((total-wrong)/total)*100);

  document.getElementsByTagName("td")[0].innerHTML = accuracy + "%";
  document.getElementsByTagName("td")[1].innerHTML = Math.round(speed*100)/100 + "s";
  document.getElementsByTagName("td")[2].innerHTML = Math.round(speedWPM*10)/10;
  document.getElementsByTagName("td")[3].innerHTML = wordCount;

}
