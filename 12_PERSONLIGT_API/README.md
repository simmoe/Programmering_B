# 12. Personligt API

Når den samme kode går igen i flere projekter, kan vi samle den i **genbrugelige funktioner**.

**Kode / opgave:** [OPGAVE.md](OPGAVE.md)

---

## Hvad betyder “API” her?

Et API er i denne sammenhæng en **lille værktøjskasse af funktioner**, du selv har lavet.

Du kalder dem med et klart navn — uden at skulle huske hele den indre kode hver gang:

```js
startTimer(10, '#timer')
showToast('Forbundet til MQTT')
showMessage('Du vandt!', '#result')
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

Det der kan skifte, skal ind som parametre — både **indhold** og **mål**:

```js
function showMessage(text, divId) {
  select(divId).html(text)
}

showMessage('Du vandt!', '#result')
showMessage('Prøv igen', '#hint')
```

Samme funktion — forskellig tekst og forskelligt element.

---

## Default-værdier for parametre

I JavaScript laver man **ikke** flere versioner af samme funktion med forskelligt antal parametre (som i nogle andre sprog).  
I stedet kan en parameter have en **default-værdi**, hvis den ikke bliver sendt med:

```js
function showToast(text, ms = 2500) {
  select('#toast').html(text)
  select('#toast').addClass('show')

  setTimeout(() => {
    select('#toast').removeClass('show')
  }, ms)
}

showToast('Hej')          // bruger 2500 ms
showToast('Hej', 5000)    // bruger 5000 ms
```

`ms = 2500` betyder: “hvis du ikke siger andet, så vent 2,5 sekunder”.

Det kræver et HTML-element, fx:

```html
<div id="toast"></div>
```

…og CSS der gør `#toast` til en kort notifikation øverst til højre (som I så i favoritspil/MQTT-forløbet).

**Reference:** [MDN Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

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

## Callback: en funktion som parameter

Indtil nu har parametre været ting som tekst, tal eller id’er.  
En parameter kan også være **en hel funktion**.

Det kaldes en **callback**: “her er en funktion — kald den, når noget sker”.

Først laver du den funktion, der skal køres:

```js
function startSpil() {
  showToast('Spillet starter')
  shiftPage('#page1', '#page2', 'show')
}
```

Så giver du den videre til en helper:

```js
function bindClick(id, callback) {
  select(id).mousePressed(callback)
}

bindClick('#startBtn', startSpil)
```

Når knappen klikkes, kalder `bindClick` automatisk `startSpil`.  
Du skriver ikke `startSpil()` med parentes her — du giver selve funktionen videre.

Samme idé bruger I senere med MQTT: `mqttListen(topic, handleMqttMessage)`.

**Reference:** [MDN Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

---

## Saml funktionerne i en fil

`myApi.js`:

```js
function shuffle(list) {
  // ...
}

function showToast(text, ms = 2500) {
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

---

## Eksempel: MQTT-helper

MQTT-koden fra favoritspil-forløbet kan også pakkes ind.  
Idéen: du giver **topic** og en **funktion**, der skal kaldes, når der kommer en besked.

```js
function mqttListen(topic, onMessage) {
  let client = mqtt.connect('wss://mqtt.nextservices.dk')

  client.on('connect', () => {
    client.subscribe(topic)
  })

  client.on('message', (t, message) => {
    onMessage(message.toString())
  })

  return client
}

// Din egen funktion — den kaldes automatisk, når der kommer en besked
function handleMqttMessage(tekst) {
  showToast(tekst)
  // eller: skift side, hvis tekst er "1", "2", "3"
}

// brug:
mqttListen('programmering', handleMqttMessage)
```

Her er `handleMqttMessage` igen en **callback** — præcis som `startSpil` i `bindClick`.  
Forskellen er bare, *hvornår* den kaldes: ved MQTT-besked i stedet for ved klik.

Husk MQTT-scriptet i HTML:

```html
<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
```

**Reference:** [mqtt.js](https://github.com/mqttjs/MQTT.js) · [MDN Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

← [Forrige: Favoritspil](../11_AAR_2_START/README.md) · [Pensum](../PENSUM.md)
