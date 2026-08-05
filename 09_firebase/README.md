# 9. Firebase

Gem og hent data i Firestore — en database i skyen.

**Demo:** [https://simmoe.github.io/Programmering_B/09_firebase/](https://simmoe.github.io/Programmering_B/09_firebase/)  
**Kode:** [index.html](index.html) · [index.js](index.js)

---

## Collection-reference

```js
var quotesRef = db.collection('quotes_data')
```

En collection er en samling af documents. `quotesRef` er vores genvej til den samling.

**Reference:** [Firestore data model](https://firebase.google.com/docs/firestore/data-model)

---

## Lyt live med `onSnapshot`

```js
quotesRef.onSnapshot(snap => {
  snap.forEach(doc => {
    console.log(doc.data())
  })
})
```

Når noget ændrer sig i databasen, kører koden automatisk igen. Siden holder sig opdateret.

**Reference:** [Firestore realtime updates](https://firebase.google.com/docs/firestore/query-data/listen)

---

## Gem med `add()`

```js
quotesRef.add({
  text: q,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
```

Vi sender et objekt til Firestore. Det bliver gemt som et nyt document.

**Reference:** [Firestore add data](https://firebase.google.com/docs/firestore/manage-data/add-data) · [MDN Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

---

## Opdater med `update()`

```js
quotesRef.doc(edit_id).update({ text: edit_div.html() })
```

Vi retter et document, der allerede findes.

**Reference:** [Firestore update](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data)

---

## Slet med `delete()`

```js
quotesRef.doc(doc.id).delete()
```

Documentet fjernes fra databasen. `onSnapshot` sørger for, at det også forsvinder fra siden.

**Reference:** [Firestore delete](https://firebase.google.com/docs/firestore/manage-data/delete-data)

---

## Byg UI fra data

```js
select('#quotes').html('')
snap.forEach(doc => {
  select('#quotes').child(createDiv(doc.data().text))
})
```

Først tømmes listen. Så laves den forfra ud fra det, der ligger i databasen.

**Reference:** [p5 createDiv](https://p5js.org/reference/p5/createDiv/) · [p5 html](https://p5js.org/reference/p5.Element/html/)

← [Forrige: Fetch](../08_blackjack_fetch_api/README.md) · [Pensum](../PENSUM.md) · → [Næste: Årsprøve](../10_AARSPROVE/README.md)
