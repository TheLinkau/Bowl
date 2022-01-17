//SCRIPT LOGIQUE

//300 score max
//spare 10 points + les points du prochain coup
//strike 10 points + les points des deux prochains coups, sur deux frames si le prochain est aussi un strike
//deux coups par frame
//dix quilles max par frame

class Logic {
  constructor(listeJoueur) {
      this.listeJoueur = listeJoueur;
      this.indexJoueurActuel = 0;
      this.playerTours = {};
      for (var i = 0; i < this.listeJoueur.length; i++) {
          this.playerTours[this.listeJoueur[i]] = [];
      }

      this.numCoupsDansLaFrame = 1; //1 ou 2 generalement, ou peut etre 3 si dernier tour

      this.numTour = 1; //1 a nbFrameMax
      this.nbFrameMax = 10;
      this.finJeu = false;
  }

  /*
  input : donnee dans le formulaire, peut etre de n'importe quel type
  return : false si impossible de convertir en int, le nombre int sinon (negatif compris)
  */
  parseInput(input){
    //on test s'il y a seulement des digits (ou le signe -) dans le string avec une expression reguliere
    var areOnlyNum = /^-?\d+$/.test(input);
    if(!areOnlyNum) return false;

    var inputNbQuille = parseInt(input, 10);
    if(isNaN(inputNbQuille)) return false;

    return inputNbQuille;
  }


  /*
  nbQuille : int du nombre de quille
  return : boolean, true si la coherence du nombre de quille est respecte, false sinon
  */
  isInputNbQuilleOK(nbQuille){
    return true;
  }


  /*
  ajoute sans aucune verification le nombre de quille dans la variable membre playerTours en fonction du joueur qui joue
  change aussi les variables indexJoueurActuel, numCoupsDansLaFrame et numTour
  nbQuille : int du nombre de quille
  return : rien
  */
  addCoups(nbQuille) {
    return true;
  }


  updateHTML() {
    if(this.finJeu){

    }
  }


  /*
  fonction appelee par le click de l'utilisateur sur le bouton d'envoie
  input : donnee dans le formulaire, peut etre de n'importe quel type
  return : boolean, true si tout s'est bien passe, false sinon (mauvais input ou incoherence)
  */
  processInput(input){
    var nbQuille = this.parseInput(input);
    if(nbQuille === false)return false;

    if(!this.isInputNbQuilleOK(nbQuille)) return false;

    //On rempli les variables
    this.addCoups(nbQuille);

    //On update le html
    this.updateHTML();

    return true;
  }
}

// //simulation car jai pas encore l'html
// while(numTour <= nbFrameMax){
//   var input;
//   do{
//     input = prompt("Au tour de: "+listeJoueur[indexJoueurActuel]+" pour son coups: "+numCoupsDansLaFrame+"\nEntrer le nombre de quille tombe sur ce coup");
//   }while(!processInput(input));
//   alert("ok");
// }

module.exports = Logic;