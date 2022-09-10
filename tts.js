let speech = new SpeechSynthesisUtterance();
speech.lang = "pl";
let last;

//  funkcja ładująca zmienne
function load() {
  let korwin = data;

  /*
  document.getElementById("pitchVal").value = window.localStorage.getItem("pitchValue");
  document.getElementById("rate").value = window.localStorage.getItem("pitchValue");
  document.getElementById("rateVal").value = window.localStorage.getItem("rateValue");
  document.getElementById("rate").value = window.localStorage.getItem("rateValue");
  document.getElementById("isVoice").checked = window.localStorage.getItem("isVoice");
  */

  document.getElementById("liczTekstow").innerHTML = `Liczba tekstów : <b>${(korwin.p.length+1)+(korwin.d.length+1)+(korwin.t.length+1)+(korwin.c.length+1)+(korwin.i.length+1)+(korwin.s.length+1)}</b>`;
  console.log(`Łączna liczba możliwości: ${(korwin.p.length+1)*(korwin.d.length+1)*(korwin.t.length+1)*(korwin.c.length+1)*(korwin.i.length+1)*(korwin.s.length+1)}`)
}

// funkcja generująca wypowiedź
function przemowa() {
  let korwin = data;

  let text = [];
  text.push(korwin.p[Math.floor(Math.random() * korwin.p.length)]);
  text.push(korwin.d[Math.floor(Math.random() * korwin.d.length)]);
  text.push(korwin.t[Math.floor(Math.random() * korwin.t.length)]);
  text.push(korwin.c[Math.floor(Math.random() * korwin.c.length)]);
  text.push(korwin.i[Math.floor(Math.random() * korwin.i.length)]);
  text.push(korwin.s[Math.floor(Math.random() * korwin.s.length)]);
  let ttext = text.join(" ");

  document.querySelector("textarea").value = `„${ttext}”`;
  speech.text = ttext;
  last = ttext;

  if(document.getElementById('isVoice').checked) window.speechSynthesis.speak(speech);
}


//skopiowanie tekstu
let opacity = 0
async function copy() {
  await navigator.clipboard.writeText(last);
  let copyAlert = document.getElementById('copyAlert')
  let increement = 0.250
  let instanceIn = window.setInterval(function(){
    copyAlert.style.opacity = opacity;
    opacity = opacity + increement;
    if(opacity > 1) window.clearInterval(instanceIn)
  },50)
  await sleep(4000)
  let instanceOut = window.setInterval(function(){
    copyAlert.style.opacity = opacity;
    opacity = opacity - increement;
    if(opacity < 0) window.clearInterval(instanceOut)
  },50)
}

//opcje
function rateConRan(){
  document.getElementById("rateVal").value = document.getElementById("rate").value;
  speech.rate = document.getElementById("rate").value;
  window.localStorage.setItem("rateValue", document.getElementById("rate").value);
}

function rateConInp(){
  document.getElementById('rate').value = document.getElementById('rateVal');
  speech.rate = document.getElementById("rate").value;
  window.localStorage.setItem("rateValue", document.getElementById('rateVal').value);
}

function pitchConRan(){
  document.getElementById("pitchVal").value = document.getElementById("pitch").value;
  speech.pitch = document.getElementById("pitch").value;
  window.localStorage.setItem("pitchValue", document.getElementById('pitch').value);
}

function pitchConInp(){
  document.getElementById("pitch").value = document.getElementById("pitchVal").value;
  speech.pitch = document.getElementById("pitch").value;
  window.localStorage.setItem("pitchValue", document.getElementById('pitchVal').value);
}

function isVoiceCon() {
  window.localStorage.setItem("isVoice", document.getElementById('isVoice').checked);
}

function showInfo() {
  let elem = document.getElementById('infoInv');
  elem.classList.toggle('invisible')
}

let sleep = function(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

Array.prototype.random = function (){
  return this[Math.floor((Math.random()*this.length))];
}