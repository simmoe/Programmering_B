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

## Tilføj noget til listen: `push()`

```js
navne.push('Mollie')
```

Det nye navn lægges bagerst i listen.

**Reference:** [MDN push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

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

**Reference:** [MDN filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

← [Forrige: Webcam](../04_webcam_mic_speech/README.md) · [Pensum](../PENSUM.md) · → [Næste: Memory](../06_memory_game/README.md)
