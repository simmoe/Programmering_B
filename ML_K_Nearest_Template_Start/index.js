/*
 * SUPERVISED LEARNING: K-NEAREST NEIGHBORS (KNN)
 * 
 * Dette eksempel viser hvordan K-Nearest Neighbor algoritmen virker.
 * Vi har et datasæt med kendte pingviner (Træningsdata).
 * Vi skal kunne klassificere en NY ukendt pingvin baseret på de nærmeste naboer.
 */

// GLOBALE VARIABLER
let tbl            // Data-objektet
let penguins = []  // Listen af rensede pingvin-data
let k = 3          // Hvor mange naboer kigger vi på?
let padding = 40   // Luft rundt om grafen

// Globale variabler til aksernes min/max værdier (bliver beregnet ud fra data)
let minX, maxX, minY, maxY

// Farver til de forskellige arter (Adelie, Gentoo, Chinstrap)
let speciesColors = {
    'Adelie': 'red',
    'Gentoo': 'teal',
    'Chinstrap': 'orange'
}

// DATA INDSTILLINGER
const url = 'https://vincentarelbundock.github.io/Rdatasets/csv/palmerpenguins/penguins.csv'
// Vi bruger disse kolonner:
// X: bill_length_mm (Næb længde)
// Y: bill_depth_mm (Næb dybde)
// Label: species (Arten)


function preload() {
    // p5.js loadTable sikrer at filen er hentet FØR setup() kører.
    // Vi gemmer den i en midlertidig variabel 'tbl'.
    tbl = loadTable(url, 'csv', 'header')
}

function setup() {
    // 1. OPRET P5 CANVAS
    // Vi finder størrelsen på containeren, som styres af CSS Grid layoutet
    let container = select('#canvas-container')
    let w = container.width
    let h = container.height 
    
    let canvas = createCanvas(w, h) 
    canvas.parent(container)

    // 2. FORBEHANDL DATA (Nu er vi sikre på 'tbl' er loaded)
    // Vi renser data og gemmer det i vores simple 'penguins' liste med objekter 
    penguins = tbl.rows.map(r => {
        let x = float(r.get('bill_length_mm'))
        let y = float(r.get('bill_depth_mm'))
        let label = r.get('species')
        return { x, y, label }
    }).filter(p => !isNaN(p.x) && !isNaN(p.y) && p.label)
    
    console.log(`Data processeret. Antal pingviner:`, penguins.length)

    // BEREGN AKSE-VÆRDIER (MIN/MAX) UD FRA DATA
    // Her bruger vi .map() til at lave en ny liste, der KUN indeholder tallene for x (eller y). Fx [12, 35, 3]
    // Det er nødvendigt, fordi p5's min() og max() funktioner kun virker på rene talserier, ikke objekter.
    let xValues = penguins.map(p => p.x)
    let yValues = penguins.map(p => p.y)
    minX = min(xValues)
    maxX = max(xValues)
    minY = min(yValues)
    maxY = max(yValues)

    // 3. LOG DATA EKSEMPEL
    console.log("Eksempel på en pingvin:", penguins[0])

    // 4. FORBIND KONTROLKNAPPER
    setupControls()

    // 5. TEGN GRAFEN FØRSTE GANG
    drawToCanvas()
}

function drawToCanvas() {

    // 2. Tegn akser på canvas (Ligger bagved html-punkterne)
    
    // NOTE:
    // push() gemmer de nuværende indstillinger (f.eks. hvor (0,0) er).
    // translate(x, y) flytter startpunktet (0,0) ind på skærmen, så vi har 'padding' i kanten.
    // pop() gendanner indstillingerne, så de ikke påvirker resten af koden.
    push()
    translate(padding, padding)
    
    let w = width - (padding * 2)
    let h = height - (padding * 2)

    drawAxes(minX, maxX, minY, maxY, w, h)
    pop() // Gendan (0,0) til øverste venstre hjørne

    // 4. GENERER HTML-PUNKTER FOR ALLE PINGVINER
    drawDataPoints()
}

function drawDataPoints() {
    let container = select('#canvas-container')
    let infoBox = select('#info-box')

    penguins.map(p => {
        // Beregn position i forhold til hele containeren (inkl. padding)
        let px = map(p.x, minX, maxX, padding, width - padding)
        let py = map(p.y, minY, maxY, height - padding, padding)

        createDiv('')
            .parent(container)
            .class('dot')
            .style('background-color', speciesColors[p.label])
            .position(px, py)
            .mouseOver(() => {
                infoBox.html(`
                    Art: <b><span style="color:${speciesColors[p.label]}">${p.label}</span></b><br>
                    Næb Længde: ${p.x} mm<br>
                    Næb Dybde: ${p.y} mm
                `)
            })
            .mouseOut(() => {
                infoBox.html('Hold musen over et punkt...')
            })
    })
}

function drawUserGuess(x, y) {
    // Fjern evt. tidligere gæt (så vi ikke får flere prikker)
    selectAll('.user-guess').map(el => el.remove())

    let container = select('#canvas-container')
    let infoBox = select('#info-box')
    
    let px = map(x, minX, maxX, padding, width - padding)
    let py = map(y, minY, maxY, height - padding, padding)

    createDiv('')
        .parent(container)
        .class('user-guess') 
        .position(px, py)
        .style('background-color', '#333')
        .mouseOver(() => {
            infoBox.html(`
                <strong>❓ Ukendt Pingvin</strong><br>
                Dine input værdier:<br>
                Længde: ${x} mm<br>
                Dybde: ${y} mm
            `)
        })
}

// -------------------------------------------------------------
// DEN VIGTIGSTE FUNKTION: KNN ALGORITMEN
// -------------------------------------------------------------
function classifyPenguin() {
    // 1. Hent den nye pingvins data fra input-felterne
    let inputX = float(select('#input-x').value())
    let inputY = float(select('#input-y').value())

    // 2. Beregn afstand til ALLE andre pingviner
    // Vi bruger map til at opdatere hver pingvin med afstanden
    penguins.map(p => {
        p.distance = dist(inputX, inputY, p.x, p.y)
        return p
    })

    // 3. Sorter pingvinerne, så dem med mindst afstand kommer først
    penguins.sort((a, b) => a.distance - b.distance)

    // 4. Udvælg de 'k' nærmeste
    let neighbors = penguins.slice(0, k)

    // 5. Lad naboerne stemme (Tæl forekomster af hver art)
    let votes = {}
    neighbors.map(n => {
        if (!votes[n.label]) votes[n.label] = 0
        votes[n.label]++
    })

    // 6. Find vinderen
    let winnerLabel = ""
    let maxVotes = 0

    Object.keys(votes).map(label => {
        if (votes[label] > maxVotes) {
            maxVotes = votes[label]
            winnerLabel = label
        }
    })

    console.log("Naboer:", neighbors)
    console.log("Stemmer:", votes)
    console.log("Vinder:", winnerLabel)

    // 7. Vis resultatet på skærmen
    let resultSpan = select('#prediction-text')
    resultSpan.html(winnerLabel)
    resultSpan.style('color', speciesColors[winnerLabel] || 'black')

    // 8. Tegn vores nye gæt (De andre punkter bliver stående)
    drawUserGuess(inputX, inputY)
}

// -------------------------------------------------------------
// HJÆLPE FUNKTIONER (GUI og tegning)
// -------------------------------------------------------------

function setupControls() {
    // Opdater tallet ved siden af slideren, når man trækker
    let xSlider = select('#input-x')
    xSlider.input(() => select('#val-x').html(xSlider.value()))

    let ySlider = select('#input-y')
    ySlider.input(() => select('#val-y').html(ySlider.value()))

    let kSlider = select('#k-slider')
    kSlider.input(() => {
        k = int(kSlider.value())
        select('#k-value').html(k)
    })

    // Knappen der starter klassifikationen
    select('#predict-btn').mousePressed(classifyPenguin)
}

function drawAxes(xMin, xMax, yMin, yMax, w, h) {
    stroke(0)
    // X-akse (tegnes i bunden af vores 'w' og 'h' område)
    line(0, h, w, h)
    // Y-akse
    line(0, h, 0, 0)
    
    fill(0)
    noStroke()
    textAlign(CENTER)
    text(`Næb Længde (${xMin}-${xMax} mm)`, w/2, h + 30)
    
    // For at skrive tekst på højkant, skal vi rotere koordinatsystemet
    push()
    translate(-30, h/2) // Flyt hen hvor teksten skal stå
    rotate(-HALF_PI)    // Roter 90 grader mod uret
    text(`Næb Dybde (${yMin}-${yMax} mm)`, 0, 0)
    pop()
}

function windowResized() {
    let container = select('#canvas-container')
    // 1. Ryd op (Fjern lærredet og gamle HTML-elementer)
    background(255)
    selectAll('.dot').map(el => el.remove())
    selectAll('.user-guess').map(el => el.remove())
    resizeCanvas(container.width, container.height) 

    drawToCanvas()
}