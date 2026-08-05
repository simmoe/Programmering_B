# 12. Personligt API

Når den samme kode går igen i flere projekter, kan vi samle den i **genbrugelige funktioner**.

**Kode / opgave:** [OPGAVE.md](OPGAVE.md)

---

## Hvad betyder “API” her?

Et API er i denne sammenhæng en **lille værktøjskasse af funktioner**, du selv har lavet.

Du kalder dem med et klart navn — uden at skulle huske hele den indre kode hver gang:

```js
startTimer(10)
playSound('./assets/click.mp3')
shiftPage('#page1', '#page2', 'show')
```

Funktionerne gemmes typisk i en fil for sig, fx `myApi.js`.

**Reference:** [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

---

## Parametre gør koden generel

Uden parametre er funktionen låst til én værdi:

```js
function startTimer() {
  let seconds = 10 // altid 10
}
```

Med parametre kan den bruges på mange måder:

```js
function startTimer(seconds) {
  // seconds kan være 10, 30, 60 ...
}

startTimer(10)
startTimer(30)
```

Parameter = input til funktionen.  
Det er sådan, vi **generaliserer** en kodestump.

**Reference:** [MDN Function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters)

---

## Flere parametre

```js
function showMessage(text, color) {
  select('#msg').html(text)
  select('#msg').style('color', color)
}

showMessage('Du vandt!', 'green')
showMessage('Prøv igen', 'red')
```

Samme funktion — forskelligt indhold.

---

## `return` giver noget tilbage

```js
function double(n) {
  return n * 2
}

let resultat = double(5) // 10
```

`return` sender en værdi **ud** af funktionen, så du kan gemme eller bruge den videre.

**Reference:** [MDN return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

---

## Saml funktionerne i en fil

`myApi.js`:

```js
function shuffle(list) {
  // ...
}

function playSound(path) {
  // ...
}
```

`index.html` (husk rækkefølgen — API før den kode, der bruger det):

```html
<script src="./myApi.js"></script>
<script src="./index.js"></script>
```

Nu kan både dette projekt og næste projekt genbruge de samme værktøjer.

**Reference:** [MDN Script loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)

---

## Eksempel: generaliseret `shiftPage`

I stedet for at bruge en global `currentPage` og altid klassen `show`, kan funktionen tage **alt** ind som parametre:

```js
function shiftPage(currentId, newId, className) {
  select(currentId).removeClass(className)
  select(newId).addClass(className)
}

shiftPage('#page1', '#page2', 'show')
shiftPage('#intro', '#gameplay', 'active')
```

- `currentId` — siden der skal skjules  
- `newId` — siden der skal vises  
- `className` — hvilken CSS-klasse der styrer synlighed  

Så virker funktionen i flere projekter, også hvis I ikke kalder klassen `show`.

**Reference:** [p5 select](https://p5js.org/reference/p5/select/) · [p5 addClass](https://p5js.org/reference/p5.Element/addClass/) · [p5 removeClass](https://p5js.org/reference/p5.Element/removeClass/)

← [Forrige: Favoritspil](../11_AAR_2_START/README.md) · [Pensum](../PENSUM.md)
