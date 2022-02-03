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
        gameLogic = new Logic(["Jean", "Yves"]);
        assert.deepEqual(gameLogic.listeJoueur, ["Jean", "Yves"]);
        assert.equal(gameLogic.indexJoueurActuel, 0);
        assert.deepEqual(gameLogic.playerTours, {"Jean":[],"Yves":[]});
        assert.deepEqual(gameLogic.numCoupsDansLaFrame, 1);
        assert.deepEqual(gameLogic.numTour, 1);
        assert.deepEqual(gameLogic.nbTourMax, 10);
        assert.deepEqual(gameLogic.finJeu, false);


        gameLogic = new Logic(["Jean", "Yves", "ToufTouf"]);
        assert.deepEqual(gameLogic.listeJoueur, ["Jean", "Yves", "ToufTouf"]);
        assert.equal(gameLogic.indexJoueurActuel, 0);
        assert.deepEqual(gameLogic.playerTours, {"Jean":[],"Yves":[], "ToufTouf":[]});
        assert.deepEqual(gameLogic.numCoupsDansLaFrame, 1);
        assert.deepEqual(gameLogic.numTour, 1);
        assert.deepEqual(gameLogic.nbTourMax, 10);
        assert.deepEqual(gameLogic.finJeu, false);
    });
  });

  describe('function addCoups', function() {  
    it('verification des variables apres ajout du coup',
    function()
    {
        gameLogic = new Logic(["Jean", "Yves"]);
        gameLogic.nbTourMax = 2; //pour tester le dernier tour avec les spares et les strikes

        //TOUR 1
        gameLogic.addCoups(5);
        assert.equal(gameLogic.numCoupsDansLaFrame, 2); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [(5)]);
        gameLogic.addCoups(13);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [(5,13)]);
        assert.equal(gameLogic.indexJoueurActuel, 1); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on retourne au coup 1

        gameLogic.addCoups(1);
        assert.equal(gameLogic.numCoupsDansLaFrame, 2); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [(1)]);
        gameLogic.addCoups(2);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [(1,2)]);
        assert.equal(gameLogic.indexJoueurActuel, 0); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on retourne au coup 1
        

        //TOUR 2
        assert.equal(gameLogic.numTour, 2); //on passe de tour
        gameLogic.addCoups(3);
        gameLogic.addCoups(7);//spare
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [(5,13),(3,7)]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 3);
        gameLogic.addCoups(5);//le joueur peut rejouer une fois
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [(5,13),(3,7,5)]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1);
        assert.equal(gameLogic.indexJoueurActuel, 1);

        gameLogic.addCoups(10); //strike
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [(1,2),(10)]);
        gameLogic.addCoups(10);//le joueur peut rejouer deux fois
        gameLogic.addCoups(10);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [(1,2),(10,10,10)]);
        assert.equal(gameLogic.numCoupsDansLaFrame, 1);
        assert.equal(gameLogic.indexJoueurActuel, 0);

        //TOUR 3 : fini mais c'est pas cette fonction qui gere ca
        assert.equal(gameLogic.numTour, 3); //on passe de tour
    });
  });

  describe('function getScoreJoueur', function() {  
    it('verification des exeptions en fonction des parametres',
    function()
    {
        gameLogic = new Logic(["Jean", "Yves"]);
        assert.throws(() => {

            gameLogic.getScoreJoueur("nexistePas", 1);

                            }, new Error("Invalid player"));
    });

    it('verification des resultats',
    function()
    {
        gameLogic = new Logic(["Jean", "Yves"]);

        assert.equal(gameLogic.getScoreJoueur("Jean", -1), false);


        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueur("Jean", 1), false);
        gameLogic.addCoups(4);
        assert.equal(gameLogic.getScoreJoueur("Jean", 1), 9);


        assert.equal(gameLogic.getScoreJoueur("Yves", 1), false);
        gameLogic.addCoups(5);
        gameLogic.addCoups(5);
        assert.equal(gameLogic.getScoreJoueur("Yves", 1), false); //car spare, on attend un coup en plus


        gameLogic.addCoups(10);
        assert.equal(gameLogic.getScoreJoueur("Jean", 2), false); //car strike on attend deux coups en plus


        gameLogic.addCoups(4);
        assert.equal(gameLogic.getScoreJoueur("Yves", 1), 14); //maintenant c'est bon
        assert.equal(gameLogic.getScoreJoueur("Yves", 2), false);
        gameLogic.addCoups(3);
        assert.equal(gameLogic.getScoreJoueur("Yves", 2), 21); //spare 10 + 4 + (4+3)


        gameLogic.addCoups(4);
        gameLogic.addCoups(5);
        //maintenant on peut calculer le t2
        assert.equal(gameLogic.getScoreJoueur("Jean", 2), 28); //9 + 10 + 9 = 28
        assert.equal(gameLogic.getScoreJoueur("Jean", 3), 37); //37
    });
  });

  describe('function isInputNbQuilleOK', function() {  
    it('nombre quille en entree cooherent',
    function()
    {
        gameLogic = new Logic(["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(11), false);

        gameLogic = new Logic(["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(-1), false);

        gameLogic = new Logic(["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        assert.equal(gameLogic.isInputNbQuilleOK(8), false); //>10

        gameLogic = new Logic(["Jean", "Yves"]);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        assert.equal(gameLogic.isInputNbQuilleOK(2), true); //6
        assert.equal(gameLogic.isInputNbQuilleOK(10), true); //strike
        assert.equal(gameLogic.isInputNbQuilleOK(6), true);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true); //spare
    });
  });

  describe('function processInput', function() {  
    it('verification logic de la valeur de retour',
    function()
    {
      gameLogic = new Logic(["Jean", "Yves"]);

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
      gameLogic = new Logic(["Jean", "Yves"]);

      while(!gameLogic.finJeu){
        gameLogic.processInput(getRandomIntInclusive(0,10));
      }

      assert.equal(gameLogic.getScoreJoueur("Jean", 10) <= 300, true);
      assert.equal(gameLogic.getScoreJoueur("Yves", 10) <= 300, true);

    });
  });

  describe('function parseInput', function() {  
    it('input represente seulement un nombre',
    function()
    {
        gameLogic = new Logic(["Jean", "Yves"]);
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
