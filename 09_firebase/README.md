# 9. Firebase

Firestore er en database i skyen. Vi kan **gemme** og **lytte** til data.

## Koncept: `add()` + `onSnapshot()`

```js
quotesRef.add({ text: 'Hej verden' })

quotesRef.onSnapshot(snap => {
  snap.forEach(doc => console.log(doc.data()))
})
```

`add` skriver. `onSnapshot` opdaterer automatisk, når noget ændrer sig.

## Kode
Åbn [index.html](index.html)

## Reference
- Firebase Firestore: https://firebase.google.com/docs/firestore
- MDN Objects (data vi gemmer): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects

← [Forrige](../08_blackjack_fetch_api/README.md) · [Pensum](../PENSUM.md) · → [Næste: Årsprøve](../10_AARSPROVE/README.md)
