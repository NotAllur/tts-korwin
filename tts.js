let speech = new SpeechSynthesisUtterance();
speech.lang = "pl";
let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

function przemowa() {
  let korwin = {
    p: [
      "Prosze zwrócić uwage, że",
      "I tak mam trzy razy mniej czasu, więc prosze mi pozwolić powiedzieć",
      "Państwo sie sie śmieją, ale",
      "Ja nie potrzebowałem edukacji seksualnej, żeby wiedzieć, że",
      "No niestety:",
      "Gdzie leży przyczyna problemu? Ja Państwu powiem:",
      "Państwo chyba nie wiedzą, że",
      "Oświadczam kategorycznie:",
      "Powtarzam:",
      "powiedzmy to z całą mocą:",
      "W Polsce dzisiaj",
      "Państwo sobie nie zdają sprawy, że",
      "To ja przepraszam bardzo:",
      "Otóż nie wiem, czy pan wie, że",
      "Yyyyy...",
      "Ja chce powiedzieć jedną rzecz:",
      "Trzeba to powiedzieć jasno:",
      "Jakby to powiedział wybitny krakowianyn Stanisław Lem",
      "Prosze mnie dobrze zrozumieć:",
      "Ja chciałem państwu przypomnieć, że",
      "Niech państwo nie mają złudzeń:",
      "Powiedzmy to wyraźnie:",
    ],
    d: [
      "oczywiście, że lałem dzieci,",
      "Kobiety, które zawsze udają",
      "właściciele niewolników",
      "Związkowcy",
      "Trockliści",
      "tak zwane dzieci kwiaty",
      "rozmaici urzędnicy",
      "federaści",
      "etatyści",
      "ci durnie i złodzieje",
      "ludzie wybrani głosami meneli spod budki z piwem",
      "socjaliści pobożni",
      "socjaliści bezrobotni",
      "komuniści z krzyżem w zębach",
      "agenci obcych służb",
      "członkowie Bandy Czworga",
      "pseudo-masoni z Wielkiego Wschodu Francji",
      "przedstawiciele czerwonej hołoty",
      "ci wszyscy - tfu! - geje",
      "funkcjonariusze reżymowej telewizji",
      "tak zwani ekolodzy",
      "ci wszyscy - tfu! - demokranci",
      "agenci bezpieki",
      "feminazistki",
      "czterech milionów czarnych",
    ],
    t: [
      'po przeczytaniu "Manifestu Komunistycznego"',
      "którymi się brzydze",
      "których nienawidze",
      'z okolic "Gazety Wyborczej"',
      "czyli taka żydokomuna",
      "odkąd zniesiono kare śmierci",
      "którymi pogardzam",
      "których miejsce w normalnym kraju jest w więzieniu",
      "na polecenie Brukseli",
      "posłusznie",
      "bezmyślnie",
      "z nieprawdopodobną pogardą dla człowieka",
      "za pieniądze podatników",
      "zgodnie z ideologią LGBTQZ",
      "za wszelką cene",
      "zupełnie bezkarnie",
      "całkowicie bezczelnie",
      "o poglądach na lewo od komunizmu",
      "celowo i świadomie",
      "z premedytacją",
    ],
    c: [
      "udają homoseksualistów",
      "niszczą rodzinę",
      "idą do polityki",
      "zakazują góralom robienia oscypków",
      "organizują paraolimpiady",
      "wprowadzają ustrój, w którym raz na cztery lata można wybrać sobie pana",
      "ustawiają fotoradary",
      "wprowadzają dotacje",
      "wydzielają buspassy",
      "podnoszą wiek emerytalny",
      "rżną głupa",
      "odbierają dzieci rodzicom",
      "wprowadzają absurdalne przepisy",
      "umieszczają dzieci w szkołach koedukacyjnych",
      "wprowadzają parytety",
      "nawołują do podniesienia podatków",
      "próbują wyrzucić kierowców z miast",
      "próbują skłócić Polske z Rosją",
      "głoszą brednie o globalnym ociepleniu",
      "zakazują posiadania broni",
      "nie dopuszczają prawicy do władzy",
      "uczą dzieci homoseksualizmu",
      "chcą dopuścić kobiety do władzy",
      "chcą dać kobietom prawa",
    ],
    i: [
      "żeby poddawać wszystkich tresurze",
      "bo taka jest ich natura",
      "bo chcą wszystko kontrolować",
      "bo nie rozumieją, że socjalizm nie działa",
      "żeby wreszczie zapanował socjalizm",
      "dokładnie tak jak towarzysz Janosik",
      "zamiast pozwolić ludziom zarabiać",
      "żeby wyrwać kobiety z domu",
      "bo to jest w interesie tak zwanych ludzi pracy",
      "zamiast pozwolić decydować konsumentowi",
      "żeby nie opłacało sie mieć dzieci",
      "zamiast obniżyć podatki",
      "bo nie rozumieją, że selekcja naturalna jest czymś dobrym",
      "żeby mężczyźni przestali być agresywni",
      "bo dzięki temu mogą kraść",
      "bo dostają za to pieniądze",
      "bo tak sie uczy w państwowej szkole",
      "bo bez tego (tfu!) demokracja nie może istnieć",
      "bo głupich jest więcej niż mądrych",
      "bo chcą stworzyć raj na ziemii",
      "bo chcą zniszczyć cywilizacje białego człowieka",
      "bo takie jest prawo czarnego rynku",
    ],
    s: [
      "co ma zresztą tyle samo sensu, co zawody w szachach dla debili.",
      "co zostało dokładnie zaplanowane w Magdalence przez świętej pamięci Genereała Kiszczaka.",
      "i trzeba być idiotą, żeby ten system popierać.",
      "ale nawet ja jeszcze dożyje normalnych czasów.",
      "co dowodzi, że wyskrobano nie tych, co trzeba.",
      'a zwykłym ludziom wmawiają że im coś "dadzą".',
      "- cóż: chcieliście - tfu! - demokracji to macie.",
      "dlatego trzeba zlikwidować koryto a nie zmieniać świnie.",
      "a wystarczyłoby przestać wypłacać zasiłki.",
      "podczas gdy biali ludzie uważani są za dziwaków.",
      "co w wieku XIX po prostu by wyśmiano.",
      "- dlatego w społeczeństwie jest równość, a powinno być rozwarstwienie.",
      "ale w wolnej Polsce pójdą siedzieć.",
      "przez kolejne kadencje.",
      "o czym sie nie mówi.",
      "i dlatego właśnie Europa umiera.",
      "ale przyjdą muzułmanie i zrobią porządek.",
      "- tak samo zresztą jak za Hitlera.",
      "- prosze zobaczyć, co sie dzieje na Zachodzie, jeśli państwo nie wierzą.",
      "co lat temu sto nikomu nie przyszłoby do głowy.",
      "Lud jest głupi jak but z lewej stopy.",
      "jest dużo bardziej zasadne niż edukacja seksualna młodzieży.",
      "powinno być z całą surowością karane.",
    ],
  };

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

  document.querySelector("textarea").value = ttext;
  speech.text = ttext;

  window.speechSynthesis.speak(speech);
}
