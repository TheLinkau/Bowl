const myModule = require('../js/menu.js');
var assert = require('assert');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

JSDOM.fromFile("html/menu.html", options).then(dom => { // Créer un dom virtuel à partir d'un fichier (on peut également écrire le dom désiré directement dans ce constructeur)
    global.window = dom.window
    global.document = dom.window.document // On set le dom virtuel crée en tant que dom pour les tests mocha
  });

describe('function getRank', function() {  
    it('La fonction se déroule bien, renvoie true',
    function()
    {
        assert.equal(myModule.getRank(), true);
    });
  });