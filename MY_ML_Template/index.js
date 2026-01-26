/*
 * MACHINE LEARNING: K-MEANS CLUSTERING (SVG VERSION)
 * 
 * Dette eksempel viser hvordan K-means algoritmen virker uden brug af p5.js canvas.
 * Vi bruger almindelig HTML og SVG til at tegne resultatet.
 */

// Globale variabler
let tbl;            // Data-objektet der holder CSV-filen
let pts = [];       // Listen af datapunkter (hvert punkt er {x, y})
let labels = [];    // Liste der fortæller hvilken gruppe hvert punkt hører til (0, 1, 2...)
let centroids = []; // Liste af centre (x,y) for hver gruppe
let k = 2;          // Antallet af grupper vi vil finde
let iterations = 10; // Antal gange vi gentager processen (konvergens)
// Liste med farver til de forskellige grupper
let colors = ['red', 'green', 'blue', 'purple', 'orange', 'teal'];
const url = 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/faithful.csv';

function preload() {
    tbl = loadTable(url, 'csv', 'header');
}

function setup() {
    // 1. VI BRUGER IKKE P5 CANVAS
    noCanvas(); 

    // 2. FORBEHANDLING AF DATA
    pts = tbl.rows.map(r => {
        return {
            x: float(r.get('eruptions')),
            y: float(r.get('waiting'))
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
    let container = select('#data-container');
    let html = '<table>';
    html += '<thead><tr><th>ID</th><th>Eruptions (min)</th><th>Waiting (min)</th></tr></thead>';
    html += '<tbody>';
    pts.forEach((p, i) => {
        html += `<tr><td>${i+1}</td><td>${p.x}</td><td>${p.y}</td></tr>`;
    });
    html += '</tbody></table>';
    container.html(html);
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
    // A. FIND DATA OMRÅDE (MIN/MAX)
    let xs = pts.map(p => p.x);         
    let ys = pts.map(p => p.y);         
    let minX = min(xs), maxX = max(xs); 
    let minY = min(ys), maxY = max(ys); 
    
    // Dimensioner til SVG tegningen
    let svgWidth = 700;
    let svgHeight = 400;
    let padding = 40;

    // B. INITIALISERING
    centroids = [];
    for (let i = 0; i < k; i++) {
        centroids.push( random(pts) );
    }

    // C. TRÆNINGSLØKKE
    for (let i = 0; i < iterations; i++) {
        // TRIN 1: ASSIGN - Find nærmeste center
        labels = pts.map(p => {
            let bestIndex = 0;           
            let shortestDist = Infinity; 
            centroids.forEach((c, index) => {
                let dx = p.x - c.x;         
                let dy = p.y - c.y;         
                let d = dx*dx + dy*dy;      
                if (d < shortestDist) {
                    shortestDist = d;
                    bestIndex = index;
                }
            });
            return bestIndex;
        });

        // TRIN 2: UPDATE - Flyt centre
        let sums = [];
        for(let j=0; j<k; j++) sums.push({x:0, y:0, count:0});

        pts.forEach((p, index) => {
            let groupIndex = labels[index]; 
            if(sums[groupIndex]) {
                sums[groupIndex].x += p.x;  
                sums[groupIndex].y += p.y;  
                sums[groupIndex].count++;   
            }
        });

        centroids = sums.map(s => {
            if (s.count > 0) return { x: s.x / s.count, y: s.y / s.count };
            else return random(pts); 
        });
    }

    // D. SKALERING TIL SKÆRM (Visualisering)
    pts = pts.map(p => {
        return {
            ...p,
            px: map(p.x, minX, maxX, padding, svgWidth - padding),
            py: map(p.y, minY, maxY, svgHeight - padding, padding)
        };
    });
    
    centroids = centroids.map(c => {
        return {
            ...c,
            px: map(c.x, minX, maxX, padding, svgWidth - padding),
            py: map(c.y, minY, maxY, svgHeight - padding, padding)
        };
    });

    // E. TEGN RESULTATET MED SVG (HTML)
    drawSVG(svgWidth, svgHeight);
}

function drawSVG(w, h) {
    let container = document.getElementById('canvas-container');
    
    // Start SVG strengen
    let svg = `<svg width="${w}" height="${h}" style="background: white; border: 1px solid #ccc;">`;

    // 1. Tegn alle punkter som cirkler
    pts.forEach((p, i) => {
        let groupIndex = labels[i];
        let color = colors[groupIndex % colors.length];
        svg += `<circle cx="${p.px}" cy="${p.py}" r="5" fill="${color}" opacity="0.8" />`;
    });

    // 2. Tegn alle centre som større cirkler med sort kant
    centroids.forEach((c, i) => {
        svg += `<circle cx="${c.px}" cy="${c.py}" r="12" fill="white" stroke="black" stroke-width="3" />`;
        // Tilføj evt. et kryds i midten
        svg += `<line x1="${c.px-5}" y1="${c.py}" x2="${c.px+5}" y2="${c.py}" stroke="black" stroke-width="2" />`;
        svg += `<line x1="${c.px}" y1="${c.py-5}" x2="${c.px}" y2="${c.py+5}" stroke="black" stroke-width="2" />`;
    });

    svg += '</svg>';
    
    // Sæt HTML indholdet
    container.innerHTML = svg;
}
