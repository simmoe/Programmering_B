# 9. Firebase

Gem og hent data i Firestore — en database i skyen.

**Demo:** [https://simmoe.github.io/Programmering_B/09_firebase/](https://simmoe.github.io/Programmering_B/09_firebase/)  
**Kode:** [index.html](index.html) · [firebase.js](firebase.js) · [index.js](index.js)

Før `add()` og `onSnapshot()` virker, skal to ting være på plads: **bibliotekerne** i HTML og en **konfiguration** i `firebase.js`.

---

## 1. Indsæt Firebase-biblioteker i `index.html`

I `<head>` indlæser vi Firebase, **før** vores egen kode:

```html
<script src="https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore-compat.js"></script>
<script src="./firebase.js"></script>
```

- Første script: selve Firebase-appen  
- Andet script: Firestore (databasen)  
- Tredje script: vores egen konfiguration  

Uden de tre linjer findes `firebase` og `db` ikke i projektet.

**Reference:** [Firebase Web setup](https://firebase.google.com/docs/web/setup)

---

## 2. Konfiguration i `firebase.js`

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  // ... flere felter fra Firebase Console
}

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()
```

`firebaseConfig` er nøglerne til *dit* Firebase-projekt.  
Dem henter du i [Firebase Console](https://console.firebase.google.com/) under Project settings → Your apps.

`initializeApp()` starter forbindelsen.  
`firebase.firestore()` giver os `db`, som vi bruger i resten af kapitlet.

**Reference:** [Firestore get started](https://firebase.google.com/docs/firestore/quickstart)

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
