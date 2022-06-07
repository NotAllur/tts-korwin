let speech = new SpeechSynthesisUtterance();
speech.lang = "pl";
let last

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

  console.log(text);
  console.log(ttext);

  document.querySelector("textarea").value = `„${ttext}”`;
  speech.text = ttext;
  last = ttext

  window.speechSynthesis.speak(speech);
}

//skopiowanie tekstu
async function copy () {
  await navigator.clipboard.writeText(last);
  alert(`Skopiowano przemówienie : \n${last}`);
}

//opcje
document.querySelector("#volmue").addEventListener('onChange', () => {
  document.getElementById('volmueVal').innerText = document.getElementById('volmue').value;
})

document.querySelector('#pitch').addEventListener('onChange', () => {
  document.getElementById('pitchVal').innerText = document.getElementById('pitch').value
})