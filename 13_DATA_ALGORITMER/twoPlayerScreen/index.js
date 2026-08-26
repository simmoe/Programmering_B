//array med alle rick and morty karaktererne
var chars = []

function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
    getCharacters()
    
}

async function getCharacters(){
    //Vi starter med at hente karakterne i Rick Morty API
    var characters = await getJSON('https://rickandmortyapi.com/api/character?page=1')
    showCharacters(characters.results)
}

function showCharacters(characters){
    characters.map( c => {
        var card = createCard(c.name, c.species, c.image)        
        select('#characters').child(card)
    })    
}
