/*
 * MACHINE LEARNING: K-MEANS CLUSTERING (SVG VERSION)
 * 
 * Dette eksempel viser hvordan K-means algoritmen virker uden brug af p5.js canvas.
 * Vi bruger almindelig HTML og SVG til at tegne resultatet.
 */

// Globale variabler
let tbl;            // Data-objektet der holder CSV-filen
let geyserData = [];// Listen af datapunkter (hvert punkt er {duration, waiting, label})
let centroids = []; // Liste af centre (duration, waiting) for hver gruppe
let k = 2;          // Antallet af grupper vi vil finde
let iterations = 10; // Antal gange vi gentager processen (konvergens)
let padding = 40;    // Luft i kanten til akser
let dataRanges = {}; // Gemmer min/max værdier så vi kan tegne akser

// Liste med farver til de forskellige grupper
let colors = ['red', 'green', 'blue', 'purple', 'orange', 'teal'];

// INDSTILLINGER FOR DATA
const url = 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/faithful.csv';
let dataX = 'eruptions'; // Navnet på kolonnen til X-aksen
let dataY = 'waiting';   // Navnet på kolonnen til Y-aksen

function preload() {
    tbl = loadTable(url, 'csv', 'header');
}

function windowResized() {
    // Ændre canvas størrelse når vinduet ændres
    resizeCanvas(windowWidth - 40, 400); 
    runKmeans(); // Kør algoritmen igen for at opdatere positioner
}

function setup() {
    // 1. OPRET P5 CANVAS
    // Vi laver det ligeså stort som vinduet, men trækker lidt fra til margen
    let canvas = createCanvas(windowWidth - 40, 400); 
    canvas.parent('canvas-container');

    // 2. FORBEHANDLING AF DATA
    geyserData = tbl.rows.map(r => {
        return {
            duration: float(r.get(dataX)),
            waiting: float(r.get(dataY)),
            label: undefined // Vi forbereder en plads til gruppering (cluster id)
        };
    });

    // 3. GENERER HTML DATA TABEL
    generateDataTable();

    // 4. FORBIND KONTROLKNAPPER
    setupControls();

    // 5. KØR
    runKmeans();
}

function generateDataTable() {
    let tbody = select('#data-tbody');
    tbody.html(''); // Ryd evt. gammelt indhold

    geyserData.map((p, i) => {
        let tr = createElement('tr');
        tr.parent(tbody);
        createElement('td', String(i + 1)).parent(tr);
        createElement('td', String(p.duration)).parent(tr);
        createElement('td', String(p.waiting)).parent(tr);
    });
}

function setupControls() {
    let kSlider = select('#k-slider');
    kSlider.input(() => {
        k = int(kSlider.value());
        select('#k-value').html(k);
        runKmeans();
    });

    let iterSlider = select('#iter-slider');
    iterSlider.input(() => {
        iterations = int(iterSlider.value());
        select('#iter-value').html(iterations);
        runKmeans();
    });

    let btn = select('#run-btn');
    btn.mousePressed(() => {
        runKmeans();
    });
}

function runKmeans() {
    /*
        TRIN A: Normalisering og Data-analyse
        Før vi kan gruppere data, skal vi vide hvor dataene ligger.
        Vi finder minimum og maksimum for både duration og waiting.
        Dette bruges til at tegne punkterne det rigtige sted på skærmen,
        og sikrer at vi kender "banens" størrelse.
    */
    let durations = geyserData.map(p => p.duration);         
    let waitings = geyserData.map(p => p.waiting);         
    let minD = min(durations), maxD = max(durations); 
    let minW = min(waitings), maxW = max(waitings); 
    
    // Gem til global så vi kan tegne akser senere
    dataRanges = { minD, maxD, minW, maxW };

    /*
        TRIN B: Initialisering af Centroids (Centre)
        Hvad er en Centroid? Det er midtpunktet for en klynge (cluster).
        I starten ved vi ikke hvor klyngerne er. Derfor vælger vi 'k' tilfældige
        datapunkter.
        
        Vi bruger en while-løkke til at blive ved med at finde punkter, 
        indtil vi har fundet 'k' unikke punkter.
    */
    centroids = [];
    while (centroids.length < k) {
        let point = random(geyserData);
        if (!centroids.includes(point)) {
            centroids.push(point);
        }
    }

    /* 
       SORTERING AF CENTROIDS (Pædagogisk Fix)
       ---------------------------------------
       1. PROBLEMET (Farverne hopper):
       Når vi vælger tilfældige startpunkter, får de index 0, 1, 2... som bestemmer farven.
       Uden sortering kan "Rød" lande til højre den ene gang og til venstre den næste.
       
       2. LØSNINGEN (Vi sorterer fra venstre mod højre):
       Vi tvinger den centroid med lavest x-værdi til at blive index 0 (Rød).

       3. TEKNISK FORKLARING (Hvorfor minus?):
       JavaScript's .sort() funktion beder om et TAL for at afgøre rækkefølgen (ikke sandt/falsk).
       Reglen er:
         - Negativt tal: 'a' skal stå først.
         - Positivt tal: 'b' skal stå først.
       
       Eksempel: Hvis a.duration = 2 og b.duration = 5. 
       Regnestykket: 2 - 5 = -3. 
       Resultatet er negativt -> Computeren forstår, at 2 er mindst og sætter den forrest.
    */
    centroids.sort((a, b) => a.duration - b.duration);

    /*
        TRIN C: Trænings-løkken
        K-Means er en iterativ algoritme. Det betyder, den gentager sig selv
        for at blive bedre og bedre. Vi gentager processen 'iterations' gange.
        
        Hver runde i løkken består af to hoved-faser:
        1. ASSIGN: (Hvem hører til hvem?)
           Hvert datapunkt vælger det center, der er tættest på.
        
        2. UPDATE: (Flyt lederne mod midten)
           Hvert center flytter sig til gennemsnittet af sine punkter.
    */
    for (let i = 0; i < iterations; i++) {
        
        // FASE 1: ASSIGN - Find nærmeste center
        // Vi går alle datapunkter igennem. For hvert punkt måler vi afstanden
        // til alle centroids. Punktet får en 'label' (gruppe-id) direkte i objektet.
        geyserData.map(point => {
            // Variabler til at holde styr på den tætteste centroid vi har fundet indtil videre
            let nearestCentroidIndex = 0;           
            
            // Vi starter med en uendelig høj distance. 
            // Det sikrer, at den første rigtige afstand vi måler, altid vil være "kortere" end startværdien.
            let minDistance = Infinity; 

            // Vi sammenligner punktet med ALLE centroids for at finde den nærmeste
            centroids.map((centroid, index) => {
                
                // 1. Beregn afstand på x-aksen (duration) og y-aksen (waiting)
                let diffDuration = point.duration - centroid.duration;         
                let diffWaiting = point.waiting - centroid.waiting;         
                
                // 2. Pythagoras: a^2 + b^2 = c^2 (Afstand i anden potens)
                // Vi behøver ikke tage kvadratroden for at sammenligne hvem der er tættest på
                let currentDistance = (diffDuration * diffDuration) + (diffWaiting * diffWaiting);      
                
                // 3. Tjek om denne centroid er tættere på end den hidtil bedste
                if (currentDistance < minDistance) {
                    minDistance = currentDistance;
                    nearestCentroidIndex = index;
                }
            });
            
            // Gem ID'et på den vindende centroid direkte i datapunktet
            point.label = nearestCentroidIndex;
        });

        // FASE 2: UPDATE - Flyt centrene
        // Nu hvor alle punkter har valgt gruppe, skal centeret flytte sig.
        // Vi bruger map() på vores liste af centroids for at beregne deres nye positioner én for én.
        
        centroids = centroids.map((_, i) => {
            
            // 1. Brug filter() til at finde alle de punkter, der hører til netop denne gruppe (i)
            let assignedPoints = geyserData.filter(p => p.label === i);
            
            // Hvis ingen punkter valgte denne gruppe, må vi genstarte den et tilfældigt sted
            if (assignedPoints.length === 0) {
                return random(geyserData);
            }

            // 2. Læg alle KOORDINATER (duration/waiting) sammen for gruppen
            // Vi summerer ikke afstande, men selve positionerne.
            let sumDuration = 0;
            let sumWaiting = 0;
            
            assignedPoints.map(p => {
                sumDuration += p.duration;
                sumWaiting += p.waiting;
            });

            // 3. Beregn gennemsnittet af positionerne (kaldet Tyngdepunktet eller Center of Gravity)
            // Det nye center placeres præcis i midten af sværmen af punkter.
            return { 
                duration: sumDuration / assignedPoints.length, 
                waiting: sumWaiting / assignedPoints.length 
            };
        });
    }

    /*
        TRIN D: Visualisering (Skalering)
        For at kunne se resultatet på skærmen, omregner vi de virkelige tal (minutter)
        til pixels på skærmen ved hjælp af p5.map() funktionen.
    */
    geyserData = geyserData.map(p => {
        return {
            ...p,
            px: map(p.duration, minD, maxD, padding, width - padding),
            py: map(p.waiting, minW, maxW, height - padding, padding)
        };
    });
    
    centroids = centroids.map(c => {
        return {
            ...c,
            px: map(c.duration, minD, maxD, padding, width - padding),
            py: map(c.waiting, minW, maxW, height - padding, padding)
        };
    });

    // E. TEGN RESULTATET PÅ CANVAS
    drawToCanvas();
}

function drawToCanvas() {
    // 1. Vælg containeren
    let container = select('#canvas-container');
    let infoBox = select('#info-box');

    // Ryd kun gamle HTML elementer (vi må ikke slette selve canvas!)
    selectAll('.dot, .centroid').forEach(el => el.remove());

    // 2. Tegn akser på canvas (baggrund)
    background(255); 
    drawAxes(); 

    // ---------------------------------------------------------
    // TRIN F: GENERER ANALYSE OG STATISTIK
    // Vi bygger en HTML-streng der opsummerer hvad modellen har fundet
    let statsHTML = `<strong>📊 Model Analyse (${k} grupper)</strong><br><br>`;
    
    centroids.map((c, i) => {
        // Find alle punkter i denne gruppe
        let pointsInGroup = geyserData.filter(p => p.label === i);
        let count = pointsInGroup.length;
        let percentage = ((count / geyserData.length) * 100).toFixed(1);
        
        // Farv teksten så den matcher gruppen
        let colorLine = `<span style="color:${colors[i]}; font-weight:bold;">⬤ Gruppe ${i+1}: </span>`;
        
        // Beskriv gruppens "personlighed" (Centroidens værdier)
        statsHTML += `
            ${colorLine} ${count} gejsere (${percentage}%)<br>
            <em style="font-size:0.9em; margin-left:15px;">
                Gns. Udbrud: ${c.duration.toFixed(1)} min<br>
                Gns. Ventetid: ${c.waiting.toFixed(0)} min
            </em><br><br>
        `;
    });

    // Vis statistikken som default i info-boksen
    infoBox.html(statsHTML);

    // ---------------------------------------------------------

    // 2. Opret div for hvert datapunkt
    geyserData.map(p => {
        createDiv('') 
            .parent(container)
            .class('dot')
            .style('background-color', colors[p.label])
            .position(p.px, p.py)
            .mouseOver(() => {
                // Når man peger: Vis detaljer for punktet
                infoBox.html(`
                    <strong>📍 Datapunkt Info</strong><br>
                    Gruppe: ${p.label + 1}<br>
                    Varighed: ${p.duration} min<br>
                    Ventetid: ${p.waiting} min
                `);
            })
            .mouseOut(() => {
                // Når musen forlader: Vis den generelle statistik igen
                infoBox.html(statsHTML);
            });
    });

    // 3. Opret div for centroids
    centroids.map((c, i) => {
        createDiv('')
            .parent(container)
            .class('centroid')
            .position(c.px, c.py)
            .mouseOver(() => {
                infoBox.html(`
                    <strong>⭐ Gruppe ${i + 1} Center</strong><br>
                    Dette er gennemsnittet (arketypen)<br>
                    for hele denne gruppe.
                `);
            })
            .mouseOut(() => {
                infoBox.html(statsHTML);
            });
    });
}

function drawAxes() {
    let { minD, maxD, minW, maxW } = dataRanges;
    
    stroke(0);
    fill(0);
    textSize(10);
    
    // X-akse (Varighed)
    line(padding, height - padding, width - padding, height - padding);
    textAlign(CENTER);
    text(dataX, width / 2, height - 5);
    
    // Y-akse (Ventetid)
    line(padding, height - padding, padding, padding);
    push();
    translate(15, height / 2);
    rotate(-HALF_PI);
    textAlign(CENTER);
    text(dataY, 0, 0);
    pop();

    // Tegn 5 "ticks" på hver akse
    for(let i = 0; i <= 5; i++) {
        // X-akse ticks
        let xVal = lerp(minD, maxD, i/5);
        let xPos = map(xVal, minD, maxD, padding, width - padding);
        line(xPos, height - padding, xPos, height - padding + 5);
        text(xVal.toFixed(1), xPos, height - padding + 20);
        
        // Y-akse ticks
        let yVal = lerp(minW, maxW, i/5);
        let yPos = map(yVal, minW, maxW, height - padding, padding);
        line(padding, yPos, padding - 5, yPos);
        textAlign(RIGHT, CENTER);
        text(yVal.toFixed(0), padding - 8, yPos);
        textAlign(CENTER); // Nulstil til næste loop
    }
}
