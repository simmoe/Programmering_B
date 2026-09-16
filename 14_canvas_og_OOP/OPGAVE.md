# Konkurrence: Udfordr Jumping Cabbage

**Afleveres fredag 18. september.**  
3 timer fordybelse + onsdagens timer. Der kåres en vinder, når I er tilbage fra studietur.

Lav et **objektorienteret spil**, der udfordrer [Jumping Cabbage](https://simmoe.github.io/Programmering_B/14_canvas_og_OOP/).

---

## Hent koden

- Spil-mappen (bold-skitsen): [14_canvas_og_OOP](https://github.com/simmoe/Programmering_B/tree/main/14_canvas_og_OOP)
- Klasserne: [api_lib/myClasses.js](https://github.com/simmoe/Programmering_B/blob/main/api_lib/myClasses.js)
- API: [api_lib/myApi.js](https://github.com/simmoe/Programmering_B/blob/main/api_lib/myApi.js)

Kopiér **begge** mapper (`14_canvas_og_OOP` og `api_lib`). Klasserne og `shiftPage` / `startTimer` ligger i `api_lib` — uden den virker skitsen ikke.

---

## Fagligt krav: klasser med argumenter

En klasse er skabelonen. Det der kan skifte fra bold til bold, skal ind som **argumenter** i `constructor` — ikke skrives fast inde i klassen.

```js
class Ball {
  constructor(x, y, r, img, jump){
    this.position = createVector(x, y)
    this.diam = r
    this.img = img
    this.jumpForce = jump
  }
}

b = new Ball(windowWidth/2, 0, 160, blomkaal, 12)
f = new FloatingBall(100, 100, 110, roedkaal, 0, 12)
```

Samme klasse, forskellige argumenter → forskellige instanser.

`FloatingBall extends Ball` overskriver `update()` og `constrain()`. Det er polymorfi: `draw()` kalder de samme metodenavne, objekterne gør noget forskelligt.

---

## Minimum i jeres spil

- Mindst **to klasser**. Den ene skal arve fra den anden (`extends` + `super(...)`).
- Constructor med **parametre** for det der varierer (position, størrelse, billede, fart, hop, …).
- I laver flere objekter med `new` og **forskellige argumenter**. I kopierer ikke klassen for hver figur.
- Metoderne `update()` og `show()` på begge klasser. Plus mindst **én metode I selv skriver**.
- Spillets regler (point, tid, vundet/tabt) ligger i `index.js`. Klasserne er tingene i spillet.
- Mindst to funktioner fra `myApi.js` (`shiftPage`, `startTimer` eller `showToast`). I må udvide `myApi.js` med nye funktioner, hvis I mangler noget.

En ny grøntsag på samme hoppe-mekanik tæller ikke som udfordring. Tema og spilleregler skal kunne skelnes fra Cabbage.

---

## Aflevering

GitHub-repo + link til GitHub Pages (eller til mappen der kører). Fredag 18. september.
