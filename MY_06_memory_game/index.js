var currentPage = '#page1'

// Array med filnavne på vores billeder - hvert billede står der to gange så vi kan få par
var images = [
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg",
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg"
]

// Variabler til at holde styr på spillets gang
var shuffledImages = [] // Her gemmer vi de blandede billeder
var flippedCards = []   // Her gemmer vi de kort der lige er vendt (max 2)
var currentPlayer = 0   // Hvem har turen? 0 er spiller 1, 1 er spiller 2
var score1 = 0          // Point til spiller 1
var score2 = 0          // Point til spiller 2

function setup(){
    noCanvas() // Vi bruger HTML elementer, så vi behøver ikke et canvas
    
    shiftPage(currentPage) // Skift til startsiden
    
    // Når man klikker på start spil knappen
    select('#startGame').mousePressed(() => {
        setupGame()         // Gør spillet klar
        shiftPage('#page2') // Skift til spillesiden
    })
}

// Funktion til at skifte mellem sider (skjuler den gamle, viser den nye)
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

function setupGame() {
    // Nulstil alle variabler så vi starter forfra
    flippedCards = []
    score1 = 0
    score2 = 0
    currentPlayer = 0
    
    // Find containeren hvor kortene skal være
    var gameBoard = select('#gameContainer')
    gameBoard.html('') // Tøm containeren for gamle kort
    
    // Brug P5's shuffle funktion til at blande billederne tilfældigt
    shuffledImages = shuffle(images)

    // Løb igennem alle billederne og lav kort
    shuffledImages.map( imgSrc => {
        // Lav en div som er selve kortet
        var card = createDiv('').parent(gameBoard).addClass('card')
        
        // Gem filnavnet på kortet så vi kan tjekke om det matcher senere
        card.attribute('data-value', imgSrc)
        
        // Lav billedet inde i kortet
        var img = createImg(imgSrc, 'card image').parent(card)
        
        // Når man trykker på kortet, skal funktionen flipCard køre med kortet som argument
        card.mousePressed(() => flipCard(card))
    })
}

function flipCard(card) {
    // Stop hvis:
    // 1. Der allerede er vendt 2 kort (vi venter på tjek)
    // 2. Kortet allerede er vendt (har klassen 'flipped')
    // 3. Kortet allerede er parret (har klassen 'matched')
    if (flippedCards.length >= 2 || card.hasClass('flipped') || card.hasClass('matched')) return

    // Tilføj klassen 'flipped' så CSS viser billedet
    card.addClass('flipped')
    
    // Gem kortet i listen over vendte kort
    flippedCards.push(card)

    // Hvis vi har vendt to kort, skal vi tjekke om de matcher efter 1 sekund
    if (flippedCards.length === 2) setTimeout(checkMatch, 1000)
}

function checkMatch() {
    // Hent de to kort vi har vendt
    var card1 = flippedCards[0]
    var card2 = flippedCards[1]

    // Sammenlign 'data-value' (filnavnet) på de to kort
    if (card1.attribute('data-value') === card2.attribute('data-value')) {
        // Det var et match! Giv point til den rigtige spiller
        if(currentPlayer === 0) score1++ 
        else score2++
        
        // Put klassen 'matched' på kortene så de bliver grønne
        card1.addClass('matched')
        card2.addClass('matched')
    } else {
        // Desværre, ikke et match
        // Fjern 'flipped' så de vender sig om igen (billedet skjules)
        card1.removeClass('flipped')
        card2.removeClass('flipped')
        
        // Skift tur til den anden spiller
        if(currentPlayer === 0) {
            currentPlayer = 1
        } else {
            currentPlayer = 0
        }
    }
    
    // Tøm listen over vendte kort så vi er klar til næste tur
    flippedCards = [] 

    // Tjek om spillet er slut (hvis antallet af matched kort er lig med antallet af billeder)
    if (selectAll('.matched').length === images.length) {
        // Find vinderen
        var winnerText = score1 > score2 ? "Spiller 1" : (score1 < score2 ? "Spiller 2" : "Uafgjort")
        
        // Vis vinderen og skift til slutskærmen
        select('#winnerHeading').html(winnerText + " vandt! (" + score1 + " - " + score2 + ")")
        shiftPage('#page3')
    }
}
