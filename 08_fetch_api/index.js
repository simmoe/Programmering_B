var currentPage = '#page1'
var deck

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    getDeck()

    select('#getCardBtn').mousePressed( () => {
        getCard()
    })


    
    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
       page => {
        //Lav et nyt <a> element 
        var menuItem = createElement('a')
        //Sæt a taggets html til sidens titel
        menuItem.html(page.attribute('title'))
        //sæt eventlistener på a tagget
        menuItem.mousePressed(
            () => shiftPage('#' + page.attribute('id'))
        )
        //sæt a tagget ind i sidebaren
        select('.sidebar').child(menuItem)
       }
    )

}

async function getDeck(){
    try {
        //fetch kan hente data fra en server ude i byen 
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        //Repsonse objektet kommer tilbage fr serveren - og HVIS response.ok er true, kan vi hente data
        console.log("Response objektet:", response)
        if(response.ok){
            const data = await response.json()
            console.log("Data vi får tilbage: ", data)
            deck = data
        }
    } catch (error){
        console.log(error)
    }
}

async function getCard(){
    //DOM binding
    var cardDiv = select('#card')
    cardDiv.html('')
    try{
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await response.json()
        console.log(data)
        //createImg er en p5 funktion som laver et HTML img element 
        var cardImg = createImg(data.cards[0].image)
        var cardName = createElement('h3', data.cards[0].value + data.cards[0].suit)
        var cardsRemain = createElement('p', "Remaining cards:" +  data.remaining)
        cardDiv.child(cardImg)
        cardDiv.child(cardName)
        cardDiv.child(cardsRemain)
    } catch(error){
        console.log("Error catched", error)
    }
} 

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

