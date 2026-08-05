# 8. Blackjack & fetch

Her henter vi data fra nettet og styrer et spil med **state**.  
Læs hvert koncept ultrakort → prøv demoen → ændr → byg videre.

**Demo:** [https://simmoe.github.io/Programmering_B/08_blackjack_fetch_api/](https://simmoe.github.io/Programmering_B/08_blackjack_fetch_api/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Use → Modify → Create

1. **Use:** Start spillet. Træk kort. Se konsollen.
2. **Modify:** Ændr tekster, skjul/vis knapper, eller kort-logik.
3. **Create:** Lav din egen lille app, der henter JSON fra et API.

---

## 1. `fetch` henter data fra nettet

```js
const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
const data = await response.json()
```

Først kommer et response. Derefter laver vi det om til JSON-data.

**Reference:** [MDN fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

---

## 2. `async` / `await`

```js
async function getDeck() {
  const response = await fetch('...')
  const data = await response.json()
}
```

`await` = “vent på svaret, før du går videre”. Ellers når koden videre for tidligt.

**Reference:** [MDN async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) · [MDN await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

---

## 3. `try` / `catch` ved fejl

```js
try {
  // fetch her
} catch (error) {
  console.log(error)
}
```

Hvis nettet fejler, crasher programmet ikke — vi fanger fejlen.

**Reference:** [MDN try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

---

## 4. State styrer spillets flow

```js
var state = 'begin'
// senere:
state = 'player'
state = 'dealer'
```

Samme funktion (`drawCard`) gør forskellige ting alt efter `state`.

**Reference:** [MDN variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)

---

## 5. Objekter til spiller og dealer

```js
var player = {
  cards: [],
  total: 0
}
```

Vi samler relaterede data i ét objekt i stedet for mange løse variabler.

**Reference:** [MDN Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

---

## 6. Vis/skjul UI med p5

```js
select('#playerDrawBtn').hide()
select('#playerStandBtn').hide()
```

Når det er dealerens tur, skjuler vi spillerens knapper.

**Reference:** [p5 hide](https://p5js.org/reference/p5.Element/hide/) · [p5 show](https://p5js.org/reference/p5.Element/show/)

---

## Små modify-udfordringer

- Log `data` fra API’et og find `deck_id`
- Vis spillerens total tydeligere på siden
- Lav en “nyt spil”-flow der føles bedre
- Hent 2 kort med det samme i stedet for 1

← [Forrige: Quiz](../07_quiz_game/README.md) · [Pensum](../PENSUM.md) · → [Næste: Firebase](../09_firebase/README.md)
