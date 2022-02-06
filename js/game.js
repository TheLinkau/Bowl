//SCRIPT LOGIQUE

//300 score max
//spare 10 points + les points du prochain coup
//strike 10 points + les points des deux prochains coups, sur deux frames si le prochain est aussi un strike
//deux coups par frame
//dix quilles max par frame

class Logic {
  constructor(nbQuille, listeJoueur) {
      this.nbQuille = nbQuille;
      this.listeJoueur = listeJoueur;
      this.indexJoueurActuel = 0;

      /*
      playerTours : dictionnaire de la forme {"nomJoueur1" : [(5,2),(10),...,(4,6,7)],
                                              "nomJoueur2" : [(1,5),(5,5),...,(10,10,4)],
                                              "nomJoueur3" : [(5,2),(10),...,(4,2)],
                                              ...}
      */
      this.playerTours = {};
      for (let i = 0; i < this.listeJoueur.length; i++) {
          this.playerTours[this.listeJoueur[i]] = [];
      }

      this.numCoupsDansLaFrame = 0; //0 ou 1 generalement, ou peut etre 2 si dernier tour

      this.numTour = 0; //0 a nbTourMax exclus
      this.nbTourMax = 10;
      this.finJeu = false;
  }

  /*
  fonction appelee par le click de l'utilisateur sur le bouton d'envoie
  input : donnee dans le formulaire, peut etre de n'importe quel type
  return : boolean, true si tout s'est bien passe, false sinon (mauvais input ou incoherence)
  */
  processInput(input){
    if(this.finJeu == true)return false;

    let nbQuille = this.parseInput(input);
    if(nbQuille === false)return false;

    if(!this.isInputNbQuilleOK(nbQuille)) return false;

    //On rempli les variables
    this.addCoups(nbQuille);
    if(this.numTour >= this.nbTourMax){
      this.finJeu = true;
    }

    return true;
  }

  /*
  input : donnee dans le formulaire, peut etre de n'importe quel type
  return : false si impossible de convertir en int, le nombre int sinon (negatif compris)
  */
  parseInput(input){
    //on test s'il y a seulement des digits (ou le signe -) dans le string avec une expression reguliere
    let areOnlyNum = /^-?\d+$/.test(input);
    if(!areOnlyNum) return false;

    let inputNbQuille = parseInt(input, 10);
    if(isNaN(inputNbQuille)) return false;

    return inputNbQuille;
  }


  /*
  nbQuille : int du nombre de quille
  return : boolean, true si la coherence du nombre de quille est respecte, false sinon
  */
  isInputNbQuilleOK(nbQuille){
    if(nbQuille < 0 || nbQuille > this.nbQuille)return false;

    if(this.numTour == this.nbTourMax-1){ //dernier tour

      if(this.numCoupsDansLaFrame == 1){ //deuxieme coup

        //si premier coup n'est pas un strike
        if(this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] < this.nbQuille){
          if(nbQuille+this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] > this.nbQuille)
            return false;
        }
        //else deja gerer

      }else if(this.numCoupsDansLaFrame == 2){ //troisieme coup
        //si premier coup est un strike
        if(this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-2] == this.nbQuille){


          if(this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] != this.nbQuille)
            if(nbQuille+this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] > this.nbQuille)
              return false;

        }

        //si deux premier coup est un spare --> limite de this.nbQuille (deja gerer)
      }
      

    }else{
      if(this.numCoupsDansLaFrame == 1){ //deuxieme coup
        if(nbQuille+this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] > this.nbQuille)
          return false;
      }
    }
    return true;
  }


  /*
  Renvoie le score du joueur au tour entree (seulement de ce tour)
  joueur : string du joueur ou le score est recherche
  tour : int tour du joueur ou le score est recherche (entre 0 et this.nbTourMax exclus)
  return : false si impossible de calculer le score (strike ou spare en attente, tour invalide (trop tard ou negatif))
           le nombre int sinon
  exception : si joueur qui n'existe pas
  */
  getScoreJoueurTour(joueur, tour) {
    /*console.log(tour);
    console.log("joueur recherche: "+joueur);
    console.log("joueur actuel: "+this.listeJoueur[this.indexJoueurActuel]);*/

    if(!(joueur in this.playerTours))throw new Error("Invalid player");

    if(tour < 0)return false;

    //on verifie que le tour du joueur est bien fini
    if(tour > this.numTour)return false;
    if(tour == this.numTour && this.playerTours[joueur].length <= tour)return false;
    if(this.playerTours[joueur][tour].length == 0)return false;

    if(tour == this.nbTourMax-1){

      //si strike, on regarde les points des deux prochains coups
      // console.log("dernier Tour");
      if(this.playerTours[joueur][tour].length < 2)return false;


      //si strike, on regarde les points des deux prochains coups
      if(this.playerTours[joueur][tour][0] == this.nbQuille){
        if(this.playerTours[joueur][tour].length != 3)return false;
        let scoreProchainCoups = this.playerTours[joueur][tour][1];
        let scoreDoubleProchainCoups = this.playerTours[joueur][tour][2];
        return this.nbQuille+scoreProchainCoups+scoreDoubleProchainCoups;
      }
      //si spare, on regarde les points du prochain coups
      else if(this.playerTours[joueur][tour][0]+this.playerTours[joueur][tour][1] == this.nbQuille){
        if(this.playerTours[joueur][tour].length != 3)return false;
        let scoreProchainCoups = this.playerTours[joueur][tour][2];
        return this.nbQuille+scoreProchainCoups;
      }
      //sinon
      
      return this.playerTours[joueur][tour][0]+this.playerTours[joueur][tour][1];

    }else{

          // console.log("pas dernier Tour");
          
          //si strike, on regarde les points des deux prochains coups
          if(this.playerTours[joueur][tour][0] == this.nbQuille){
            try {
              let scoreProchainCoups = this.playerTours[joueur][tour+1][0];
              let scoreDoubleProchainCoups;
              if(scoreProchainCoups == this.nbQuille){
                if(tour+1 == this.nbTourMax-1){
                  scoreDoubleProchainCoups = this.playerTours[joueur][tour+1][1];
                }else{
                  //le prochain coups est de nouveau un strike, donc on prend le coup du prochain tour
                  scoreDoubleProchainCoups = this.playerTours[joueur][tour+2][0];
                }
                
              }else{
                scoreDoubleProchainCoups = this.playerTours[joueur][tour+1][1];
              }
              return this.nbQuille+scoreProchainCoups+scoreDoubleProchainCoups;
            }catch(error){
              return false;
            }
          }else{

            if(this.playerTours[joueur][tour].length != 2)return false;
            //si spare, on regarde les points du prochain coups
            if(this.playerTours[joueur][tour].length == 2 && this.playerTours[joueur][tour][0]+this.playerTours[joueur][tour][1] == this.nbQuille){
              try {
                let scoreProchainCoups = this.playerTours[joueur][tour+1][0];
                return this.nbQuille+scoreProchainCoups;
              }catch(error){
                return false;
              }
            }
            //sinon
            
            return this.playerTours[joueur][tour][0]+this.playerTours[joueur][tour][1];

          }

    }
    

  }

  /*
  Renvoie le score du joueur total actuel
  joueur : string du joueur ou le score est recherche
  return : int score
  exception : si joueur qui n'existe pas
  */
  getScoreJoueur(joueur) {
    // console.log("getScoreJoueur "+joueur);
    if(!(joueur in this.playerTours))throw new Error("Invalid player");

    let score = 0;

    for (let i = 0; i <= this.numTour; i++) {
      let scoreTour = this.getScoreJoueurTour(joueur, i);
      if(scoreTour != false){
        score += scoreTour;
      }
    }
    
    return score;

  }

  /*
  ajoute sans aucune verification le nombre de quille dans la variable membre playerTours en fonction du joueur qui joue
  change aussi les variables indexJoueurActuel, numCoupsDansLaFrame et numTour
  nbQuille : int du nombre de quille
  return : void
  */
  addCoups(nbQuille) {
    if(this.playerTours[this.listeJoueur[this.indexJoueurActuel]].length == this.numTour){
      this.playerTours[this.listeJoueur[this.indexJoueurActuel]].push([]);
    }

    this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour].push(nbQuille);

    if(this.numTour == this.nbTourMax-1){ //si dernier tour
      //si strike premier lancer et deuxieme lancer
      if(this.numCoupsDansLaFrame == 1 && this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] == this.nbQuille){
        this.numCoupsDansLaFrame++;
      }else if(this.numCoupsDansLaFrame == 1 && nbQuille+this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] == this.nbQuille){
        this.numCoupsDansLaFrame++;
      }else if(this.numCoupsDansLaFrame == 1 && this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-1] != this.nbQuille){
        //on change de joueur/tour
        this.indexJoueurActuel = (this.indexJoueurActuel+1)%this.listeJoueur.length;
        this.numCoupsDansLaFrame = 0;
        if(this.indexJoueurActuel == 0){
          this.numTour++;
        }
      }else if(this.numCoupsDansLaFrame == 2){
        //on change de joueur/tour
        this.indexJoueurActuel = (this.indexJoueurActuel+1)%this.listeJoueur.length;
        this.numCoupsDansLaFrame = 0;
        if(this.indexJoueurActuel == 0){
          this.numTour++;
        }
      }else{
        this.numCoupsDansLaFrame++;
      }

    }else{
      //si strike au premier lancer ou deuxieme lancer
      if((this.numCoupsDansLaFrame == 0 && nbQuille == this.nbQuille) || this.numCoupsDansLaFrame == 1){
        //on change de joueur/tour
        this.indexJoueurActuel = (this.indexJoueurActuel+1)%this.listeJoueur.length;
        this.numCoupsDansLaFrame = 0;
        if(this.indexJoueurActuel == 0){
          this.numTour++;
        }
      }else{
        this.numCoupsDansLaFrame++;
      }
    }
  }


  updateHTML() {
    // console.log(this.playerTours);

    for (let j = 0; j < this.listeJoueur.length; j++) {
      let str1 = 'P' + j + 'Score';
      let scoreJ = this.getScoreJoueur(this.listeJoueur[j]);
        if(isNaN(scoreJ) || scoreJ === false)
          document.getElementById(str1).textContent = "en attente";
        else
          document.getElementById(str1).textContent = scoreJ;

      for (let i = 0; i < this.nbTourMax; i++) {
        let str2 = 'P' + j + 'T' + i + 'CT';

        let scoreTour = this.getScoreJoueurTour(this.listeJoueur[j], i);
        if(!(isNaN(scoreTour) || scoreTour === false)){
          document.getElementById(str2).textContent = scoreTour;
        }


        let nbCoupMax = 2;
        if(i == this.nbTourMax-1)nbCoupMax=3;
        for (let k = 0; k < nbCoupMax; k++) {
          let str3 = 'P' + j + 'T' + i + 'C'+ k;
          try{
              let scoreC = this.playerTours[this.listeJoueur[j]][i][k];

              if(i == this.nbTourMax-1){
                  if(k == 0){ //premier coup
                    if(scoreC == this.nbQuille){
                      scoreC = "X";
                    }
                  }else if(k == 1){
                    if(this.playerTours[this.listeJoueur[j]][i][k-1] == this.nbQuille){
                      if(scoreC == this.nbQuille){ //premier coup
                        scoreC = "X";
                      }
                    }else if(scoreC+this.playerTours[this.listeJoueur[j]][i][k-1] == this.nbQuille){
                      scoreC = "/";
                    } 
                  }else if(k == 2){
                    if(scoreC == this.nbQuille){ //premier coup
                      scoreC = "X";
                    }
                  }
              }else{
                if(k == 0){ //premier coup
                    if(scoreC == this.nbQuille){
                      scoreC = "X";
                    }
                }else if(k == 1){ //deuxieme coup
                  if(scoreC+this.playerTours[this.listeJoueur[j]][i][k-1] == this.nbQuille){
                    scoreC = "/";
                  }
                }
              }


              document.getElementById(str3).textContent = scoreC;
          }catch(error){}
        }
      }
    }
  }
}

var storedArray = window.sessionStorage.getItem("playersNames");
var nbQuilles = Number(window.sessionStorage.getItem("nbQuilles"));


if(storedArray){
  storedArray = storedArray.split(",");
  var logic = new Logic(nbQuilles, storedArray);


  function input(){
    var input = document.getElementById("score");
    if(!logic.processInput(input.value)){
      window.alert('Entrez un score valide !');
    }
    logic.updateHTML();
    var idxJoueurActu = logic.indexJoueurActuel;
    console.log(idxJoueurActu);
    var JoueurActu = storedArray[idxJoueurActu];
    var h = document.getElementById("jAct");
    h.innerHTML = JoueurActu + " à toi de jouer";


    if(logic.finJeu){

      // Récupération des records
      tabBestScores = [];
      for(var i=1; i<=5; i++) {
        var item = localStorage.getItem("rank"+i);
        if(item != null) {
            player = item.split(",")[0];
            score = item.split(",")[1];
            tabBestScores.push([player, parseInt(score)]);
        }else {
            tabBestScores.push(["", 0]);
        }
      }
      // Check si un joueur entre dans les records
      logic.listeJoueur.forEach((player, index) => {
        scorePlayer = logic.getScoreJoueur(player);
        for(var i=0; i<5; i++) {
          if(scorePlayer > tabBestScores[i][1]) {
            tabBestScores.push([player, scorePlayer]);
            tabBestScores.sort(function(a, b) {
              return b[1] - a[1];
            });
            break;
          }
        }
      })
      console.log(tabBestScores);
      // Insertion des records
      for(var i=1; i<=5; i++) {
        if(tabBestScores[i-1][0] != "") {
          localStorage.setItem("rank"+i, tabBestScores[i-1]);
        }
      }

      var scoreMax=0;
      var NomJoueurMax="";
      scoreMax = logic.getScoreJoueurTour(storedArray[0],9);
      NomJoueurMax = storedArray[0];

      for(var i = 1; i < storedArray.length; i++){
        scoreTemp = logic.getScoreJoueurTour(storedArray[i],9);
        if(scoreTemp>scoreMax){
           scoreMax = scoreTemp;
           NomJoueurMax = storedArray[i];
        }
      }
      let c1 = document.getElementById("cadre");
      var btnR = document.createElement("a");

      btnR.setAttribute('class', 'btn btn-light w-25 mx-2');
      btnR.setAttribute('href', 'parameter.html');
      btnR.innerHTML = "Rejouer";

      var btnA= document.createElement("a");
      btnA.setAttribute('class', 'btn btn-light w-25 mx-2');
      btnA.setAttribute('href', 'menu.html');
      btnA.innerHTML = "Accueil";

      var res = document.createElement("h1");
      res.setAttribute('class', 'text-light mb-4 pb-2 border-bottom w-75 mx-auto');
      res.innerHTML = "Bravo " + NomJoueurMax + " tu as gagné la partie !";

      let s1 = document.getElementById("score");
      s1.style.display = "none";
      let btnS = document.getElementById("btnAddScore");
      btnS.style.display = "none";
      let tj = document.getElementById("Tj");
      tj.style.display = "none";


      c1.appendChild(res);
      c1.appendChild(btnA);
      c1.appendChild(btnR);
    }
    

  }

  function joueurActu(){
    var div = document.getElementById("Tj");
    var j = document.createElement("h1");
    j.setAttribute('class', 'text-light mb-4 pb-2 border-bottom w-75 mx-auto');
    j.setAttribute('id', 'jAct');
    j.innerHTML = storedArray[0] + " à toi de jouer";

    div.appendChild(j);
  }
  
  function generate_table() {
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
  
    var div = document.getElementById("Tab");
  
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
  
    tbl.setAttribute('class', 'table text-light table-borderless');
    tbl.setAttribute('id', 'myTable');
  
    var tblhead = document.createElement("thead");
    var row = document.createElement("tr");
    var cell = document.createElement("th");
    var cellText = document.createTextNode(" Partie ");
    cell.setAttribute('style', 'text-align: center; border: 1px solid white;');  
  
  
    cell.appendChild(cellText);
    row.appendChild(cell);
    // creating all cells
    for (var i = 1; i < 10; i++) {
        var cell = document.createElement("th");
        var cellText = document.createTextNode(i);
        cell.setAttribute('style', 'text-align: center; border: 1px solid white;');
        cell.setAttribute('colspan', '2');
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
  
    var cell = document.createElement("th");
    var cellText = document.createTextNode(i);
    cell.setAttribute('style', 'text-align: center; border: 1px solid white;');
    cell.setAttribute('colspan', '3');
    cell.appendChild(cellText);
    row.appendChild(cell);
  
    var cell = document.createElement("th");
    var cellText = document.createTextNode(" Total ");
    cell.setAttribute('style', 'text-align: center; border: 1px solid white;');
    cell.appendChild(cellText);
    row.appendChild(cell);
  
    tblhead.appendChild(row);
  
    tbl.appendChild(tblhead);
  
    var tblbody = document.createElement("tbody");
  
    tbl.appendChild(tblbody);
    // appends <table> into <body>
    div.appendChild(tbl);
  }
  
  function ligne1(j,storedArray){
    var tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.setAttribute('rowspan', '2');
    cell.setAttribute('style', 'text-align: center; border: 1px solid white;');
  
    var cellText  = document.createTextNode(storedArray[j]);
    cell.appendChild(cellText);
    row.appendChild(cell);
    var t=0;
    var c=1;
    for(var t=0; t<9; t++){
      for (var c = 0; c < 2; c++) {
        var cell = document.createElement("td");
        cell.setAttribute('style', 'text-align: right; border: 1px solid white;');
        cell.setAttribute('id', 'P' + j + 'T' + t + 'C'+ c);
        row.appendChild(cell);
      }
    }
    for (var c = 0; c < 3; c++) {
      var cell = document.createElement("td");
      cell.setAttribute('style', 'text-align: right; border: 1px solid white;');
      cell.setAttribute('id', 'P' + j + 'T' + 9 + 'C'+ c);
      row.appendChild(cell);
    }
  
    var cell = document.createElement("td");
    var cellText  = document.createTextNode(" ");
    cell.setAttribute('style', 'text-align: center; border: 1px solid white;');
    cell.setAttribute('rowspan', '2');
    cell.setAttribute('id', 'P' + j + 'Score');
    cell.appendChild(cellText);
    row.appendChild(cell);
  
    tbody.appendChild(row);   
  }
  
  function ligne2(j){
    var tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var row2 = document.createElement("tr");
    for (var c = 0; c < 9; c++) {
      var cell2 = document.createElement("td");
      cell2.setAttribute('style', 'text-align: right; border: 1px solid white;');
      cell2.setAttribute('colspan', '2');
      cell2.setAttribute('id', 'P' + j + 'T' + c + 'CT');
  
      row2.appendChild(cell2);
    }
    var cell2 = document.createElement("td");
      cell2.setAttribute('style', 'text-align: right; border: 1px solid white;');
      cell2.setAttribute('colspan', '3');
      cell2.setAttribute('id', 'P' + j + 'T' + 9 + 'CT');
      row2.appendChild(cell2);
    tbody.appendChild(row2);
  }
  
  function addJoueurTab(){
    if(storedArray){
      for(var i=0; i<storedArray.length; i++){
        this.ligne1(i,storedArray);
        this.ligne2(i);
      }
    }
  }
  
}

module.exports = Logic;
