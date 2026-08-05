# 4. Webcam, mic & speech

Kamera, lyd, optagelse og tale i browseren.

**Demo:** [https://simmoe.github.io/Programmering_B/04_webcam_mic_speech/](https://simmoe.github.io/Programmering_B/04_webcam_mic_speech/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Webcam med `createCapture`

```js
capture = createCapture(VIDEO, { flipped: true })
capture.size(720, 468)
select('#page1').child(capture)
```

Browseren spørger om lov til at bruge kameraet. Så får du et live video-billede på siden.

**Reference:** [p5 createCapture](https://p5js.org/reference/p5/createCapture/)

---

## Forudindlæs lyd: `preload` + `loadSound`

```js
function preload() {
  otterSound = loadSound('./assets/ottersound.mp3')
}
```

`preload()` kører før `setup()`. Så er lyden klar, når brugeren klikker.

**Reference:** [p5 loadSound](https://p5js.org/reference/p5/loadSound/) · [p5 preload](https://p5js.org/reference/p5/preload/)

---

## Afspil lyd ved klik

```js
select('#otter').mousePressed(() => {
  otterSound.play()
})
```

Når elementet klikkes, afspilles lyden.

**Reference:** [p5 mousePressed](https://p5js.org/reference/p5.Element/mousePressed/) · [p5 SoundFile.play](https://p5js.org/reference/p5.SoundFile/play/)

---

## Vis GIF og skjul et element

```js
fireGif = createImg('./assets/fire.gif')
select('#page2').child(fireGif)
select('#otter').hide()
```

Ved klik kan vi både vise noget nyt og skjule det gamle.

**Reference:** [p5 createImg](https://p5js.org/reference/p5/createImg/) · [p5 hide](https://p5js.org/reference/p5.Element/hide/)

---

## Lyd med afspilningsknapper: `createAudio`

```js
rainSound = createAudio('./assets/rain.mp3')
rainSound.showControls()
select('#page2').child(rainSound)
```

Her får brugeren selv play/pause på siden.

**Reference:** [p5 createAudio](https://p5js.org/reference/p5/createAudio/)

---

## Optag fra mikrofon

```js
let mic = new p5.AudioIn()
mic.start()

recorder = new p5.SoundRecorder()
recorder.setInput(mic)
recorder.record(audioFile) // start
recorder.stop()            // stop
```

Mikrofonen tændes, lyden optages ind i en fil, og bagefter kan den afspilles eller gemmes.

**Reference:** [p5 AudioIn](https://p5js.org/reference/p5/AudioIn/) · [p5 SoundRecorder](https://p5js.org/reference/p5.sound/p5.SoundRecorder/)

---

## Toggle med en boolean

```js
if (!isRecording) {
  recorder.record(audioFile)
  isRecording = true
} else {
  recorder.stop()
  isRecording = false
}
```

`true`/`false` husker, om vi er i gang med at optage. Samme knap kan derfor både starte og stoppe.

**Reference:** [MDN if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

---

## Speech synthesis (tale)

```js
const utterance = new SpeechSynthesisUtterance(speakInp.value())
utterance.lang = 'da-DK'
utterance.rate = 1.2
utterance.pitch = 1.0
speechSynthesis.speak(utterance)
```

Teksten fra inputfeltet bliver læst højt af browseren.

**Reference:** [MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) · [MDN SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

← [Forrige: Parallax](../03_web_parallax/README.md) · [Pensum](../PENSUM.md) · → [Næste: Arrays](../05_arrays/README.md)
