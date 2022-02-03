var Logic = require("../js/game.js");

var assert = require('assert');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

describe('Game logic', function() {

  describe('constructor', function() {  
		it('verification des valeurs des variables membres',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);
        assert.deepEqual(gameLogic.listeJoueur, ["Jean", "Yves"]);
        assert.equal(gameLogic.indexJoueurActuel, 0);
        assert.deepEqual(gameLogic.playerTours, {"Jean":[],"Yves":[]});
        assert.deepEqual(gameLogic.numCoupsDansLaFrame, 0);
        assert.deepEqual(gameLogic.numTour, 0);
        assert.deepEqual(gameLogic.nbTourMax, 10);
        assert.deepEqual(gameLogic.finJeu, false);
        assert.deepEqual(gameLogic.nbQuille, 10);


        gameLogic = new Logic(7, ["Jean", "Yves", "ToufTouf"]);
        assert.deepEqual(gameLogic.listeJoueur, ["Jean", "Yves", "ToufTouf"]);
        assert.equal(gameLogic.indexJoueurActuel, 0);
        assert.deepEqual(gameLogic.playerTours, {"Jean":[],"Yves":[], "ToufTouf":[]});
        assert.deepEqual(gameLogic.numCoupsDansLaFrame, 0);
        assert.deepEqual(gameLogic.numTour, 0);
        assert.deepEqual(gameLogic.nbTourMax, 10);
        assert.deepEqual(gameLogic.finJeu, false);
        assert.deepEqual(gameLogic.nbQuille, 7);
    });
  });

  describe('function addCoups', function() {  
    it('verification des variables apres ajout du coup',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);
        gameLogic.nbTourMax = 2; //pour tester le dernier tour avec les spares et les strikes

        //TOUR 1
        gameLogic.addCoups(5);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5]]);
        gameLogic.addCoups(13);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5,13]]);
        assert.equal(gameLogic.indexJoueurActuel, 1); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 0); //on retourne au coup 1

        gameLogic.addCoups(1);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1]]);
        gameLogic.addCoups(2);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1,2]]);
        assert.equal(gameLogic.indexJoueurActuel, 0); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 0); //on retourne au coup 1
        

        //TOUR 2
        assert.equal(gameLogic.numTour, 1); //on passe de tour
        assert.equal(gameLogic.numCoupsDansLaFrame, 0);
        gameLogic.addCoups(3);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1);
        gameLogic.addCoups(7);//spare
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5,13],[3,7]]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 2);
        gameLogic.addCoups(5);//le joueur peut rejouer une fois
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5,13],[3,7,5]]);
        assert.equal(gameLogic.indexJoueurActuel, 1);
        assert.equal(gameLogic.numCoupsDansLaFrame, 0);

        gameLogic.addCoups(10); //strike
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1,2],[10]]);
        gameLogic.addCoups(10);//le joueur peut rejouer deux fois
        gameLogic.addCoups(10);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1,2],[10,10,10]]);
        assert.equal(gameLogic.indexJoueurActuel, 0);
        assert.equal(gameLogic.numCoupsDansLaFrame, 0);

        //TOUR 3 : fini mais c'est pas cette fonction qui gere ca
        assert.equal(gameLogic.numTour, 2); //on passe de tour


        //NOUVEAU AVEC 3 JOUEURS et 9 QUILLES

        gameLogic = new Logic(9, ["Jean", "Yves", "Touf"]);
        gameLogic.nbTourMax = 2; //pour tester le dernier tour avec les spares et les strikes

        //TOUR 1
        gameLogic.addCoups(5);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5]]);
        gameLogic.addCoups(13);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5,13]]);
        assert.equal(gameLogic.indexJoueurActuel, 1); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 0); //on retourne au coup 1

        gameLogic.addCoups(1);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1]]);
        gameLogic.addCoups(2);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1,2]]);
        assert.equal(gameLogic.indexJoueurActuel, 2); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 0); //on retourne au coup 1

        gameLogic.addCoups(4);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[2]], [[4]]);
        gameLogic.addCoups(1);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[2]], [[4,1]]);
        assert.equal(gameLogic.indexJoueurActuel, 0); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 0); //on retourne au coup 1
        

        //TOUR 2
        assert.equal(gameLogic.numTour, 1); //on passe de tour
        gameLogic.addCoups(3);
        gameLogic.addCoups(6);//spare
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5,13],[3,6]]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 2);
        gameLogic.addCoups(5);//le joueur peut rejouer une fois
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [[5,13],[3,6,5]]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 0);
        assert.equal(gameLogic.indexJoueurActuel, 1);

        gameLogic.addCoups(9); //strike
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1,2],[9]]);
        gameLogic.addCoups(9);//le joueur peut rejouer deux fois
        gameLogic.addCoups(9);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [[1,2],[9,9,9]]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 0);
        assert.equal(gameLogic.indexJoueurActuel, 2);

        gameLogic.addCoups(3);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[2]], [[4,1], [3]]);
        gameLogic.addCoups(3);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[2]], [[4,1], [3,3]]);
        assert.equal(gameLogic.indexJoueurActuel, 0); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 0); //on retourne au coup 1

        //TOUR 3 : fini mais c'est pas cette fonction qui gere ca
        assert.equal(gameLogic.numTour, 2); //on passe de tour
    });
  });

  describe('function getScoreJoueur', function() {  
    it('verification des exeptions en fonction des parametres',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);
        const expectedError = new Error("Invalid player");
        assert.throws(() => {

            gameLogic.getScoreJoueur("randomPlayer", 0);

                            }, expectedError);
    });

    it('verification des resultats',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);

        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueur("Jean"), 0);
        gameLogic.addCoups(4);
        assert.equal(gameLogic.getScoreJoueur("Jean"), 9);


        assert.equal(gameLogic.getScoreJoueur("Yves"), 0);
        gameLogic.addCoups(5);
        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueur("Yves"), 0); //car spare, on attend un coup en plus


        gameLogic.addCoups(10);
        assert.equal(gameLogic.getScoreJoueur("Jean"), 9); //car strike on attend deux coups en plus


        gameLogic.addCoups(4);
        assert.equal(gameLogic.getScoreJoueur("Yves"), 14); //maintenant c'est bon
        gameLogic.addCoups(3);
        assert.equal(gameLogic.getScoreJoueur("Yves"), 21);


        gameLogic.addCoups(4);
        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueur("Jean"), 37); //9+10+4+5+4+5
    });
  });

  describe('function getScoreJoueurTour', function() {  
    it('verification des exeptions en fonction des parametres',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);
        const expectedError = new Error("Invalid player");
        assert.throws(() => {

            gameLogic.getScoreJoueurTour("randomPlayer", 0);

                            }, expectedError);
    });

    it('verification des resultats',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);

        assert.equal(gameLogic.getScoreJoueurTour("Jean", -1), false);


        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueurTour("Jean", 0), false);
        gameLogic.addCoups(4);
        assert.equal(gameLogic.getScoreJoueurTour("Jean", 0), 9);


        assert.equal(gameLogic.getScoreJoueurTour("Yves", 0), false);
        gameLogic.addCoups(5);
        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueurTour("Yves", 0), false); //car spare, on attend un coup en plus


        gameLogic.addCoups(10);
        assert.equal(gameLogic.getScoreJoueurTour("Jean", 1), false); //car strike on attend deux coups en plus


        gameLogic.addCoups(4);
        assert.equal(gameLogic.getScoreJoueurTour("Yves", 0), 14); //maintenant c'est bon
        assert.equal(gameLogic.getScoreJoueurTour("Yves", 1), false);
        gameLogic.addCoups(3);
        assert.equal(gameLogic.getScoreJoueurTour("Yves", 1), 7);


        gameLogic.addCoups(4);
        gameLogic.addCoups(5);
        //maintenant on peut calculer le t2
        assert.equal(gameLogic.getScoreJoueurTour("Jean", 1), 19); //10 + 4 + 5
        assert.equal(gameLogic.getScoreJoueurTour("Jean", 2), 9);
    });
  });

  describe('function isInputNbQuilleOK', function() {  
    it('nombre quille en entree cooherent',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(11), false);

        gameLogic = new Logic(10, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(-1), false);

        gameLogic = new Logic(10, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        gameLogic.addCoups(4);
        assert.equal(gameLogic.isInputNbQuilleOK(8), false); //>10

        gameLogic = new Logic(10, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        gameLogic.addCoups(4);
        assert.equal(gameLogic.isInputNbQuilleOK(2), true); //6
        gameLogic.addCoups(2);
        assert.equal(gameLogic.isInputNbQuilleOK(10), true); //strike
        gameLogic.addCoups(10);
        assert.equal(gameLogic.isInputNbQuilleOK(6), true);
        gameLogic.addCoups(6);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true); //spare
        gameLogic.addCoups(4);


        gameLogic = new Logic(9, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(10), false);

        gameLogic = new Logic(5, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(-1), false);

        gameLogic = new Logic(5, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        gameLogic.addCoups(4);
        assert.equal(gameLogic.isInputNbQuilleOK(2), false); //>5

        gameLogic = new Logic(5, ["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(2), true);
        gameLogic.addCoups(2);
        assert.equal(gameLogic.isInputNbQuilleOK(2), true); //2
        gameLogic.addCoups(2);
        assert.equal(gameLogic.isInputNbQuilleOK(5), true); //strike
        gameLogic.addCoups(5);
        assert.equal(gameLogic.isInputNbQuilleOK(3), true);
        gameLogic.addCoups(3);
        assert.equal(gameLogic.isInputNbQuilleOK(2), true); //spare
        gameLogic.addCoups(2);
    });
  });

  describe('function processInput', function() {  
    it('verification logic de la valeur de retour',
    function()
    {
      gameLogic = new Logic(10, ["Jean", "Yves"]);

      var strings = ["5","12","2","-8","0","qe","6435"];
      var vals = [5,12,2,-8,0,0,6435];

      for (var i = 0; i < strings.length; i++) {
        var nbQuille = gameLogic.parseInput(strings[i]);
        var bool2 = gameLogic.isInputNbQuilleOK(vals[i]);
        if(nbQuille === false || !bool2)
          assert.equal(gameLogic.processInput(strings[i]), false);
        else
          assert.equal(gameLogic.processInput(strings[i]), true);
      }
    });

    it('verification cooherence score',
    function()
    {
      for (let i = 0; i < 5; i++) {
        let nbQuille = getRandomIntInclusive(3,10);
        gameLogic = new Logic(nbQuille, ["Jean", "Yves", "GGwp"]);

        while(!gameLogic.finJeu){
          gameLogic.processInput(getRandomIntInclusive(0,nbQuille));
        }

        assert.equal(gameLogic.getScoreJoueur("Jean", 9) <= nbQuille*3*10, true);
        assert.equal(gameLogic.getScoreJoueur("Yves", 9) <= nbQuille*3*10, true);
        assert.equal(gameLogic.getScoreJoueur("GGwp", 9) <= nbQuille*3*10, true);
      }
    });
  });

  describe('function parseInput', function() {  
    it('input represente seulement un nombre',
    function()
    {
        gameLogic = new Logic(10, ["Jean", "Yves"]);
        assert.equal(gameLogic.parseInput("5"), 5);
        assert.equal(gameLogic.parseInput("6"), 6);
        assert.equal(gameLogic.parseInput("123"), 123);
        assert.equal(gameLogic.parseInput("-123"), -123);
        assert.equal(gameLogic.parseInput("132b123"), false);
        assert.equal(gameLogic.parseInput("aes"), false);
    });
  });

  describe('Creation tableau', function() {
    let joueurs = ['Leo', 'Nathan', 'Théo', 'Toufik'];
    gameLogic = new Logic(["Jean", "Yves"]);

   /*describe('generate_table()', function () {
      gameLogic.generate_table();
      it('Création du tableau', function () {
        var table = body.getElementsByTagName("table")[0];
        assert.notEqual(table,null);
      });
    });*/
  });

});
