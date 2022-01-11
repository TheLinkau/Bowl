//SCRIPT LOGIQUE

//300 score max
//spare 10 points + les points du prochain coup
//strike 10 points + les points des deux prochains coups, sur deux frames si le prochain est aussi un strike
//deux coups par frame
//dix quilles max par frame

var listeJoueur;
var indexJoueurActuel;
var playerTours;
var numCoupsDansLaFrame; //1 ou 2 generalement, ou peut etre 3 si dernier tour
var numTour; //1 a 10
var nbFrameMax;
var finJeu;

function init(){
  listeJoueur = ["Jean", "Yves"];

  indexJoueurActuel = 0;

  playerTours = {};
  for (var i = 0; i < listeJoueur.length; i++) {
      playerTours[listeJoueur[i]] = [];
  }

  numCoupsDansLaFrame = 1; //1 ou 2 generalement, ou peut etre 3 si dernier tour

  nbFrameMax = 10;
  numTour = 1; //1 a nbFrameMax
  finJeu = false;
}

// //simulation car jai pas encore l'html
// while(numTour <= nbFrameMax){
//   var input;
//   do{
//     input = prompt("Au tour de: "+listeJoueur[indexJoueurActuel]+" pour son coups: "+numCoupsDansLaFrame+"\nEntrer le nombre de quille tombe sur ce coup");
//   }while(!processInput(input));
//   alert("ok");
// }

/*
fonction appelee par le click de l'utilisateur sur le bouton d'envoie
input : donnee dans le formulaire, peut etre de n'importe quel type
return : boolean, true si tout s'est bien passe, false sinon (mauvais input ou incoherence)
*/
function processInput(input){
  //on test s'il y a seulement des digits dans le string avec une expression reguliere
  var areOnlyNum = /^\d+$/.test(input);
  if(!areOnlyNum) return false;

  var inputNbQuille = parseInt(input, 10);
  if(isNaN(inputNbQuille)) return false;

  if(!isInputNbQuilleOK(inputNbQuille)) return false;

  //On rempli les variables
  addCoups(inputNbQuille);

  //On update le html
  updateHTML();

  return true;
}


/*
nbQuille : int du nombre de quille
return : boolean, true si la coherence du nombre de quille est respecte, false sinon
*/
function isInputNbQuilleOK(nbQuille){
  return true;
}


/*

*/
function addCoups(nbQuille) {
  console.log("oui");
}


function updateHTML() {
  if(finJeu){

  }
}


module.exports = {init, processInput, isInputNbQuilleOK, addCoups, updateHTML, listeJoueur, indexJoueurActuel, playerTours, numCoupsDansLaFrame, numTour
, nbFrameMax, finJeu};