# 7. Quiz

Hvert spørgsmål er et **objekt**. Quizzen er et **array** af objekter.

**Demo:** [https://simmoe.github.io/Programmering_B/07_quiz_game/](https://simmoe.github.io/Programmering_B/07_quiz_game/)

## Koncept: objekt + sammenligning

```js
let questions = [
  { text: 'JS kører i browseren', answer: true }
]

if (questions[q].answer == userAnswer) {
  score++
}
```

Objekt = flere oplysninger samlet. `==` tjekker om svaret er rigtigt.

## Kode
Åbn [index.html](index.html)

## Reference
- MDN Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
- MDN Equality (`==`): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
- p5 `html()`: https://p5js.org/reference/p5.Element/html/

← [Forrige](../06_memory_game/README.md) · [Pensum](../PENSUM.md) · → [Næste: Fetch](../08_blackjack_fetch_api/README.md)
