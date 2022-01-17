var Logic = require("../js/game.js");

var assert = require('assert');

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
        assert.deepEqual(gameLogic.nbFrameMax, 10);
        assert.deepEqual(gameLogic.finJeu, false);


        gameLogic = new Logic(["Jean", "Yves", "ToufTouf"]);
        assert.deepEqual(gameLogic.listeJoueur, ["Jean", "Yves", "ToufTouf"]);
        assert.equal(gameLogic.indexJoueurActuel, 0);
        assert.deepEqual(gameLogic.playerTours, {"Jean":[],"Yves":[], "ToufTouf":[]});
        assert.deepEqual(gameLogic.numCoupsDansLaFrame, 1);
        assert.deepEqual(gameLogic.numTour, 1);
        assert.deepEqual(gameLogic.nbFrameMax, 10);
        assert.deepEqual(gameLogic.finJeu, false);
    });
  });

  describe('function addCoups', function() {  
    it('verification des variables apres ajout du coup',
    function()
    {
        gameLogic = new Logic(["Jean", "Yves"]);
        gameLogic.addCoups(5);
        assert.equal(gameLogic.numCoupsDansLaFrame, 2); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [5]);
        gameLogic.addCoups(13);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [5,13]);
        assert.equal(gameLogic.indexJoueurActuel, 1); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on retourne au coup 1

        gameLogic.addCoups(1);
        assert.equal(gameLogic.numCoupsDansLaFrame, 2); //on passe au coup suivant
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [1]);
        gameLogic.addCoups(2);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [1,2]);
        assert.equal(gameLogic.indexJoueurActuel, 0); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on retourne au coup 1
        


        assert.equal(gameLogic.numTour, 2); //on passe de tour
        gameLogic.addCoups(3);
        gameLogic.addCoups(4);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[0]], [5,13,3,4]);
        assert.equal(gameLogic.indexJoueurActuel, 1); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on retourne au coup 1

        gameLogic.addCoups(5);
        gameLogic.addCoups(6);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[1]], [1,2,5,6]);
        assert.equal(gameLogic.indexJoueurActuel, 0); //on passe au joueur suivant
        assert.equal(gameLogic.numCoupsDansLaFrame, 1); //on retourne au coup 1



        assert.equal(gameLogic.numTour, 3); //on passe de tour
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
  });

  describe('function inputIsNombre', function() {  
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


});
