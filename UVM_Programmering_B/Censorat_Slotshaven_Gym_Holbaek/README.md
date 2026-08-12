# Censorat: Slotshaven Gymnasium, Holbaek

Arbejdsmappen bruges til censoropgaven i Programmering B ved Slotshaven Gymnasium i Holbaek.

## Formelle dokumenter

De formelle rammer findes i den overordnede mappe:

- `../Laereplan_Programmering_B_valgfag_2017.pdf`
- `../Vejledning_Programmering_B_valgfag_2025.pdf`
- `static/Eksamensprojekt Pro B 2026.pdf`

## Struktur

- `static/` - udleverede PDF'er, synopser og eventuelle faste bilag.
- `synopser/` - arbejdskopier, uddrag eller bearbejdede noter til synopser.
- `projekter/` - eksamensprojekter, kode, links eller eksportfiler.
- `vurderingsnoter/` - egne noter, vurderinger og sporgsmal til den mundtlige eksamen.
- `materiale/` - lokale skabeloner, oversigter, rubrics eller praktiske dokumenter.

## Arbejdsprincip

Brug læreplanens faglige mål og vejledningens eksamensafsnit som primært grundlag. Noter gerne både faglige styrker, mulige mangler og konkrete spørgsmål til samtalen, så vurderingen kan kobles tydeligt til projektets produkt, proces og programmeringsfaglige indhold.

Eleverne eksamineres individuelt. Ved gruppeprojekter kan produkt, repository og dele af synopsis være fælles, men observationer, spørgsmål og votering noteres separat for hver elev med fokus på elevens egen forståelse, bidrag og mundtlige præstation.

## Oversigt

| Gruppe | Elev | Projekt | Synopsis | Repository |
| --- | --- | --- | --- | --- |
| 1 | Gustas | LunarOrbit | [`gr 1 - Gustas - LunarOrbit.pdf`](static/gr%201%20-%20Gustas%20-%20LunarOrbit.pdf) | <https://github.com/Gu5ta5/Eksamensprojekt_LunarOrbit> |
| 2 | Sadig | Adressebog | [`gr 2 - Sadig Rahimli - Telefonbog.pdf`](static/gr%202%20-%20Sadig%20Rahimli%20-%20Telefonbog.pdf) | <https://github.com/sadiq358/Eksamensprojekt> |
| 3 | Marie | SpaceMath | [`gr 3 - Marie - SpaceMath.pdf`](static/gr%203%20-%20Marie%20-%20SpaceMath.pdf) | <https://github.com/neg9414/Eksame-projekt--SpaceMath> |
| 3 | Jessica | SpaceMath | [`gr 3 - Jessica - SpaceMath.pdf`](static/gr%203%20-%20Jessica%20-%20SpaceMath.pdf) | <https://github.com/neg9414/Eksame-projekt--SpaceMath> |
| 4 | Stefan | InitiativeTracker | [`gr 4 - Stefan - Initiativetracker.pdf`](static/gr%204%20-%20Stefan%20-%20Initiativetracker.pdf) | <https://github.com/DysL3xx/GitForEksamenOpgave> |
| 4 | Jeppe | InitiativeTracker | [`gr 4 - Jeppe Skovgaard - D&D Initiative Tracker.pdf`](static/gr%204%20-%20Jeppe%20Skovgaard%20-%20D%26D%20Initiative%20Tracker.pdf) | <https://github.com/DysL3xx/GitForEksamenOpgave> |
| 5 | Nuftalem | Webshop | [`gr 5 - Nuftalem - Indtjeningssystem.pdf`](static/gr%205%20-%20Nuftalem%20-%20Indtjeningssystem.pdf) | <https://github.com/Ollie0618/Programmering-eksamen> |
| 5 | Oliver | Webshop | [`gr 5  - Oliver - Webapplikation.pdf`](static/gr%205%20%20-%20Oliver%20-%20Webapplikation.pdf) | <https://github.com/Ollie0618/Programmering-eksamen> |
| 6 | Emil | ScoreBreakers | [`gr 6 - Emil - Score breakers.pdf`](static/gr%206%20-%20Emil%20-%20Score%20breakers.pdf) | <https://github.com/B6rnard/Score_breakers> |
| 6 | Cornelius | ScoreBreakers | [`gr 6 - Cornelius - Score Breakers.pdf`](static/gr%206%20-%20Cornelius%20-%20Score%20Breakers.pdf) | <https://github.com/B6rnard/Score_breakers> |

## Foreløbig karakterindikation

Karakterindikationen er kun en censorforberedelse ud fra synopsis, repository og dokumenteret proces. Den endelige karakter skal gives som helhedsvurdering af den individuelle mundtlige præstation, eksamensprojektet og den ukendte opgave.

### Gustas - LunarOrbit: 10

Fagligt stærkt og ambitiøst projekt med API, beregninger, GUI, caching/threading og tydelig arkitektur. Produktet ligger over almindeligt B-niveau i kompleksitet, men AI-loggen er meget omfattende og koden har tydeligt assistentpræg. Indikationen forudsætter, at Gustas mundtligt kan forklare NOAA-beregning, datastrøm, threading og egne valg; ellers bør den ned mod 7 eller lavere.

### Sadig - Adressebog: 4

Produktet opfylder et basalt CRUD-formål med Tkinter, SQLite og simpel OOP, men niveauet er forholdsvis enkelt for Programmering B. Der er kun én commit, og promptloggen viser, at ChatGPT har været central fra idé til konkrete database- og GUI-funktioner. Kan løftes mod 7 ved sikker mundtlig forklaring af SQL, objekt/DB-kobling og fejlfinding, men ud fra materialet alene er selvstændighed og faglig dybde begrænset.

### Marie - SpaceMath: 7

Marie har den stærkeste individuelle dokumentation i gruppen: tydeligt ansvar for præsentationslag, state-flow, Pygame, typing/preview-logik og terminaltest af logik. Produktet er ikke fuldt realiseret i forhold til den oprindelige multiplayer-idé, og Copilot-brug er væsentlig. Foreløbig 7, med mulighed for 10 hvis hun mundtligt viser sikker arkitekturforståelse og kan ændre/forklare centrale dele uden støtte.

### Jessica - SpaceMath: 4

Der er relevant faglig kobling til SQLite, datalag og dataflow, men det individuelle bidrag står svagere dokumenteret end Maries. Manglende tydelige commits og mere generel synopsis gør selvstændigheden usikker, særligt når gruppen selv peger på skæv arbejdsdeling. Foreløbig 4; kan kun fastholdes eller løftes, hvis Jessica sikkert kan redegøre for databaseklassen, JOIN/statistik og samspil med logik/præsentation.

### Stefan - InitiativeTracker: 7

Stefan har et klart individuelt GUI-fokus og en mere konkret procesbeskrivelse end Jeppe. Projektet viser trelagsmodel, tkinter, billedhåndtering, farvekodning og brugbar applikationsstruktur. AI-loggen viser dog, at store dele af tkinter-opstart, refaktorering og tests er AI-assisteret, og GUI-filen blander lag. Foreløbig 7; højere kræver meget sikker mundtlig forklaring af designvalg og lagdeling.

### Jeppe - InitiativeTracker: 4

Jeppe har et afgrænset DB-bidrag med SQLite, parameteriserede queries, CRUD-lignende funktioner og test. Det er fagligt relevant, men enklere end Stefans del, og synopsen har stort overlap med gruppens fælles tekst. AI-genererede tests og mindre individuel procesdybde trækker ned. Foreløbig 4; kan løftes mod 7 ved sikker forklaring af databasefunktioner, testdesign og koblingen til `InitiativeTracker`.

### Nuftalem - Webshop: 4

Der er en fungerende Flask/SQLite-webshop med relevante CRUD-lignende funktioner, søgning og databehandling, men Update mangler, og projektets git-historik er meget tynd. Det individuelle bidrag er angivet som CRUD/databehandling, men AI-afsnit og tekststruktur overlapper stærkt med Oliver. Foreløbig 4; 7 kræver stærk mundtlig dokumentation af egen kode, SQL-valg og afgrænsning fra Olivers arbejde.

### Oliver - Webshop: 7

Oliver står stærkere end Nuftalem ud fra materiale og produkt: sammenligningsside, designiterationer, Chart.js, upload og mere komplet brugeroplevelse. Der er dog kun få commits, tydeligt AI-præg i forklaringer/testsetup og fælles prompttabel. Foreløbig 7, men afhænger af om han kan forklare Flask-routes, datamodeller, beregninger og frontend-backend-samspil uden blot at gengive synopsis.

### Emil - ScoreBreakers: 4

Emil har relevant logik-/datalagsfokus med JSON-scoredata, profilvalidering og noget arkitekturforståelse. Samtidig viser chatloggen, at væsentlige dele af spil, Flask-server og profilfunktionalitet er Copilot-genereret, og projektet mangler dokumenterede tests, tredje spil og har konkrete kodeproblemer. Foreløbig 4; kan nærme sig 7 ved sikker mundtlig forklaring af `ScoresDB`, persistens, threading og egne ændringer.

### Cornelius - ScoreBreakers: 4

Cornelius' GUI-/spilfokus er relevant, og produktet har fungerende menu, spil, scoreboard og Flask-visning. Men synopsis overlapper meget med Emil, egne GUI-kodeeksempler står svagere, og chatloggen peger på omfattende Copilot-generering. Manglende tests, placeholder for tredje spil og blanding af GUI/data trækker ned. Foreløbig 4; 7 kræver klar individuel redegørelse for game loop, kollisionslogik, Flask og egen rolle.

## Censornoter

### Gruppe 1: Gustas - LunarOrbit

- Synopsis: [`gr 1 - Gustas - LunarOrbit.pdf`](static/gr%201%20-%20Gustas%20-%20LunarOrbit.pdf)
- Repository: <https://github.com/Gu5ta5/Eksamensprojekt_LunarOrbit>

**Faglige observationer:**

- Tydelig teori-praksis-kobling med trelagsmodel, API-data, NOAA-beregning, threading og caching i en fungerende måne/vejr-app.

**Individuel præstation og bidrag:**

- Åben AI-redegørelse og lang prompt-historik tyder på omfattende assistentbrug; der er også spor af iterativ fejlretning. Afprøv forståelse af NOAA-kode, threading og eget bidrag.

**Sporgsmal til eksamen:**

- Forklar datastrømmen fra API/beregning til UI, og hvor threading/caching bruges.

**Votering:**

- 

### Gruppe 2: Sadig - Adressebog

- Synopsis: [`gr 2 - Sadig Rahimli - Telefonbog.pdf`](static/gr%202%20-%20Sadig%20Rahimli%20-%20Telefonbog.pdf)
- Repository: <https://github.com/sadiq358/Eksamensprojekt>

**Faglige observationer:**

- God kobling mellem GUI, SQLite, CRUD, OOP, inputvalidering og et konkret adressebogsprodukt; flowchart og test understøtter processen.

**Individuel præstation og bidrag:**

- Arbejder alene og dokumenterer ChatGPT-brug. Kommentarstil og instruktionsfil tyder på AI-støtte, men ikke i sig selv manglende forståelse; test egen forklaring af DB/GUI-koblingen.

**Sporgsmal til eksamen:**

- Forklar hvorfor søgning sker i GUI-koden, når der også findes en DB-søgefunktion.

**Votering:**

- 

### Gruppe 3: Marie - SpaceMath

- Synopsis: [`gr 3 - Marie - SpaceMath.pdf`](static/gr%203%20-%20Marie%20-%20SpaceMath.pdf)
- Repository: <https://github.com/neg9414/Eksame-projekt--SpaceMath>

**Faglige observationer:**

- Stærk kobling til præsentationslag, state-system, game loop og terminaltest af logik uden Pygame; milepæle nået delvist.

**Individuel præstation og bidrag:**

- Erkendt Copilot-brug og ubalanceret gruppearbejde, men detaljeret proces, rutediagram og commits peger på reelt eget arbejde. Afprøv state-flow og typing/preview-logik.

**Sporgsmal til eksamen:**

- Forklar state-skift i spillet og hvordan `GameSession` kan testes uden Pygame.

**Votering:**

- 

### Gruppe 3: Jessica - SpaceMath

- Synopsis: [`gr 3 - Jessica - SpaceMath.pdf`](static/gr%203%20-%20Jessica%20-%20SpaceMath.pdf)
- Repository: <https://github.com/neg9414/Eksame-projekt--SpaceMath>

**Faglige observationer:**

- God teori-praksis-kobling omkring datalag, SQLite, dataflow, `INSERT`/`SELECT`/`JOIN` og læreroversigt.

**Individuel præstation og bidrag:**

- AI-brug angives, især til SQL/fejlfinding; synopsis er mere generel og uden tydelige egne commits. Afprøv databaseforståelse og konkret bidrag.

**Sporgsmal til eksamen:**

- Forklar databaseskemaet, `save_game`, `get_all_students` og hvordan data flyder til læreroversigten.

**Votering:**

- 

### Gruppe 4: Stefan - InitiativeTracker

- Synopsis: [`gr 4 - Stefan - Initiativetracker.pdf`](static/gr%204%20-%20Stefan%20-%20Initiativetracker.pdf)
- Repository: <https://github.com/DysL3xx/GitForEksamenOpgave>

**Faglige observationer:**

- Trelagsmodellen er konkret i GUI, DB, dataklasse og main; D&D-initiativ kobles tydeligt til persistent SQLite og tkinter.

**Individuel præstation og bidrag:**

- Personlig og detaljeret GUI-proces, men fælles AI-afsnit og AI-log viser omfattende hjælp til tkinter/refaktorering. Afprøv GUI-designvalg og lagdeling.

**Sporgsmal til eksamen:**

- Forklar hvordan GUI'en kalder logik/DB, og hvor præsentationslaget blander sig med logik.

**Votering:**

- 

### Gruppe 4: Jeppe - InitiativeTracker

- Synopsis: [`gr 4 - Jeppe Skovgaard - D&D Initiative Tracker.pdf`](static/gr%204%20-%20Jeppe%20Skovgaard%20-%20D%26D%20Initiative%20Tracker.pdf)
- Repository: <https://github.com/DysL3xx/GitForEksamenOpgave>

**Faglige observationer:**

- Beskriver trelagsmodel og DB-ansvar; kodeeksempler matcher SQLite/CRUD og test af databasefunktioner.

**Individuel præstation og bidrag:**

- Store tekstblokke overlapper med Stefan, men dele har mere personligt råt sprog. AI-genererede tests er erkendt; afprøv DB- og logikforståelse individuelt.

**Sporgsmal til eksamen:**

- Forklar DB-funktionerne, parameteriserede queries og hvordan `InitiativeTracker` synkroniserer med databasen.

**Votering:**

- 

### Gruppe 5: Nuftalem - Webshop

- Synopsis: [`gr 5 - Nuftalem - Indtjeningssystem.pdf`](static/gr%205%20-%20Nuftalem%20-%20Indtjeningssystem.pdf)
- Repository: <https://github.com/Ollie0618/Programmering-eksamen>

**Faglige observationer:**

- Tydelig kobling mellem trelagsmodel, Flask, SQLite, CRUD/databehandling og konkrete databasefunktioner; Update mangler og nævnes som videreudvikling.

**Individuel præstation og bidrag:**

- Eget bidrag fremstår som CRUD/databehandling, men AI-afsnit og prompttabel overlapper med Oliver. Afprøv afgrænsning af eget arbejde og forståelse af sammenligningskode.

**Sporgsmal til eksamen:**

- Forklar `insert_product`, `delete_product_db`, søgning/filtrering og hvorfor der ikke er Update.

**Votering:**

- 

### Gruppe 5: Oliver - Webshop

- Synopsis: [`gr 5  - Oliver - Webapplikation.pdf`](static/gr%205%20%20-%20Oliver%20-%20Webapplikation.pdf)
- Repository: <https://github.com/Ollie0618/Programmering-eksamen>

**Faglige observationer:**

- God kobling mellem trelagsmodel, designiterationer, database, sammenligningsside, CSV/Excel-upload, CSS og Chart.js.

**Individuel præstation og bidrag:**

- Stærk frontend/designprofil; linje-for-linje forklaringer og identisk AI-tabel tyder på værktøjsstøtte. Afprøv hvad han selv har skrevet og forstået i Flask/SQL.

**Sporgsmal til eksamen:**

- Forklar `sammenligning()` og hvordan data struktureres til visning og diagrammer.

**Votering:**

- 

### Gruppe 6: Emil - ScoreBreakers

- Synopsis: [`gr 6 - Emil - Score breakers.pdf`](static/gr%206%20-%20Emil%20-%20Score%20breakers.pdf)
- Repository: <https://github.com/B6rnard/Score_breakers>

**Faglige observationer:**

- Trelagsmodel kobles til Data/GUI/Games/Flask, JSON-persistens, profiler og LAN-deling; krav delvist opfyldt med to spil og ingen synlige unit tests.

**Individuel præstation og bidrag:**

- AI-brug er åbent dokumenteret; logik- og scoreeksempler matcher hans rolle, men fælles tekst og Copilot-log tyder på stor assistentandel. Afprøv egen kodeforståelse.

**Sporgsmal til eksamen:**

- Forklar `ScoresDB`, JSON load/save, threading til LAN og fejlen/risikoen i game-over-logikken.

**Votering:**

- 

### Gruppe 6: Cornelius - ScoreBreakers

- Synopsis: [`gr 6 - Cornelius - Score Breakers.pdf`](static/gr%206%20-%20Cornelius%20-%20Score%20Breakers.pdf)
- Repository: <https://github.com/B6rnard/Score_breakers>

**Faglige observationer:**

- Beskriver trelagsmodel, GUI, spilflow, Flask-LAN og profiler; GUI og spil virker funktionelle, men test og tredje spil mangler.

**Individuel præstation og bidrag:**

- Copilot-log peger på stor AI-hjælp til Flask/profil/GUIfunktioner; synopsis overlapper med Emil og egne GUI-eksempler er svagere. Afprøv konkret GUI- og Flask-forståelse.

**Sporgsmal til eksamen:**

- Forklar game loop, kollisionsdetektion, Flask-visning og hvordan GUI'en håndterer profil/scoredata.

**Votering:**

- 
