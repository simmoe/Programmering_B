# 15. Arkitektur

Når et program vokser, er det ikke nok at “det virker”.  
Vi deler koden i **lag**, så UI, logik og data ikke bliver ét stort rod.

Tænk: **det brugeren ser** · **reglerne / beregningerne** · **hvor data bor** (array, localStorage, Firebase, API).

---

## Hvad træner vi her?

- Tydelige lag (UI / logik / data)
- State og dataflow: hvad ændrer hvad?
- Funktioner med én opgave
- At kunne pege på “hvor hører den her kode hjemme?”

---

## Elevopgave (idé)

Byg en **lille app med synlige lag** — ikke nødvendigvis stor, men struktureret.

Vælg selv type, fx:

- **Tracker** — vaner, træning, huskeliste
- **Quiz 2.0** — spørgsmål, score, highscore adskilt fra skærmene
- **Shop-light** — varer, kurv, total
- **Escape room 2.0** — rum/gåder adskilt fra “er døren åben?”-logik

**Minimum:** mindst tre lag (eller tre tydelige filer/moduler), state der kan forklares, og at du kan ændre UI uden at ødelægge logikken (eller omvendt).

---

← [Forrige: Rekursion](../14_REKURSION/README.md) · [Pensum](../PENSUM.md) · → [Næste: Udvid et system](../16_UDVID_SYSTEM/README.md)
