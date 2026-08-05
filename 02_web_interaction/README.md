# 2. Interaktion

Brugeren klikker — koden svarer. Det kaldes et **event**.

**Demo:** [https://simmoe.github.io/Programmering_B/02_web_interaction/](https://simmoe.github.io/Programmering_B/02_web_interaction/)

## Koncept: `mousePressed`

```js
select('#theButton').mousePressed(() => {
  console.log('Klik!')
})
```

Vi **binder** et HTML-element til JavaScript og lytter efter klik.

## Kode
Åbn [index.html](index.html)

## Reference
- p5 `mousePressed`: https://p5js.org/reference/p5.Element/mousePressed/
- p5 `createButton`: https://p5js.org/reference/p5/createButton/
- MDN events: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

← [Forrige](../01_web_template/README.md) · [Pensum](../PENSUM.md) · → [Næste: Parallax](../03_web_parallax/README.md)
