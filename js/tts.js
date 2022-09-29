let speech = new SpeechSynthesisUtterance();
speech.lang = "pl";
let last;

let textTime = 30;

const bgImages = [
  "../img/korwin.png",
  "../img/korwin_mlot_TVP.jpg",
  "../img/korwin_na_tronie_GOT.jpg",
  "../img/korwin_nie_zyjesz_lewaku.jpg",
  "../img/korwin_jumpscare.jpg",
  "../img/korwin_eksplozja.jpg",
  "../img/korwin_na_zlotym_tronie.jpg",
  "../img/korwin_gdynia_z_cukrem.png",
  "../img/korwin_przemawia_prawde.png",
  "../img/korwin_got_bitches.png",
  "../img/korwin_selfie.png",
];

//  funkcja ładująca zmienne
function load() {
  let korwin = data;

  document.getElementById("pitchVal").value =
    Number(window.localStorage.getItem("pitchValue")) || 1;
  document.getElementById("rateVal").value =
    Number(window.localStorage.getItem("rateValue")) || 1;
  document.getElementById("isVoice").checked =
    Boolean(window.localStorage.getItem("isVoice")) || true;

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
}

// funkcja generująca wypowiedź
async function przemowa() {
  let korwin = data;

  let text = [];
  text.push(korwin.p.random());
  text.push(korwin.d.random());
  text.push(korwin.t.random());
  text.push(korwin.c.random());
  text.push(korwin.i.random());
  text.push(korwin.s.random());
  let ttext = text.join(" ");

  let textarea = document.querySelector("textarea");

  dodajWdelay(ttext, textarea);

  speech.text = ttext;
  last = ttext;

  if (document.getElementById("isVoice").checked)
    window.speechSynthesis.speak(speech);
}

async function dodajWdelay(ttext, textarea) {
  let simText = [];
  for (let i in ttext) {
    simText.push(ttext[i]);
    textarea.value = simText.join("");
    await sleep(textTime);
  }
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
  window.localStorage.setItem(
    "isVoice",
    document.getElementById("isVoice").value
  );
};

rate.onchange = function (e) {
  //min 0.1 - 10
  if (Number(rate.value) > 10) rate.value = 10;
  if (Number(rate.value) < 0.1) rate.value = 0.1;
  window.localStorage.setItem("rateValue", rate.value);
};

pitch.onchange = function (e) {
  //min 0.1 max 2
  if (Number(pitch.value) > 2) pitch.value = 2;
  if (Number(pitch.value) < 0.1) pitch.value = 0.1;
  window.localStorage.setItem("pitchValue", pitch.value);
};

document.getElementById("button-saveOption").onclick = function (e) {};

//kontrola modułu opcji

let modal = document.getElementById("modal");
let closeModal = document.getElementById("close");
let openModal = document.getElementById("button-OpenOptionModal");
let saveOption = document.getElementById("button-saveOption");

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
