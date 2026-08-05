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

Vælg selv — her er forslag:

| Funktion | Idé |
|---|---|
| `shiftPage(currentId, newId, className)` | skift mellem sider med valgfri CSS-klasse |
| `startTimer(seconds)` | countdown eller optælling |
| `showMessage(text)` | vis besked på siden |
| `playSound(path)` | afspil en lydfil |
| `shuffle(list)` | bland et array |
| `randomFrom(list)` | vælg et tilfældigt element |
| `saveScore(name, points)` | gem score lokalt (fx i et array) |

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
