# Mit personlige API

**Programmering B — 2. år**  
**Udgangspunkt:** dette kapitel (`12_PERSONLIGT_API`)  
**Bygger videre på:** favoritspil-forløbet og teknikker fra 1. år

---

## Opgaven

Lav dit eget lille **API**: en fil med genbrugelige funktioner, du selv har generaliseret.

Filen skal hedde noget i stil med:

- `myApi.js`, eller  
- `ditnavnApi.js`

Du skal også have et lille projekt (`index.html` + `index.js` + CSS), der **viser**, at API’et virker.

---

## Krav til API’et

Dit API skal indeholde mindst **4 funktioner** med parametre.  
Funktionerne skal være **generelle**: det der kan skifte fra projekt til projekt, skal ind som parametre (fx hvilket element, hvilken klasse, hvilken tekst).

Vælg selv — her er forslag:

| Funktion | Hvad den gør |
|---|---|
| `shiftPage(currentId, newId, className)` | Skjuler én side og viser en anden med en CSS-klasse |
| `showMessage(text, divId)` | Skriver en besked ind i et bestemt HTML-element |
| `setText(id, text)` | Sætter teksten i et element (titel, score, hint osv.) |
| `bindClick(id, callback)` | Binder et klik på et element til en funktion |
| `show(id)` / `hide(id)` | Viser eller skjuler et element |
| `startTimer(seconds, displayId)` | Tæller ned/op og opdaterer tiden i et element på siden |
| `playSound(path)` | Afspiller en lydfil fra en sti |
| `createList(list, containerId, className)` | Laver HTML-elementer ud fra et array |
| `shuffle(list)` | Blander et array og returnerer det |
| `randomFrom(list)` | Returnerer et tilfældigt element fra et array |

### Om `startTimer`

Den er til spil og tests, hvor tiden skal vises undervejs — fx countdown i et escape room, eller “klik så mange gange du kan på 10 sekunder”.

```js
startTimer(10, '#timer')
// viser fx: 10, 9, 8 ... i elementet med id="timer"
```

`seconds` = hvor lang tid.  
`displayId` = hvilket element på siden der skal opdateres.

Mindst én funktion skal bruge `return`.

---

## Krav til demo-projektet

Lav en lille side (eller et par sider), der kalder dine API-funktioner.

Det kan fx være:

- en mini-udgave af dit favoritspil-tema
- en klik-test med timer
- en “random fact”-side
- noget helt eget

Det vigtige er ikke det store produkt — det er, at API’et bliver brugt.

I `index.html` skal API-filen indlæses **før** `index.js`:

```html
<script src="./myApi.js"></script>
<script src="./index.js"></script>
```

---

## Du skal kunne forklare

- Hvad en parameter er, og hvorfor den gør funktionen mere generel
- Hvad `return` gør i mindst én af dine funktioner
- Hvorfor det er smart at samle genbrugelig kode i en separat fil
- Hvordan dit demo-projekt kalder API’et

---

## Aflevering

- `myApi.js` (eller tilsvarende) med mindst 4 funktioner
- Et lille demo-projekt der bruger dem
- Kort fremvisning: vis én funktion i API’et og ét sted, den bliver kaldt
