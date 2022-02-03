const myModule = require('../js/parameter.js');
var assert = require('assert');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
const options = { // Je sais pas comment ca marche mais ca empeche erreur à l'appel d'alert()
  url: "http://localhost/",
  beforeParse(window) {
    window.alert = window.console.log.bind("");
  },
};
// TESTS
describe('Fonctions parameters.js', function () {
  before(async function () {
    jdom = await JSDOM.fromFile("HTML/parameter.html", options);
    global.window = jdom.window
    global.document = jdom.window.document
  });
  describe('addPlayer()', function () {
    it('String non presente dans <input>', function () {
      assert.equal(myModule.addPlayer(), false);
    });
    it('String presente dans <input>', function () {
      global.document.getElementById("playerName").value = 'toufik';
      assert.equal(myModule.addPlayer(), true);
    });
  });
  describe('sendPlayers()', function() {
    it('Quand on a ajouté au moins un joueur', function() {
      assert.equal(myModule.sendPlayers(), true);
    });
    it('Quand on a ajouté aucun joueur', function () {
      global.document.getElementById("players").innerHTML = '';
      assert.equal(myModule.sendPlayers(), false);
    });
  });
});
