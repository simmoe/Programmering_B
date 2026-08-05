# 10. Årsprøve

Her samler vi teknikkerne i ét større projekt: sider, state, timer, database.

## Koncept: `shiftPage`

```js
function shiftPage(newPage) {
  select(currentPage).removeClass('show')
  select(newPage).addClass('show')
  currentPage = newPage
}
```

Samme side-skift som i starten — nu inde i et rigtigt spil.

## Mere
- [Fuld opgavebeskrivelse](OPGAVEBESKRIVELSE.md)
- [Template](template/index.html)

## Reference
- p5 `removeClass`: https://p5js.org/reference/p5.Element/removeClass/
- MDN `setInterval`: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval

← [Forrige](../09_firebase/README.md) · [Pensum](../PENSUM.md) · → [Næste: Favoritspil](../11_AAR_2_START/README.md)
