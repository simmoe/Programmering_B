# Afslut karaktervælgeren

To sider: `twoPlayerScreen/` (computer) og `controller/` (telefon). Controlleren sender JSON, fællesskærmen lytter:

```js
{ "name": "A", "action": "forward" }
```

`name` er spilleren, `action` er handlingen.

Fællesskærmen henter 20 karakterer fra API’et og gemmer dem i `characters`. `playerAIndex` og `playerBIndex` styrer, hvilken figur hver spiller viser. Frem virker.

`#back` og `#select` findes i HTML, men gør ingenting endnu. Begynd der.

To controllere skal kunne bladre frem og tilbage og til sidst vælge. Index skal ligge mellem `0` og `characters.length - 1`.

Når en spiller har valgt, kan den ikke bladre mere. Læg to globale på fællesskærmen, `playerALocked` og `playerBLocked`, og spring `"forward"` / `"back"` over hvis spilleren er låst.

```js
var i = eval(`player${msObject.name}Index++`)
```
