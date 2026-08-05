# 11. Favoritspil (2. år)

Genstart: byg en præsentation med flere sider, menu fra DOM og AV-effekter.

## Koncept: menu fra et DOM-array

```js
let allPages = selectAll('.page')

allPages.map(p => {
  let m = createDiv(p.attribute('title'))
  m.mousePressed(() => shiftPage('#' + p.attribute('id')))
  select('footer').child(m)
})
```

HTML-siderne **bliver** menuen. Tilføj en side → menuen følger med.

## Opgave
Læs [OPGAVE.md](OPGAVE.md)

## Reference
- p5 `selectAll`: https://p5js.org/reference/p5/selectAll/
- p5 `createDiv`: https://p5js.org/reference/p5/createDiv/
- MDN DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

← [Forrige](../10_AARSPROVE/README.md) · [Pensum](../PENSUM.md)
