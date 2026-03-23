// ---------------------------------------------------------
// FIREBASE CONFIG
// ---------------------------------------------------------
// Dette objekt indeholder noeglerne til vores Firebase-projekt.
// Det svarer til en adresse + adgangskort til vores database i skyen.
// Vaerdierne kommer fra Firebase Console -> Project Settings.
const firebaseConfig = {
  apiKey: "AIzaSyDl9D_bpaWdFctF8zICA_TYhYA0r1unpC8",
  authDomain: "simons-testdatabase.firebaseapp.com",
  projectId: "simons-testdatabase",
  storageBucket: "simons-testdatabase.firebasestorage.app",
  messagingSenderId: "407427913637",
  appId: "1:407427913637:web:716ff5acc745fa6273fa4c"
}

// ---------------------------------------------------------
// OPRET FORBINDELSE TIL FIREBASE
// ---------------------------------------------------------
// initializeApp() starter Firebase med vores config.
// Herefter kan vi bruge Firebase-tjenester som Firestore.
firebase.initializeApp(firebaseConfig)
console.log('Firebase er initialiseret med projekt:', firebaseConfig.projectId)

// firebase.firestore() giver os et Firestore-objekt,
// som vi kan bruge til at laese og skrive data i databasen.
var db = firebase.firestore()
console.log('Firestore-forbindelse oprettet')

// ---------------------------------------------------------
// REFERENCE TIL EN COLLECTION
// ---------------------------------------------------------
// En "collection" i Firestore er som en mappe med dokumenter.
// db.collection("quotes") giver os en reference til collectionen "quotes".
//
// VIGTIGT: Collectionen bliver IKKE oprettet her.
// Firestore opretter automatisk en collection i det oejeblik
// man gemmer det FOERSTE dokument i den med .add() eller .set().
// Indtil da eksisterer den simpelthen ikke i databasen,
// og onSnapshot returnerer bare 0 resultater uden fejl.
var quotesRef = db.collection("quotes")
console.log('Reference oprettet til collection: quotes')

// ---------------------------------------------------------
// SETUP - KOERES EN GANG NAAR SIDEN INDLAESES
// ---------------------------------------------------------
// p5.js kalder setup() automatisk naar siden er klar.
// Her saetter vi event listeners op og starter vores realtime-lytter.
function setup() {

  // Knyt saveQuote-funktionen til gem-knappen.
  // mousePressed() er p5s maade at tilfoeje et klik-event.
  select('#saveBtn').mousePressed(saveQuote)

  // --- REALTIME LISTENER ---
  // onSnapshot() lytter konstant paa aendringer i collectionen.
  // Hver gang NOGET aendrer sig (nyt dokument, slettet, redigeret),
  // bliver callback-funktionen kaldt med et nyt "snapshot".
  //
  // .orderBy("timestamp", "desc") sorterer saa det nyeste quote
  // kommer foerst. "desc" = descending = faldende raekkefoelge.
  //
  // Snapshottet indeholder ALLE dokumenter i collectionen,
  // ikke kun det der aendrede sig. Derfor rydder vi #history
  // og tegner listen forfra hver gang.
  quotesRef.orderBy("timestamp", "desc").onSnapshot(snapshot => {
    console.log('Firestore opdatering modtaget -', snapshot.size, 'quotes i alt')

    // Ryd den eksisterende liste saa vi kan tegne den forfra
    select('#history').html('')

    // Loeb alle dokumenter igennem.
    // doc.data() returnerer selve indholdet af dokumentet som et objekt,
    // f.eks. { text: "Hello world", timestamp: ... }
    snapshot.forEach(doc => {
      var q = doc.data()
      console.log('Quote hentet:', q)

      // Opret et card-div med dato og tekst
      var card = createElement('div').addClass('card').parent('#history')

      // Vis datoen hvis timestamp findes (det kan vaere null lige efter .add())
      if (q.timestamp) {
        var dato = q.timestamp.toDate().toLocaleString('da-DK')
        createElement('small', dato).parent(card)
      }

      createElement('p', q.text).parent(card)
    })
  })
}

// ---------------------------------------------------------
// GEM ET QUOTE TIL FIRESTORE
// ---------------------------------------------------------
// Denne funktion bliver kaldt naar brugeren trykker Gem.
function saveQuote() {

  // Hent teksten fra textarea-feltet med id "quotes".
  // select() er p5s maade at finde et HTML-element paa,
  // og .value() henter det der staar i et input/textarea.
  var text = select('#quotes').value()

  // Tjek om feltet er tomt (eller kun indeholder mellemrum).
  // Hvis ja, goer ingenting.
  if (text.trim() === '') {
    console.log('Tomt felt - intet gemt')
    return
  }

  console.log('Gemmer quote til Firestore:', text)

  // .add() opretter et NYT dokument i collectionen med et auto-genereret ID.
  // Vi sender et objekt med to felter:
  //   - text: selve quote-teksten
  //   - timestamp: et server-tidsstempel som Firestore selv udfylder.
  //     Vi bruger serverTimestamp() i stedet for Date.now() fordi
  //     serveren altid har det korrekte tidspunkt, uanset brugerens ur.
  //
  // FOERSTE GANG .add() koeres paa en collection der ikke findes endnu,
  // opretter Firestore automatisk collectionen OG dokumentet paa en gang.
  quotesRef.add({
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function() {
    // .then() koeres naar dokumentet er gemt succesfuldt paa serveren
    console.log('Quote gemt!')
  }).catch(function(error) {
    // .catch() koeres hvis noget gik galt, f.eks. manglende rettigheder
    console.log('Fejl ved gem:', error)
  })

  // Toem textarea saa brugeren kan skrive et nyt quote
  select('#quotes').value('')
}
