'module.exports = Logic;'
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

      /*
      playerTours : dictionnaire de la forme {"nomJoueur" : [(5,2),(10),...,(4,6,7)]}
      */
      this.playerTours = {};
      for (var i = 0; i < this.listeJoueur.length; i++) {
          this.playerTours[this.listeJoueur[i]] = [];
      }

      this.numCoupsDansLaFrame = 1; //1 ou 2 generalement, ou peut etre 3 si dernier tour

      this.numTour = 1; //1 a nbTourMax
      this.nbTourMax = 10;
      this.finJeu = false;
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
    if(this.numTour > this.nbTourMax){
      this.finJeu = true;
    }

    //On update le html
    this.updateHTML();

    return true;
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
  Calcul le score du joueur au tour entree
  return : false si impossible de calculer le score (strike ou spare en attente, tour invalide (trop tard ou negatif))
           le nombre int sinon
  exception : si joueur qui n'existe pas
  */
  getScoreJoueur(joueur, tour) {
    return 0;
  }

  /*
  ajoute sans aucune verification le nombre de quille dans la variable membre playerTours en fonction du joueur qui joue
  change aussi les variables indexJoueurActuel, numCoupsDansLaFrame et numTour
  nbQuille : int du nombre de quille
  return : void
  */
  addCoups(nbQuille) {
    this.numTour++;
  }


  updateHTML() {
    if(this.finJeu){

    }
  }
}



function generate_table() {
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
  
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");

    tbl.setAttribute('class', 'table table-dark');
    tbl.setAttribute('id', 'myTable');

    var tblhead = document.createElement("thead");
    var row = document.createElement("tr");
    var cell = document.createElement("th");
    var cellText = document.createTextNode(" Partie ");
    cell.setAttribute('scope', cell.getAttribute('col'));
 
    cell.appendChild(cellText);
    row.appendChild(cell);
    // creating all cells
    for (var i = 1; i < 11; i++) {
        var cell = document.createElement("th");
        var cellText = document.createTextNode(i);
        cell.setAttribute('scope', cell.getAttribute('col'));
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    var cell = document.createElement("th");
    var cellText = document.createTextNode(" Total ");
    cell.setAttribute('scope', 'col');
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblhead.appendChild(row);
  
    tbl.appendChild(tblhead);

    var tblbody = document.createElement("tbody");
  
    tbl.appendChild(tblbody);
    // appends <table> into <body>
    body.appendChild(tbl);
  }

  function addJoueurTab(){
    var tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];


    var row = document.createElement("tr");
    var cell = document.createElement("th");
    cell.setAttribute('rowspan', '2');
    var cellText  = document.createTextNode('J1');
    cell.appendChild(cellText);
    row.appendChild(cell);
 }
