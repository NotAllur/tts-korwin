let synth;
let last;
const textarea = document.querySelector("textarea");
const textTime = 30;
let isBusy = false;
let isTalking = false;
let data = 
{
  tts: {
    pitchVal: 1,
    rateVal: 1,
    isVoice: false
  }
}

if(typeof window.speechSynthesis !== undefined)
{
  synth = new SpeechSynthesisUtterance();
  synth.lang = "pl";
  synth.onend = function (e){
    synth = null;
    synth = new SpeechSynthesisUtterance();
  };
  document.getElementById("ttsError").remove()
} else {
  alert("Twoja przeglądarka nie obsługuje modułu SpeechSynthesis");
  document.getElementById("ttsError").style.opacity = 1;
  data.tts.isVoice = false;
}

const bgImages = [
  "./img/korwin.webp",
  "./img/korwin_mlot_TVP.webp",
  "./img/korwin_na_tronie_GOT.webp",
  "./img/korwin_nie_zyjesz_lewaku.webp",
  "./img/korwin_jumpscare.webp",
  "./img/korwin_eksplozja.webp",
  "./img/korwin_na_zlotym_tronie.webp",
  "./img/korwin_gdynia_z_cukrem.webp",
  "./img/korwin_przemawia_prawde.webp",
  "./img/korwin_got_bitches.webp",
  "./img/korwin_selfie.webp",
];

//  funkcja ładująca zmienne
async function load() {
  if(itemExists("pitchVal"))
  {
    data.tts.pitchVal = Number(window.localStorage.getItem("pitchValue"));
    document.getElementById("pitchVal").value = String(data.tts.pitchVal);
  }

  if(itemExists("rateVal"))
  {
    data.tts.rateVal = Number(window.localStorage.getItem("rateValue"));
    document.getElementById("rateVal").value = String(data.tts.rateVal);
  }

  if(itemExists("isVoice"))
  {
    data.tts.isVoice = Boolean(window.localStorage.getItem("isVoice"));
    document.getElementById("isVoice").checked = String(data.tts.isVoice);
  }

  console.log(
    `Łączna liczba możliwości: ${
      (korwin.p.length + 1) *
      (korwin.d.length + 1) *
      (korwin.t.length + 1) *
      (korwin.c.length + 1) *
      (korwin.i.length + 1) *
      (korwin.s.length + 1)
    }`
  );

  //losowy background
  document.getElementById("responsywnykorwin").src =
    bgImages[Math.floor(Math.random() * bgImages.length)];

  delete bgImages;
}

// funkcja generująca wypowiedź
async function przemowa() {
  if(isBusy) return;
  isBusy = true;
  let text = [];
  text.push(korwin.p.random());
  text.push(korwin.d.random());
  text.push(korwin.t.random());
  text.push(korwin.c.random());
  text.push(korwin.i.random());
  text.push(korwin.s.random());
  let ttext = text.join(" ");

  if (data.tts.isVoice) {
    if(!isTalking)
    {
      tts_przemowa(ttext);
    } else 
    {
      await window.speechSynthesis.cancel();
      tts_przemowa(ttext);
    }
  }

  dodajWdelay(ttext);
  last = ttext; 
}

async function dodajWdelay(ttext) 
{
  let simText = [];
  for (let i in ttext) {
    simText.push(ttext[i]);
    textarea.value = simText.join("");
    await sleep(textTime);
  }
  isBusy = false;
}

async function tts_przemowa(text) {
  isTalking = true;
  synth.text = text
  synth.pitch = data.tts.pitchVal;
  synth.rate = data.tts.rateVal;

  console.log(synth)

  window.speechSynthesis.speak(synth);
}


//generuj po kliknieciu przycisku

document.addEventListener("keydown", function (e) {
  let allowKeyDowns = ["Space"];
  if (allowKeyDowns.includes(e.code)) przemowa();
});

//skopiowanie tekstu
let opacity = 0;
async function copy() {
  await navigator.clipboard.writeText(last);
  let copyAlert = document.getElementById("copyAlert");
  let increement = 0.25;
  let instanceIn = window.setInterval(function () {
    copyAlert.style.opacity = opacity;
    opacity = opacity + increement;
    if (opacity > 1) window.clearInterval(instanceIn);
  }, 50);
  await sleep(4000);
  let instanceOut = window.setInterval(function () {
    copyAlert.style.opacity = opacity;
    opacity = opacity - increement;
    if (opacity < 0) window.clearInterval(instanceOut);
  }, 50);
}

//opcje

let isVoice = document.getElementById("isVoice");
let rate = document.getElementById("rateVal");
let pitch = document.getElementById("pitchVal");


isVoice.onchange = function (e) {
  window.localStorage.setItem("isVoice", isVoice.checked);
  data.tts.isVoice = isVoice.checked;
};

rate.onchange = function (e) {
  //min 0.1 - 10
  if (Number(rate.value) > 10) rate.value = 10;
  if (Number(rate.value) < 0.1) rate.value = 0.1;
  window.localStorage.setItem("rateValue", rate.value);
  data.tts.rateVal = Number(rate.value)
};

pitch.onchange = function (e) {
  //min 0.1 max 2
  if (Number(pitch.value) > 2) pitch.value = 2;
  if (Number(pitch.value) < 0.1) pitch.value = 0.1;
  window.localStorage.setItem("pitchValue", pitch.value);
  data.tts.pitchVal = Number(pitch.value)
};

//kontrola modułu opcji

const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const openModal = document.getElementById("button-OpenOptionModal");
const saveOption = document.getElementById("button-saveOption");

openModal.onclick = function () {
  modal.style.display = "block";
};
closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target == modal) modal.style.display = "none";
};

//Inne funkcje

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

let itemExists = async function (key)
{
  if (localStorage.getItem(key) !== null) {
    return true; 
  } else {
    return false; 
  }
}