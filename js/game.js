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
    let nbQuille = this.parseInput(input);
    if(nbQuille === false)return false;

    if(!this.isInputNbQuilleOK(nbQuille)) return false;

    //On rempli les variables
    this.addCoups(nbQuille);
    if(this.numTour >= this.nbTourMax){
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
        //si premier coup est un strike --> on test le spare
        if(this.playerTours[this.listeJoueur[this.indexJoueurActuel]][this.numTour][this.numCoupsDansLaFrame-2] == this.nbQuille){
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
                //le prochain coups est de nouveau un strike, donc on prend le coup du prochain tour
                scoreDoubleProchainCoups = this.playerTours[joueur][tour+2][0];
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
    if(this.finJeu){

    }
  }
}

module.exports = Logic;