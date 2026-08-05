# 8. Blackjack & fetch

Når data ligger på nettet, henter vi dem med `fetch()`.

## Koncept: `async` / `await`

```js
async function getDeck() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
  const data = await response.json()
  console.log(data)
}
```

`await` = “vent på svaret, før du går videre”.

## Kode
Åbn [index.html](index.html)

## Reference
- MDN `fetch`: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- MDN `async`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- MDN `await`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

← [Forrige](../07_quiz_game/README.md) · [Pensum](../PENSUM.md) · → [Næste: Firebase](../09_firebase/README.md)
