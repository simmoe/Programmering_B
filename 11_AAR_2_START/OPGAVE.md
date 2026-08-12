# Én lækker feature fra dit favoritspil

**Programmering B — 2. år**  
**Udgangspunkt:** denne mappe (`11_AAR_2_START`)  
**Setup:** [Læringsrum](../11_0_LAERINGSRUM/README.md) (VS Code til kode · Cursor til spørgsmål)

---

## Opgaven

Vælg dit **favoritspil** — men fokusér på **én enkelt lækker feature**.

Din opgave er ikke at fortælle hele spillets historie.  
Din opgave er at **vise eller bruge** den feature på siden — så godt du kan.

Eksempler på features:
- dodge / dash / parry
- inventory / crafting
- fog of war / minimap
- dialog-valg
- combo-meter
- stealth / synsfelt
- build-a-deck / draft
- noget helt andet, du synes er fedt

Byg videre på skabelonen med flere sider og `shiftPage()`.

---

## Krav til produktet

### Feature først
- Vælg **én** feature og giv den et klart navn på siden
- Mindst **én side**, hvor brugeren **prøver / oplever** feature’en (klik, hover, tast, timer, lyd, animation …)
- Det behøver ikke være en 1:1-kopi af spillet — det skal være en **synlig demo** af idéen

### Sider
- Mindst **4 sider** (`.page`)
- Hver side har sit eget `id` og `title`
- Hver side har egen baggrund (billede, farve eller gradient)
- Forslag til sider:
  - hvilket spil + hvilken feature
  - hvordan feature’en føles i spillet (kort)
  - **din demo** (her skal man kunne bruge/se den)
  - hvad var svært / hvad ville du bygge videre

### Navigation
- En menu (fx i en `footer`), der bygges fra DOM’en med `selectAll('.page')`
- Menuen skal bruge sidernes `title`
- Klik på et menupunkt skal skifte side med `shiftPage()`
- `shiftPage()` skal bruge `addClass('show')` / `removeClass('show')`

### Audiovisuelle effekter
- Mindst én **visuel effekt** knyttet til feature-demoen  
  (fx hover, transition, hide/show, animation, partikler-light)
- Mindst én **lyd- eller AV-effekt** et sted  
  (fx klik-lyd, hit-sound, kort speech/video)

### Assets
- Læg billeder, lyd osv. i `assets/`
- Du må gerne hente materialer fra nettet — husk at kunne sige, hvor de kommer fra

---

## Tips

- Start med at kunne **gøre én ting** i demoen — så pynt
- Hellere en lille feature der virker, end en stor der kun er tekst
- Genbrug gerne teknikker fra 1. år (`04_webcam_mic_speech`, parallax, spil-projekter osv.)
- MQTT/toast fra timen er nice-to-have, ikke krav

---

## Du skal kunne forklare

- Hvilken feature du valgte, og hvordan din demo viser den
- Hvordan siderne er gemt i DOM’en
- Hvordan menuen bygges fra et array med `selectAll('.page')`
- Hvad `addClass` og `removeClass` gør i `shiftPage()`
- Hvordan klik / lyd / visuelle effekter er koblet til din feature

---

## Aflevering

- Færdigt projekt i mappen
- Kort fremvisning: **vis feature-demoen** og forklar én teknisk ting, du er stolt af
