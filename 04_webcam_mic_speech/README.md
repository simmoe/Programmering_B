# 4. Webcam, mic & speech

Her er flere medie-teknikker i samme projekt.  
Læs hvert koncept ultrakort → prøv det i demoen → ændr det → lav din egen version.

**Demo:** [https://simmoe.github.io/Programmering_B/04_webcam_mic_speech/](https://simmoe.github.io/Programmering_B/04_webcam_mic_speech/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Use → Modify → Create

1. **Use:** Åbn demoen. Prøv webcam, odder-klik, optagelse og speech.
2. **Modify:** Skift én ting ad gangen (lydfil, sprog, knaptekst, gif).
3. **Create:** Lav din egen side, hvor mindst to teknikker arbejder sammen.

---

## 1. Webcam med `createCapture`

```js
capture = createCapture(VIDEO, { flipped: true })
capture.size(720, 468)
select('#page1').child(capture)
```

Browseren spørger om kamera-adgang. Så får du et live video-element.

**Reference:** [p5 createCapture](https://p5js.org/reference/p5/createCapture/)

---

## 2. Forudindlæs lyd med `preload` + `loadSound`

```js
function preload() {
  otterSound = loadSound('./assets/ottersound.mp3')
}
```

`preload()` kører før `setup()`, så lyden er klar, når brugeren klikker.

**Reference:** [p5 loadSound](https://p5js.org/reference/p5/loadSound/) · [p5 preload](https://p5js.org/reference/p5/preload/)

---

## 3. Afspil lyd ved klik

```js
select('#otter').mousePressed(() => {
  otterSound.play()
})
```

Én handling → én effekt. Det er grundmodellen for næsten al interaktion.

**Reference:** [p5 mousePressed](https://p5js.org/reference/p5.Element/mousePressed/) · [p5 SoundFile.play](https://p5js.org/reference/p5.SoundFile/play/)

---

## 4. Vis/skjul elementer + GIF

```js
fireGif = createImg('./assets/fire.gif')
select('#page2').child(fireGif)
select('#otter').hide()
```

Klik kan både starte lyd og ændre det visuelle samtidigt.

**Reference:** [p5 createImg](https://p5js.org/reference/p5/createImg/) · [p5 hide](https://p5js.org/reference/p5.Element/hide/)

---

## 5. Lyd med kontroller: `createAudio`

```js
rainSound = createAudio('./assets/rain.mp3')
rainSound.showControls()
select('#page2').child(rainSound)
```

Her får brugeren play/pause selv — godt til baggrundsmusik.

**Reference:** [p5 createAudio](https://p5js.org/reference/p5/createAudio/)

---

## 6. Optag fra mikrofon

```js
let mic = new p5.AudioIn()
mic.start()

recorder = new p5.SoundRecorder()
recorder.setInput(mic)
recorder.record(audioFile) // start
recorder.stop()            // stop
```

Vi tænder mic → optager ind i en `SoundFile` → kan afspille/gemme bagefter.

**Reference:** [p5 AudioIn](https://p5js.org/reference/p5/AudioIn/) · [p5 SoundRecorder](https://p5js.org/reference/p5.sound/p5.SoundRecorder/)

---

## 7. Toggle med en boolean

```js
if (!isRecording) {
  recorder.record(audioFile)
  isRecording = true
} else {
  recorder.stop()
  isRecording = false
}
```

Samme knap gør to ting, afhængigt af state. Meget nyttigt i spil og UI.

**Reference:** [MDN if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

---

## 8. Speech synthesis (tale)

```js
const utterance = new SpeechSynthesisUtterance(speakInp.value())
utterance.lang = 'da-DK'
utterance.rate = 1.2
utterance.pitch = 1.0
speechSynthesis.speak(utterance)
```

Her bruger vi browserens egen API (ikke kun p5). Tekst bliver til tale.

**Reference:** [MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) · [MDN SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

---

## Små modify-udfordringer

- Skift `utterance.lang` til `da-DK`, `en-US` eller noget helt skørt
- Erstat odder-lyden med din egen fil i `assets/`
- Få webcam og speech på samme side
- Gem optagelsen med et andet filnavn

← [Forrige: Parallax](../03_web_parallax/README.md) · [Pensum](../PENSUM.md) · → [Næste: Arrays](../05_arrays/README.md)
