/*
 * SUPERVISED LEARNING: K-NEAREST NEIGHBORS (KNN)
 * 
 * Dette eksempel viser hvordan K-Nearest Neighbor algoritmen virker.
 * Vi har et datasæt med kendte pingviner (Træningsdata).
 * Vi skal kunne klassificere en NY ukendt pingvin baseret på de nærmeste naboer.
 */

// GLOBALE VARIABLER
let tbl;            // Data-objektet
let penguins = [];  // Listen af rensede pingvin-data
let k = 3;          // Hvor mange naboer kigger vi på?
let padding = 40;   // Luft rundt om grafen
let userGuess = null; // Objekt til at gemme info om det seneste gæt (til tegning)

// Globale variabler til aksernes min/max værdier (bliver beregnet ud fra data)
let minX, maxX, minY, maxY;

// Farver til de forskellige arter (Adelie, Gentoo, Chinstrap)
let speciesColors = {
    'Adelie': 'red',
    'Gentoo': 'teal',
    'Chinstrap': 'orange'
};

// DATA INDSTILLINGER
const url = 'https://vincentarelbundock.github.io/Rdatasets/csv/palmerpenguins/penguins.csv';
// Vi bruger disse kolonner:
// X: bill_length_mm (Næb længde)
// Y: bill_depth_mm (Næb dybde)
// Label: species (Arten)


function preload() {
    // p5.js loadTable sikrer at filen er hentet FØR setup() kører.
    // Vi gemmer den i en midlertidig variabel 'tbl'.
    tbl = loadTable(url, 'csv', 'header');
}

function setup() {
    // 1. OPRET P5 CANVAS
    let canvas = createCanvas(windowWidth - 40, 400); 
    canvas.parent('canvas-container');

    // 2. FORBEHANDL DATA (Nu er vi sikre på 'tbl' er loaded)
    // Vi renser data og gemmer det i vores simple 'penguins' liste
    penguins = tbl.rows.map(r => {
        let x = float(r.get('bill_length_mm'));
        let y = float(r.get('bill_depth_mm'));
        let label = r.get('species');
        return { x, y, label };
    }).filter(p => !isNaN(p.x) && !isNaN(p.y) && p.label);
    
    console.log(`Data processeret. Antal pingviner: ${penguins.length}`);

    // BEREGN AKSE-VÆRDIER (MIN/MAX) UD FRA DATA
    let xValues = penguins.map(p => p.x);
    let yValues = penguins.map(p => p.y);
    minX = min(xValues);
    maxX = max(xValues);
    minY = min(yValues);
    maxY = max(yValues);

    // 3. GENERER HTML DATA TABEL (Viser de første 10)
    generateDataTable();

    // 4. FORBIND KONTROLKNAPPER
    setupControls();

    // 5. TEGN GRAFEN FØRSTE GANG
    noLoop(); // Vi behøver ikke animere, vi tegner kun når noget ændres
    redraw();
}

function draw() {
    background(255);
    
    // Hvis vi ikke har data endnu, stop
    if (penguins.length === 0) return;

    // FLYT KOORDINATSYSTEMET (Så slipper vi for at trække padding fra alle steder)
    push();
    translate(padding, padding);
    
    // Beregn grafens bredde og højde
    let w = width - (padding * 2);
    let h = height - (padding * 2);

    // TEGN UDERSØGELSEN (GRITTER OG AKSER)
    drawAxes(minX, maxX, minY, maxY, w, h);

    // TEGN ALLE DE KENDTE PINGVINER
    penguins.map(p => {
        // Nu mapper vi bare til 0 og w/h - meget nemmere
        let screenX = map(p.x, minX, maxX, 0, w);
        let screenY = map(p.y, minY, maxY, h, 0); // Y er stadig vendt på hovedet i computer-grafik

        fill(speciesColors[p.label] || 'black');
        noStroke();
        ellipse(screenX, screenY, 8, 8);
    });

    // TEGN BRUGERENS GÆT (HVIS DER ER ET)
    if (userGuess) {
        let inputX = userGuess.x;
        let inputY = userGuess.y;
        let neighbors = userGuess.neighbors;

        let newX = map(inputX, minX, maxX, 0, w);
        let newY = map(inputY, minY, maxY, h, 0);

        // Tegn linjer til naboer
        stroke(100);
        strokeWeight(1);
        neighbors.map(n => {
            let nx = map(n.x, minX, maxX, 0, w);
            let ny = map(n.y, minY, maxY, h, 0);
            line(newX, newY, nx, ny);
        });

        // Tegn selve punktet
        stroke(0);
        strokeWeight(2);
        noFill();
        rectMode(CENTER);
        rect(newX, newY, 20, 20);
    }

    pop(); // Glem translate indstillingen igen
}

// -------------------------------------------------------------
// DEN VIGTIGSTE FUNKTION: KNN ALGORITMEN
// -------------------------------------------------------------
function classifyPenguin() {
    // 1. Hent den nye pingvins data fra input-felterne
    let inputX = float(select('#input-x').value());
    let inputY = float(select('#input-y').value());

    // 2. Beregn afstand til ALLE andre pingviner
    // Vi bruger map til at opdatere hver pingvin med afstanden
    penguins.map(p => {
        p.distance = dist(inputX, inputY, p.x, p.y);
        return p;
    });

    // 3. Sorter pingvinerne, så dem med mindst afstand kommer først
    penguins.sort((a, b) => a.distance - b.distance);

    // 4. Udvælg de 'k' nærmeste
    let neighbors = penguins.slice(0, k);

    // 5. Lad naboerne stemme (Tæl forekomster af hver art)
    let votes = {};
    neighbors.map(n => {
        if (!votes[n.label]) votes[n.label] = 0;
        votes[n.label]++;
    });

    // 6. Find vinderen
    let winnerLabel = "";
    let maxVotes = 0;

    Object.keys(votes).map(label => {
        if (votes[label] > maxVotes) {
            maxVotes = votes[label];
            winnerLabel = label;
        }
    });

    console.log("Naboer:", neighbors);
    console.log("Stemmer:", votes);
    console.log("Vinder:", winnerLabel);

    // 7. Vis resultatet på skærmen
    let resultSpan = select('#prediction-text');
    resultSpan.html(winnerLabel);
    resultSpan.style('color', speciesColors[winnerLabel] || 'black');

    // 8. Gem info om gættet i den globale variabel, så draw() kan tegne det
    userGuess = {
        x: inputX, 
        y: inputY, 
        neighbors: neighbors 
    };

    // 9. Opdater grafen
    redraw();
}

// -------------------------------------------------------------
// HJÆLPE FUNKTIONER (GUI og tegning)
// -------------------------------------------------------------

function setupControls() {
    // Opdater tallet ved siden af slideren, når man trækker
    let xSlider = select('#input-x');
    xSlider.input(() => select('#val-x').html(xSlider.value()));

    let ySlider = select('#input-y');
    ySlider.input(() => select('#val-y').html(ySlider.value()));

    let kSlider = select('#k-slider');
    kSlider.input(() => {
        k = int(kSlider.value());
        select('#k-value').html(k);
    });

    // Knappen der starter klassifikationen
    select('#predict-btn').mousePressed(classifyPenguin);
}

function generateDataTable() {
    let tbody = select('#data-tbody');
    tbody.html('');
    // Vis kun de første 10 rows for ikke at crashe browseren med DOM elementer
    let preview = penguins.slice(0, 10); 
    
    preview.map((p, i) => {
        let tr = createElement('tr');
        tr.parent(tbody);
        createElement('td', String(i + 1)).parent(tr);
        createElement('td', String(p.x)).parent(tr);
        createElement('td', String(p.y)).parent(tr);
        let labelCell = createElement('td', p.label);
        labelCell.parent(tr);
        labelCell.style('color', speciesColors[p.label]);
    });
}

function drawAxes(xMin, xMax, yMin, yMax, w, h) {
    stroke(0);
    strokeWeight(1);
    // X-akse (tegnes i bunden af vores 'w' og 'h' område)
    line(0, h, w, h);
    // Y-akse
    line(0, h, 0, 0);
    
    fill(0);
    noStroke();
    textAlign(CENTER);
    text(`Næb Længde (${xMin}-${xMax} mm)`, w/2, h + 30);
    
    push();
    translate(-30, h/2);
    rotate(-HALF_PI);
    text(`Næb Dybde (${yMin}-${yMax} mm)`, 0, 0);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth - 40, 400); 
    redraw();
}