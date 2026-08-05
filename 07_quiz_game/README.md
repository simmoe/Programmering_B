# 7. Quiz

Quizzen er bygget af **JSON-objekter** i et array.

**Demo:** [https://simmoe.github.io/Programmering_B/07_quiz_game/](https://simmoe.github.io/Programmering_B/07_quiz_game/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Hvad er JSON?

JSON er en måde at skrive data på som **nøgle + værdi**.

```js
{
  "spørgsmål": "Hummere har blåt blod.",
  "svar": true
}
```

- `"spørgsmål"` og `"svar"` er **nøgler** (navne på felterne)
- `"Hummere har blåt blod."` og `true` er **værdier**

Tænk på det som et lille arkivkort: feltnavn til venstre, indhold til højre.

**Reference:** [MDN JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) · [MDN Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

---

## Læs en værdi ud af et objekt

```js
let q1 = {
  "spørgsmål": "Hummere har blåt blod.",
  "svar": true
}

console.log(q1.spørgsmål) // teksten
console.log(q1.svar)      // true
```

Med punktum henter vi værdien bag nøglen: `objekt.nøgle`.

**Reference:** [MDN Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)

---

## En liste af JSON-objekter

Én ting er ét objekt. En hel quiz er et **array** af objekter:

```js
let questions = [
  {
    "spørgsmål": "Hummere har blåt blod.",
    "svar": true
  },
  {
    "spørgsmål": "Vandmænd har lunger.",
    "svar": false
  }
]
```

Nu har vi:

- `questions[0]` → første spørgsmål-objekt  
- `questions[1]` → andet spørgsmål-objekt  
- `questions[0].spørgsmål` → teksten i første spørgsmål  
- `questions[0].svar` → det rigtige svar

**Reference:** [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

## Vis det aktuelle spørgsmål

```js
var q = 0 // hvilket spørgsmål vi er nået til

select('#question').html(questions[q].spørgsmål)
```

`q` er indexet i listen. Når `q` er `0`, viser vi første spørgsmål. Når `q` bliver `1`, viser vi det næste.

**Reference:** [p5 html()](https://p5js.org/reference/p5.Element/html/)

---

## Tjek svaret

```js
if (questions[q].svar == userAnswer) {
  score++
}
```

Vi sammenligner brugerens svar med feltet `"svar"` i det aktuelle JSON-objekt.

**Reference:** [MDN Equality (`==`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality)

---

## Gå videre i listen

```js
q++
if (questions.length == q) {
  // quizzen er færdig
}
```

Når `q` har samme værdi som `questions.length`, er der ikke flere spørgsmål tilbage.

**Reference:** [MDN length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

← [Forrige: Memory](../06_memory_game/README.md) · [Pensum](../PENSUM.md) · → [Næste: Fetch](../08_blackjack_fetch_api/README.md)
