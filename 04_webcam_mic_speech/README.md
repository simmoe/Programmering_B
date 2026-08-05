# 4. Webcam, mic & speech

Browseren kan bruge kamera, mikrofon og tale.

**Demo:** [https://simmoe.github.io/Programmering_B/04_webcam_mic_speech/](https://simmoe.github.io/Programmering_B/04_webcam_mic_speech/)

## Koncept: afspil lyd ved klik

```js
select('#otter').mousePressed(() => {
  otterSound.play()
})
```

Én handling (klik) → én effekt (lyd). Samme idé med speech og webcam.

## Kode
Åbn [index.html](index.html)

## Reference
- p5 `loadSound`: https://p5js.org/reference/p5/loadSound/
- p5 `createCapture`: https://p5js.org/reference/p5/createCapture/
- MDN Speech Synthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

← [Forrige](../03_web_parallax/README.md) · [Pensum](../PENSUM.md) · → [Næste: Arrays](../05_arrays/README.md)
