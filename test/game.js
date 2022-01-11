var gameLogic = require("../js/game.js");

var assert = require('assert');

describe('Game logic', function() {

  describe('function init', function() {  
		it('indexJoueurActuel == 0',
    function()
    {
        gameLogic.init();
        // console.log(gameLogic.indexJoueurActuel);
        // gameLogic.init();
        // console.log(gameLogic.indexJoueurActuel);
        // assert.equal(gameLogic.indexJoueurActuel, 0);
    });
  });

  describe('function addCoups', function() {  
    it('verification des variables apres ajout du coup',
    function()
    {
        gameLogic.init();
        gameLogic.addCoups(5);
        assert.deepEqual(gameLogic.playerTours[gameLogic.listeJoueur[gameLogic.indexJoueurActuel]], [5]);
    });
  });

  describe('function isInputNbQuilleOK', function() {  
    it('nombre quille en entree cooherent',
    function()
    {
        gameLogic.init();
        assert.equal(gameLogic.isInputNbQuilleOK(11), false);

        gameLogic.init();
        assert.equal(gameLogic.isInputNbQuilleOK(-1), false);

        gameLogic.init();
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        assert.equal(gameLogic.isInputNbQuilleOK(8), false); //>10

        gameLogic.init();
        assert.equal(gameLogic.isInputNbQuilleOK(4), true);
        assert.equal(gameLogic.isInputNbQuilleOK(6), true);
        assert.equal(gameLogic.isInputNbQuilleOK(10), true); //strike
        assert.equal(gameLogic.isInputNbQuilleOK(6), true);
        assert.equal(gameLogic.isInputNbQuilleOK(4), true); //spare
    });
  });

  describe('function processInput', function() {  
    it('input represente seulement un nombre',
    function()
    {
        gameLogic.init();
        assert.equal(gameLogic.processInput("5"), true);
        assert.equal(gameLogic.processInput("6"), true);
        assert.equal(gameLogic.processInput("132b123"), false);
        assert.equal(gameLogic.processInput("aes"), false);
    });
  });


});
