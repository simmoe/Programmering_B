# 8. Blackjack & fetch

Hent kort fra et API og styr spillet med state.

**Demo:** [https://simmoe.github.io/Programmering_B/08_blackjack_fetch_api/](https://simmoe.github.io/Programmering_B/08_blackjack_fetch_api/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## `fetch` henter data fra nettet

```js
const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
const data = await response.json()
```

`fetch` spørger en server. `response.json()` laver svaret om til data, vi kan bruge i JavaScript.

**Reference:** [MDN fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

---

## `async` / `await`

```js
async function getDeck() {
  const response = await fetch('...')
  const data = await response.json()
}
```

Data fra nettet kommer ikke med det samme. `await` betyder: vent her, indtil svaret er klar.

**Reference:** [MDN async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) · [MDN await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

---

## `try` / `catch`

```js
try {
  // fetch her
} catch (error) {
  console.log(error)
}
```

Hvis noget går galt (fx ingen internet), fanger vi fejlen i stedet for at lade programmet crashe.

**Reference:** [MDN try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

---

## State

```js
var state = 'begin'
state = 'player'
state = 'dealer'
```

`state` husker, hvor spillet er henne. Samme funktion kan gøre forskellige ting alt efter værdien.

**Reference:** [MDN variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)

---

## Objekter til spiller og dealer

```js
var player = {
  cards: [],
  total: 0
}
```

Et objekt samler flere oplysninger om den samme ting — her spillerens kort og point.

**Reference:** [MDN Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

---

## Skjul knapper med `hide()`

```js
select('#playerDrawBtn').hide()
select('#playerStandBtn').hide()
```

Når det er dealerens tur, gemmer vi spillerens knapper væk.

**Reference:** [p5 hide](https://p5js.org/reference/p5.Element/hide/) · [p5 show](https://p5js.org/reference/p5.Element/show/)

← [Forrige: Quiz](../07_quiz_game/README.md) · [Pensum](../PENSUM.md) · → [Næste: Firebase](../09_firebase/README.md)
