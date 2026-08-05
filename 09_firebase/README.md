# 9. Firebase

Her gemmer vi data i skyen og opdaterer siden automatisk.  
Læs hvert koncept ultrakort → prøv demoen → ændr → byg din egen lille database-app.

**Demo:** [https://simmoe.github.io/Programmering_B/09_firebase/](https://simmoe.github.io/Programmering_B/09_firebase/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Use → Modify → Create

1. **Use:** Skriv et quote. Se det dukke op. Slet et quote.
2. **Modify:** Skift collection-navn, layout eller felter i objektet.
3. **Create:** Lav din egen high score / gæstebog / todo med Firestore.

---

## 1. Collection-reference

```js
var quotesRef = db.collection('quotes_data')
```

En collection er en “mappe” af documents i Firestore.

**Reference:** [Firestore collections](https://firebase.google.com/docs/firestore/data-model)

---

## 2. Lyt live med `onSnapshot`

```js
quotesRef.onSnapshot(snap => {
  snap.forEach(doc => {
    console.log(doc.data())
  })
})
```

Når data ændrer sig i databasen, kører koden igen. Siden holder sig opdateret.

**Reference:** [Firestore get realtime updates](https://firebase.google.com/docs/firestore/query-data/listen)

---

## 3. Gem med `add()`

```js
quotesRef.add({
  text: q,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
```

Vi sender et objekt. Firestore laver et nyt document.

**Reference:** [Firestore add data](https://firebase.google.com/docs/firestore/manage-data/add-data) · [MDN Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

---

## 4. Opdater med `update()`

```js
quotesRef.doc(edit_id).update({ text: edit_div.html() })
```

Vi retter et eksisterende document i stedet for at lave et nyt.

**Reference:** [Firestore update](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data)

---

## 5. Slet med `delete()`

```js
quotesRef.doc(doc.id).delete()
```

Documentet forsvinder fra databasen — og `onSnapshot` opdaterer UI’et.

**Reference:** [Firestore delete](https://firebase.google.com/docs/firestore/manage-data/delete-data)

---

## 6. Byg UI fra data

```js
select('#quotes').html('')
snap.forEach(doc => {
  select('#quotes').child(createDiv(doc.data().text))
})
```

Først tømmer vi listen. Så tegner vi den forfra ud fra databasen.

**Reference:** [p5 createDiv](https://p5js.org/reference/p5/createDiv/) · [p5 html](https://p5js.org/reference/p5.Element/html/)

---

## Små modify-udfordringer

- Tilføj et ekstra felt, fx `author` eller `mood`
- Vis kun de 5 nyeste quotes
- Lav en high score i stedet for quotes
- Stil kortene anderledes i CSS

← [Forrige: Fetch](../08_blackjack_fetch_api/README.md) · [Pensum](../PENSUM.md) · → [Næste: Årsprøve](../10_AARSPROVE/README.md)
