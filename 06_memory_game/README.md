# 6. Memory game

Spillet husker midlertidig tilstand: hvilke kort er vendt?

**Demo:** [https://simmoe.github.io/Programmering_B/06_memory_game/](https://simmoe.github.io/Programmering_B/06_memory_game/)

## Koncept: array som state

```js
let flippedCards = []

flippedCards.push(card)

if (flippedCards.length == 2) {
  // tjek match
}
```

Vi gemmer de vendte kort i et array, indtil der er to.

## Kode
Åbn [index.html](index.html)

## Reference
- MDN `push()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
- MDN `if`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
- p5 `addClass`: https://p5js.org/reference/p5.Element/addClass/

← [Forrige](../05_arrays/README.md) · [Pensum](../PENSUM.md) · → [Næste: Quiz](../07_quiz_game/README.md)
