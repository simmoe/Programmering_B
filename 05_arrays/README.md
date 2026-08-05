# 5. Arrays

Lister af data i JavaScript.

**Demo:** [https://simmoe.github.io/Programmering_B/05_arrays/](https://simmoe.github.io/Programmering_B/05_arrays/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Et array er en liste

```js
let navne = ['Rikke', 'Peter', 'Zenia']
```

I stedet for tre separate variabler samler vi værdierne i én liste.  
Pladserne har numre: `navne[0]` er `"Rikke"`, `navne[1]` er `"Peter"`.

**Reference:** [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

## Hvor lang er listen? `.length`

```js
console.log(navne.length) // 3
```

`.length` fortæller, hvor mange elementer der er i arrayet.  
Det sidste element sidder på plads `navne.length - 1`.

**Reference:** [MDN length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

---

## Læs ét element med index

```js
console.log(navne[0]) // "Rikke"
console.log(navne[2]) // "Zenia"
```

Tællingen starter ved `0`, ikke ved `1`.

**Reference:** [MDN Accessing array elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#accessing_array_elements)

---

## Tilføj bagerst: `push()`

```js
navne.push('Mollie')
// ['Rikke', 'Peter', 'Zenia', 'Mollie']
```

Det nye element lægges til sidst i listen.

**Reference:** [MDN push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

---

## Fjern bagerst: `pop()`

```js
navne.pop()
// fjerner "Mollie"
```

`pop()` fjerner det **sidste** element.

**Reference:** [MDN pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

---

## Fjern eller indsæt midt i listen: `splice()`

```js
// fjern 1 element fra index 1
navne.splice(1, 1)
// ['Rikke', 'Zenia']

// indsæt "Asta" på index 1
navne.splice(1, 0, 'Asta')
// ['Rikke', 'Asta', 'Zenia']
```

`splice(start, antal, nytElement)` kan både slette og indsætte.  
`antal` = hvor mange der skal fjernes. `0` betyder: slet ingenting, bare indsæt.

**Reference:** [MDN splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

---

## Findes noget i listen? `includes()`

```js
navne.includes('Peter') // true eller false
```

God til at tjekke, om en værdi allerede findes, før du tilføjer eller filtrerer.

**Reference:** [MDN includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

---

## Løb listen igennem: `map()`

Forestil dig, at listen er en række postkasser.  
`map()` går forbi **hver** postkasse og gør det samme ved dem alle.

```js
navne.map(navn => {
  console.log(navn)
})
```

Her betyder det:

1. Tag første navn → skriv det i konsollen  
2. Tag næste navn → skriv det i konsollen  
3. Fortsæt indtil listen er færdig  

`navn` er bare et midlertidigt navn for “det element, vi kigger på lige nu”.

**Reference:** [MDN map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

---

## Filtrer listen: `filter()`

```js
let lange = navne.filter(navn => navn.length > 5)
```

`filter()` laver en **ny** liste med kun de elementer, der klarer testen.  
Den oprindelige liste bliver uændret.

**Reference:** [MDN filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

← [Forrige: Webcam](../04_webcam_mic_speech/README.md) · [Pensum](../PENSUM.md) · → [Næste: Memory](../06_memory_game/README.md)
