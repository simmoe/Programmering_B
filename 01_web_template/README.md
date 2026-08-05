# 1. Web template

Vi laver flere **sider** i samme HTML-fil. Kun én side vises ad gangen.

## Koncept: CSS-klasse som “tænd/sluk”

```js
select('#page1').addClass('show')
select('#page2').removeClass('show')
```

`.show` betyder: “denne side er synlig”.

## Kode
Åbn [index.html](index.html)

## Reference
- p5 `select`: https://p5js.org/reference/p5/select/
- p5 `addClass`: https://p5js.org/reference/p5.Element/addClass/
- MDN CSS classes: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

← [Pensum](../PENSUM.md) · → [Næste: Interaktion](../02_web_interaction/README.md)
